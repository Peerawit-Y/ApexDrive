#!/usr/bin/env node
/**
 * สร้างไฟล์ vectors.json จากเอกสารใน frontend/public/docs/
 * รันครั้งเดียวตอนเตรียมของ หรือทุกครั้งที่แก้เอกสาร
 *
 * ใช้:  node scripts/build-vectors.mjs [WORKER_URL]
 * ถ้าไม่ใส่ WORKER_URL จะใช้ค่า default ด้านล่าง
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const WORKER_URL = process.argv[2] || 'https://apexdrive-chatbot.peerawit-y-apexdrive.workers.dev';
const EMBED_MODEL = 'gemini-embedding-001';
const OUTPUT_DIM = 768;
const CHUNK_SIZE = 500;
const OVERLAP = 100;
const BATCH_SIZE = 20; // จำนวนชิ้นต่อการยิง batchEmbedContents หนึ่งครั้ง

const DOCS_DIR = path.join(process.cwd(), 'frontend/public/docs');
const OUTPUT_FILE = path.join(process.cwd(), 'frontend/public/vectors.json');

const FILES = [
  '01-apex-35-gt.txt',
  '02-apex-4-coupe.txt',
  '03-apex-2-clubsport.txt',
  '04-apex-86-spirit.txt',
  '05-apex-5-touring.txt',
  '06-apex-8-vantage.txt',
  '07-apex-10-evo.txt',
  '08-apex-x-hyper.txt',
  '09-apex-suv-rs.txt',
  '10-apex-gt3-track.txt',
  '11-booking-and-financing.txt',
  '12-contact-and-faq.txt',
  '13-catalog-summary.txt',
  '14-test-drive-and-warranty.txt',
  '15-installment-summary.txt',
];

function chunkText(text, source) {
  const out = [];
  let start = 0;
  let part = 1;
  while (start < text.length) {
    out.push({ source, part, text: text.slice(start, start + CHUNK_SIZE) });
    start += CHUNK_SIZE - OVERLAP;
    part++;
  }
  return out;
}

function unit(v) {
  const n = Math.hypot(...v);
  return v.map(x => +(x / n).toFixed(6));
}

async function embedBatch(texts) {
  const res = await fetch(`${WORKER_URL}/v1beta/models/${EMBED_MODEL}:batchEmbedContents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:5173' },
    body: JSON.stringify({
      requests: texts.map(t => ({
        model: `models/${EMBED_MODEL}`,
        content: { parts: [{ text: t }] },
        outputDimensionality: OUTPUT_DIM,
      })),
    }),
  });
  if (!res.ok) throw new Error(`Worker ตอบ ${res.status}: ${await res.text()}`);
  const data = await res.json();
  if (!data.embeddings) throw new Error(`ไม่ได้ embeddings กลับมา: ${JSON.stringify(data)}`);
  return data.embeddings.map(e => e.values);
}

async function main() {
  console.log('อ่านเอกสาร...');
  const chunks = [];
  for (const file of FILES) {
    const text = (await readFile(path.join(DOCS_DIR, file), 'utf-8')).trim();
    chunks.push(...chunkText(text, file));
  }
  console.log(`หั่นได้ ${chunks.length} ชิ้น จาก ${FILES.length} ไฟล์`);

  const vectors = [];
  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    console.log(`แปลงเป็นเวกเตอร์ ${i + 1}-${i + batch.length} / ${chunks.length} ...`);
    const embeddings = await embedBatch(batch.map(c => c.text));
    embeddings.forEach((v, j) => vectors.push({ ...batch[j], v: unit(v) }));
  }

  const out = {
    model: EMBED_MODEL,
    dim: OUTPUT_DIM,
    created: new Date().toISOString().slice(0, 16).replace('T', ' '),
    chunks: vectors,
  };

  await writeFile(OUTPUT_FILE, JSON.stringify(out));
  console.log(`\nสำเร็จ — เขียน ${OUTPUT_FILE}`);
  console.log(`เวกเตอร์ ${vectors.length} ชิ้น มิติละ ${OUTPUT_DIM}`);
}

main().catch(err => {
  console.error('ไม่สำเร็จ:', err.message);
  process.exit(1);
});
