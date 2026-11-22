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

const WORKER_URL = process.argv[2] || 'https://apexdrive-chatbot.ppeerawit789.workers.dev';
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

async function embedBatch(texts, attempt = 1) {
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
  if (res.status === 429 && attempt <= 3) {
    const body = await res.text();
    const match = body.match(/"retryDelay"\s*:\s*"(\d+)s"/);
    const waitSec = (match ? parseInt(match[1], 10) : 35) + 2;
    console.log(`ติดโควตา 429 — รอ ${waitSec} วินาทีแล้วลองใหม่ (รอบที่ ${attempt})...`);
    await new Promise(r => setTimeout(r, waitSec * 1000));
    return embedBatch(texts, attempt + 1);
  }
  if (!res.ok) throw new Error(`Worker ตอบ ${res.status}: ${await res.text()}`);
  const data = await res.json();
  if (!data.embeddings) throw new Error(`ไม่ได้ embeddings กลับมา: ${JSON.stringify(data)}`);
  return data.embeddings.map(e => e.values);
}

async function loadExistingCache() {
  const cache = new Map();
  try {
    const prev = JSON.parse(await readFile(OUTPUT_FILE, 'utf-8'));
    if (prev.model === EMBED_MODEL && prev.dim === OUTPUT_DIM && Array.isArray(prev.chunks)) {
      for (const c of prev.chunks) {
        if (c.text && Array.isArray(c.v)) cache.set(c.text, c.v);
      }
    }
  } catch {
    // ไม่มีไฟล์เก่า — สร้างใหม่ทั้งหมด
  }
  return cache;
}

async function main() {
  console.log('อ่านเอกสาร...');
  const chunks = [];
  for (const file of FILES) {
    const text = (await readFile(path.join(DOCS_DIR, file), 'utf-8')).trim();
    chunks.push(...chunkText(text, file));
  }
  console.log(`หั่นได้ ${chunks.length} ชิ้น จาก ${FILES.length} ไฟล์`);

  const cache = await loadExistingCache();
  const vectors = new Array(chunks.length);
  const toEmbed = [];
  chunks.forEach((c, idx) => {
    const cached = cache.get(c.text);
    if (cached) {
      vectors[idx] = { ...c, v: cached };
    } else {
      toEmbed.push({ idx, chunk: c });
    }
  });
  console.log(`ใช้เวกเตอร์เดิม ${chunks.length - toEmbed.length} ชิ้น · แปลงใหม่ ${toEmbed.length} ชิ้น`);

  for (let i = 0; i < toEmbed.length; i += BATCH_SIZE) {
    const batch = toEmbed.slice(i, i + BATCH_SIZE);
    console.log(`แปลงเป็นเวกเตอร์ ${i + 1}-${i + batch.length} / ${toEmbed.length} ...`);
    const embeddings = await embedBatch(batch.map(b => b.chunk.text));
    embeddings.forEach((v, j) => {
      const { idx, chunk } = batch[j];
      vectors[idx] = { ...chunk, v: unit(v) };
    });
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
