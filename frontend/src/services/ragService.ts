import { Language } from '../context/LanguageContext';
import { products } from './productService';

const ENV = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;

const DOCS_BASE = (ENV?.VITE_DOCS_BASE || 'docs').replace(/\/+$/, '');

// Worker URL ไม่ใช่ความลับ (เป็นที่อยู่สาธารณะ ป้องกันด้วย CORS origin check ใน worker.js อยู่แล้ว)
// กุญแจจริง (Gemini API key) เก็บเป็น Secret บน Cloudflare เท่านั้น
const DEFAULT_WORKER_URL = 'https://apexdrive-chatbot.ppeerawit789.workers.dev';
const WORKER_URL = (ENV?.VITE_WORKER_URL || DEFAULT_WORKER_URL).replace(/\/+$/, '');
const AI_MODEL = ENV?.VITE_AI_MODEL || 'gemini-flash-lite-latest';
const EMBED_MODEL = 'gemini-embedding-001';
const VECTORS_FILE = 'vectors.json';

const CHUNK_SIZE = 500;
const OVERLAP = 100;
const TOP_K = 6;

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

// คำสำคัญเฉพาะรุ่นสำหรับ Hybrid Search (เพิ่มคะแนนให้ไฟล์ตรงรุ่นเมื่อถามสั้นๆ)
const MODEL_HINTS: Array<{ file: string; keywords: string[] }> = [
  { file: '01-apex-35-gt.txt', keywords: ['35 gt', '35gt', 'custom-001'] },
  { file: '02-apex-4-coupe.txt', keywords: ['4 coupe', '4coupe', 'custom-002'] },
  { file: '03-apex-2-clubsport.txt', keywords: ['2 clubsport', 'clubsport', 'custom-003'] },
  { file: '04-apex-86-spirit.txt', keywords: ['86 spirit', '86', 'spirit', 'custom-004'] },
  { file: '05-apex-5-touring.txt', keywords: ['5 touring', 'touring', 'แวกอน', 'wagon', 'custom-005'] },
  { file: '06-apex-8-vantage.txt', keywords: ['8 vantage', 'vantage', 'custom-006'] },
  { file: '07-apex-10-evo.txt', keywords: ['10 evo', 'evo', 'v10', 'custom-007'] },
  { file: '08-apex-x-hyper.txt', keywords: ['x hyper', 'hyper', 'v12', 'custom-008'] },
  { file: '09-apex-suv-rs.txt', keywords: ['suv rs', 'suv', 'เอสยูวี', 'custom-009'] },
  { file: '10-apex-gt3-track.txt', keywords: ['gt3', 'track', 'custom-010'] },
];

export interface HistoryTurn {
  role: 'user' | 'assistant';
  text: string;
}

interface Chunk {
  source: string;
  part: number;
  text: string;
}

interface ScoredChunk extends Chunk {
  score: number;
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

function keywordBoost(queryLower: string, source: string): number {
  for (const hint of MODEL_HINTS) {
    if (hint.file === source && hint.keywords.some(k => queryLower.includes(k))) {
      return 0.15;
    }
  }
  return 0;
}

async function searchChunksLocal(searchQuery: string): Promise<ScoredChunk[]> {
  const chunks = await loadChunks();
  const q = grams(searchQuery);
  const qLower = searchQuery.toLowerCase();
  return chunks
    .map(c => ({
      ...c,
      score: similarity(grams(c.text), q) + keywordBoost(qLower, c.source),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_K);
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

/** ลองค้นด้วยเวกเตอร์ก่อน (Hybrid: Vector + Keyword Boost) ถ้าไม่สำเร็จให้ถอยไปค้นแบบ n-gram แทน */
async function searchBestChunks(
  searchQuery: string
): Promise<{ found: ScoredChunk[]; mode: 'vector' | 'local' }> {
  const vectors = await loadVectors();
  if (!vectors) {
    return { found: await searchChunksLocal(searchQuery), mode: 'local' };
  }

  try {
    const qv = await embedQuestion(searchQuery, vectors.dim);
    const qLower = searchQuery.toLowerCase();
    const found = vectors.chunks
      .map(c => {
        const vecScore = c.v.reduce((s, x, k) => s + x * qv[k], 0);
        return {
          source: c.source,
          part: c.part,
          text: c.text,
          score: vecScore + keywordBoost(qLower, c.source),
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, TOP_K);
    return { found, mode: 'vector' };
  } catch (e) {
    console.warn('ค้นด้วยเวกเตอร์ไม่สำเร็จ ถอยไปใช้การเทียบตัวอักษรแทน:', e);
    return { found: await searchChunksLocal(searchQuery), mode: 'local' };
  }
}

/** ถ้าคำถามปัจจุบันสั้นและไม่ได้ระบุชื่อรุ่น ให้ดึงชื่อรุ่นจากบทสนทนาก่อนหน้ามาช่วยค้น */
function buildSearchQuery(question: string, history: HistoryTurn[]): string {
  const qLower = question.toLowerCase();
  const hasModel = MODEL_HINTS.some(h => h.keywords.some(k => qLower.includes(k)));
  if (hasModel || history.length === 0) return question;

  const recentText = history.slice(-2).map(h => h.text).join(' ');
  const recentModels = products
    .filter(p => recentText.toLowerCase().includes(p.model.toLowerCase()))
    .map(p => p.model);

  if (recentModels.length === 1) {
    return `${recentModels[0]} ${question}`;
  }
  return question;
}

function buildPrompt(
  question: string,
  found: ScoredChunk[],
  lang: Language,
  history: HistoryTurn[]
): string {
  const docs = found
    .map((f, i) => `[ชิ้นที่ ${i + 1} จากไฟล์ ${f.source} ส่วนที่ ${f.part}]\n${f.text}`)
    .join('\n\n');

  const recentHistory = history
    .slice(-4)
    .map(h => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}`)
    .join('\n');

  const historyBlock = recentHistory
    ? (lang === 'en'
        ? `\nRecent conversation:\n${recentHistory}\n`
        : `\nบทสนทนาก่อนหน้า:\n${recentHistory}\n`)
    : '';

  if (lang === 'en') {
    return `You are the ApexDrive Private Concierge for the APEX Sports showroom.
Answer using ONLY the documents below.
If the documents do not contain the answer, say you do not have that information in the showroom documents and suggest contacting our staff at 02-XXX-XXXX or 089-XXX-XXXX.
Do not guess and do not add facts from general knowledge.
Give a complete, clear, polite answer in English (plain text without markdown asterisks).
${historyBlock}
Documents:
${docs}

Question:
${question}`;
  }

  return `คุณคือ ApexDrive Private Concierge ผู้ช่วยตอบคำถามของโชว์รูม APEX Sports
ให้ตอบโดยใช้เฉพาะข้อมูลในเอกสารด้านล่างเท่านั้น
ถ้าเอกสารไม่มีคำตอบ ให้ตอบว่าไม่พบข้อมูลนี้ในเอกสารของโชว์รูม และแนะนำให้ติดต่อเจ้าหน้าที่ โทร 02-XXX-XXXX หรือ 089-XXX-XXXX
ห้ามเดา ห้ามเติมข้อมูลจากความรู้ทั่วไป
ตอบเป็นภาษาไทยให้ครบถ้วน ชัดเจน กระชับ สุภาพ (ไม่ต้องใช้เครื่องหมาย ** Markdown)
${historyBlock}
เอกสาร:
${docs}

คำถาม:
${question}`;
}

export interface RagResult {
  text: string;
  citations: string[];
  recommendedIds: string[];
  searchMode: 'vector' | 'local';
}

/** ถ้ายังไม่ตั้ง VITE_WORKER_URL จะคืน null ให้ conciergeService ไปใช้ fallback แบบ rule-based แทน */
export async function askRag(
  question: string,
  lang: Language,
  history: HistoryTurn[] = []
): Promise<RagResult | null> {
  if (!WORKER_URL) return null;

  const searchQuery = buildSearchQuery(question, history);
  const { found, mode } = await searchBestChunks(searchQuery);
  if (!found.length) return null;

  const res = await fetch(`${WORKER_URL}/v1beta/models/${AI_MODEL}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(question, found, lang, history) }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!res.ok) throw new Error(`Worker responded ${res.status}`);

  const data = await res.json();
  const parts: Array<{ text?: string; thought?: boolean }> =
    data.candidates?.[0]?.content?.parts ?? [];
  const text = parts
    .filter(p => !p.thought && typeof p.text === 'string')
    .map(p => p.text)
    .join('')
    .trim();

  if (!text) throw new Error('Empty response from worker');

  // แสดงอ้างอิงเฉพาะ Top 3 ไฟล์ที่คะแนนสูงสุด พร้อมส่วนที่และคะแนนความใกล้เคียง
  const seenFiles = new Set<string>();
  const citations: string[] = [];
  for (const f of found) {
    if (seenFiles.has(f.source)) continue;
    seenFiles.add(f.source);
    const pct = Math.min(99, Math.round(f.score * 100));
    citations.push(
      lang === 'en'
        ? `${f.source} (part ${f.part} · ${pct}%)`
        : `${f.source} (ส่วนที่ ${f.part} · ${pct}%)`
    );
    if (citations.length >= 3) break;
  }

  // สแกนหาชื่อรุ่นที่ AI พูดถึงจริงในคำตอบทั้งหมด เพื่อให้การ์ดรถตรงกับสิ่งที่ตอบจริงเสมอ
  const lowerText = text.toLowerCase();
  const recommendedIds = products
    .filter(p => lowerText.includes(p.model.toLowerCase()))
    .map(p => p.id);

  return { text, citations, recommendedIds, searchMode: mode };
}
