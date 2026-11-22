import { Language } from '../context/LanguageContext';
import { products } from './productService';

const ENV = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;

const DOCS_BASE = (ENV?.VITE_DOCS_BASE || 'docs').replace(/\/+$/, '');

// Worker URL ไม่ใช่ความลับ (เป็นที่อยู่สาธารณะ ป้องกันด้วย CORS origin check ใน worker.js อยู่แล้ว)
// ใส่เป็นค่า default ไว้ตรงนี้เพื่อให้ build บน GitHub Pages ใช้งานได้ทันทีโดยไม่ต้องพึ่งไฟล์ .env ที่ไม่ถูก push ขึ้น git
// กุญแจจริง (Gemini API key) ไม่ได้อยู่ในไฟล์นี้หรือที่ไหนในโค้ด — เก็บเป็น Secret บน Cloudflare เท่านั้น
const DEFAULT_WORKER_URL = 'https://apexdrive-chatbot.ppeerawit789.workers.dev';
const WORKER_URL = (ENV?.VITE_WORKER_URL || DEFAULT_WORKER_URL).replace(/\/+$/, '');
const AI_MODEL = ENV?.VITE_AI_MODEL || 'gemini-flash-lite-latest';
const EMBED_MODEL = 'gemini-embedding-001';
const VECTORS_FILE = 'vectors.json';

const CHUNK_SIZE = 500;
const OVERLAP = 100;
const TOP_K = 14;

// เอกสารความรู้ของโชว์รูม APEX Sports — วางไว้ที่ frontend/public/docs/
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

interface Chunk {
  source: string;
  part: number;
  text: string;
}

interface Grams {
  m: Map<string, number>;
  norm: number;
}

let chunksPromise: Promise<Chunk[]> | null = null;

async function loadChunks(): Promise<Chunk[]> {
  if (!chunksPromise) {
    chunksPromise = (async () => {
      const out: Chunk[] = [];
      for (const file of FILES) {
        const res = await fetch(`${DOCS_BASE}/${file}`);
        if (!res.ok) continue;
        const text = (await res.text()).trim();
        let start = 0;
        let part = 1;
        while (start < text.length) {
          out.push({ source: file, part, text: text.slice(start, start + CHUNK_SIZE) });
          start += CHUNK_SIZE - OVERLAP;
          part++;
        }
      }
      return out;
    })();
  }
  return chunksPromise;
}

// นับชุดตัวอักษรสามตัวติดกัน เหมาะกับภาษาไทยเพราะไม่ต้องตัดคำก่อน
function grams(s: string, n = 3): Grams {
  const t = s.replace(/\s+/g, '');
  const m = new Map<string, number>();
  for (let i = 0; i + n <= t.length; i++) {
    const g = t.slice(i, i + n);
    m.set(g, (m.get(g) || 0) + 1);
  }
  let sum = 0;
  for (const v of m.values()) sum += v * v;
  return { m, norm: Math.sqrt(sum) || 1 };
}

function similarity(a: Grams, b: Grams): number {
  let num = 0;
  const [small, big] = a.m.size < b.m.size ? [a, b] : [b, a];
  for (const [g, v] of small.m) {
    const w = big.m.get(g);
    if (w) num += v * w;
  }
  return num / (a.norm * b.norm);
}

async function searchChunks(question: string): Promise<Chunk[]> {
  const chunks = await loadChunks();
  const q = grams(question);
  return chunks
    .map((c, i) => ({ i, score: similarity(grams(c.text), q) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_K)
    .map(({ i }) => chunks[i]);
}

// ---------- โหมด vector (ค้นด้วยความหมาย ใช้ vectors.json ที่สร้างไว้ล่วงหน้า) ----------

interface VectorChunk extends Chunk {
  v: number[];
}

interface VectorsFile {
  model: string;
  dim: number;
  chunks: VectorChunk[];
}

let vectorsPromise: Promise<VectorsFile | null> | null = null;

async function loadVectors(): Promise<VectorsFile | null> {
  if (!vectorsPromise) {
    vectorsPromise = (async () => {
      try {
        const res = await fetch(VECTORS_FILE);
        if (!res.ok) return null;
        const data = await res.json();
        if (!data.chunks || !data.chunks.length) return null;
        return data as VectorsFile;
      } catch {
        return null;
      }
    })();
  }
  return vectorsPromise;
}

async function embedQuestion(question: string, dim: number): Promise<number[]> {
  const res = await fetch(`${WORKER_URL}/v1beta/models/${EMBED_MODEL}:embedContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: { parts: [{ text: question }] },
      outputDimensionality: dim,
    }),
  });
  if (!res.ok) throw new Error(`Embedding ไม่สำเร็จ: ${res.status}`);
  const data = await res.json();
  const v: number[] | undefined = data.embedding?.values;
  if (!v) throw new Error('ไม่ได้เวกเตอร์กลับมา');
  const n = Math.hypot(...v);
  return v.map(x => x / n);
}

/** ลองค้นด้วยเวกเตอร์ก่อน (แม่นกว่า เข้าใจความหมาย) ถ้าไม่มี vectors.json หรือ embed ไม่สำเร็จ ให้ถอยไปค้นแบบ n-gram แทน */
async function searchBestChunks(question: string): Promise<Chunk[]> {
  const vectors = await loadVectors();
  if (!vectors) return searchChunks(question);

  try {
    const qv = await embedQuestion(question, vectors.dim);
    return vectors.chunks
      .map((c, i) => ({ i, score: c.v.reduce((s, x, k) => s + x * qv[k], 0) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, TOP_K)
      .map(({ i }) => vectors.chunks[i]);
  } catch (e) {
    console.warn('ค้นด้วยเวกเตอร์ไม่สำเร็จ ถอยไปใช้การเทียบตัวอักษรแทน:', e);
    return searchChunks(question);
  }
}

function buildPrompt(question: string, found: Chunk[], lang: Language): string {
  const docs = found.map((f, i) => `[${i + 1} / ${f.source}]\n${f.text}`).join('\n\n');

  if (lang === 'en') {
    return `You are the ApexDrive Private Concierge for the APEX Sports showroom.
Answer using ONLY the documents below.
If the documents do not contain the answer, say you do not have that information in the showroom documents and suggest contacting our staff at 02-199-8899 or 089-888-9900.
Do not guess and do not add facts from general knowledge.
Answer concisely in English.

Documents:
${docs}

Question:
${question}`;
  }

  return `คุณคือ ApexDrive Private Concierge ผู้ช่วยตอบคำถามของโชว์รูม APEX Sports
ให้ตอบโดยใช้เฉพาะข้อมูลในเอกสารด้านล่างเท่านั้น
ถ้าเอกสารไม่มีคำตอบ ให้ตอบว่าไม่พบข้อมูลนี้ในเอกสารของโชว์รูม และแนะนำให้ติดต่อเจ้าหน้าที่ โทร 02-199-8899 หรือ 089-888-9900
ห้ามเดา ห้ามเติมข้อมูลจากความรู้ทั่วไป
ตอบเป็นภาษาไทย สั้น กระชับ สุภาพ

เอกสาร:
${docs}

คำถาม:
${question}`;
}

export interface RagResult {
  text: string;
  citations: string[];
  recommendedIds: string[];
}

/** ถ้ายังไม่ตั้ง VITE_WORKER_URL จะคืน null ให้ conciergeService ไปใช้ fallback แบบ rule-based แทน */
export async function askRag(question: string, lang: Language): Promise<RagResult | null> {
  if (!WORKER_URL) return null;

  const found = await searchBestChunks(question);
  if (!found.length) return null;

  const res = await fetch(`${WORKER_URL}/v1beta/models/${AI_MODEL}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(question, found, lang) }] }],
    }),
  });

  if (!res.ok) throw new Error(`Worker responded ${res.status}`);

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  if (!text) throw new Error('Empty response from worker');

  const citations = Array.from(new Set(found.map(f => f.source)));
  // สแกนหาชื่อรุ่นที่ AI พูดถึงจริงในคำตอบทั้งหมด (ไม่จำกัดแค่ไฟล์ที่ retrieve มา)
  // เพื่อให้การ์ดรถตรงกับสิ่งที่ตอบจริงเสมอ ไม่ใช่ไฟล์ที่ค้นเจอแต่ AI ไม่ได้พูดถึง
  const lowerText = text.toLowerCase();
  const recommendedIds = products
    .filter(p => lowerText.includes(p.model.toLowerCase()))
    .map(p => p.id);

  return { text, citations, recommendedIds };
}
