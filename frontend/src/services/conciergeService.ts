import { products } from './productService';
import { getLocalizedProduct } from '../data/productsEn';
import { Language } from '../context/LanguageContext';
import { askRag, detectQueryLang, HistoryTurn } from './ragService';

export interface ChatResponse {
  text: string;
  citations?: string[];
  recommendedIds?: string[];
  searchMode?: 'vector' | 'local';
}

/**
 * Queries the RAG pipeline (Cloudflare Worker + APEXSports docs, configured via VITE_WORKER_URL)
 * if available; otherwise answers directly from the verified ApexDrive catalog so the UI works immediately.
 */
export async function askConcierge(
  query: string,
  lang: Language,
  history: HistoryTurn[] = []
): Promise<ChatResponse> {
  // Primary path: RAG pipeline (Cloudflare Worker + docs/)
  try {
    const rag = await askRag(query, lang, history);
    if (rag) return rag;
  } catch (err) {
    console.warn('RAG Worker unavailable, falling back to local catalog:', err);
  }

  // Fallback: rule-based answers from local catalog when Worker is unreachable
  await new Promise(resolve => setTimeout(resolve, 300));

  const effectiveLang = detectQueryLang(query, lang);
  const q = query.toLowerCase();
  const localized = products.map(p => getLocalizedProduct(p, effectiveLang));
  const isEn = effectiveLang === 'en';

  // 1. Specific model mention(s)
  const mentioned = localized.filter(
    p =>
      q.includes(p.model.toLowerCase()) ||
      q.includes(p.brand.toLowerCase()) ||
      q.includes(p.id.replace(/-/g, ' '))
  );

  if (mentioned.length >= 2) {
    const [a, b] = mentioned;
    return {
      text: isEn
        ? `Comparing the ${a.brand} ${a.model} and ${b.brand} ${b.model}:\n\n• ${a.model}: ${a.horsepower.toLocaleString()} HP · 0–100 km/h in ${a.acceleration_0_100_sec}s · ${a.drivetrain} · ฿${a.price.toLocaleString()} THB\n• ${b.model}: ${b.horsepower.toLocaleString()} HP · 0–100 km/h in ${b.acceleration_0_100_sec}s · ${b.drivetrain} · ฿${b.price.toLocaleString()} THB\n\nYou can explore either model below or open the side-by-side comparison matrix.`
        : `เปรียบเทียบระหว่าง ${a.brand} ${a.model} และ ${b.brand} ${b.model}:\n\n• ${a.model}: ${a.horsepower.toLocaleString()} แรงม้า · 0–100 ใน ${a.acceleration_0_100_sec} วินาที · ${a.drivetrain} · ฿${a.price.toLocaleString()} THB\n• ${b.model}: ${b.horsepower.toLocaleString()} แรงม้า · 0–100 ใน ${b.acceleration_0_100_sec} วินาที · ${b.drivetrain} · ฿${b.price.toLocaleString()} THB\n\nสามารถคลิกดูรายละเอียดเชิงลึกของแต่ละรุ่นได้ด้านล่างครับ`,
      citations: [...a.sources.slice(0, 1), ...b.sources.slice(0, 1)],
      recommendedIds: [a.id, b.id]
    };
  }

  if (mentioned.length === 1) {
    const car = mentioned[0];
    return {
      text: isEn
        ? `${car.brand} ${car.model} (MY${car.year})\n${car.description}\n\n• Output: ${car.horsepower.toLocaleString()} HP / ${car.torque_nm.toLocaleString()} Nm\n• 0–100 km/h: ${car.acceleration_0_100_sec} s · Top Speed: ${car.top_speed_kmh} km/h\n• Drivetrain: ${car.drivetrain} · Starting from ฿${car.price.toLocaleString()} THB`
        : `${car.brand} ${car.model} (MY${car.year})\n${car.description}\n\n• พละกำลัง: ${car.horsepower.toLocaleString()} แรงม้า / แรงบิด ${car.torque_nm.toLocaleString()} Nm\n• อัตราเร่ง 0–100: ${car.acceleration_0_100_sec} วินาที · ความเร็วสูงสุด ${car.top_speed_kmh} กม./ชม.\n• ระบบขับเคลื่อน: ${car.drivetrain} · ราคาเริ่มต้น ฿${car.price.toLocaleString()} THB`,
      citations: car.sources,
      recommendedIds: [car.id]
    };
  }

  // 2. Highest horsepower / fastest
  if (q.includes('แรงม้า') || q.includes('แรงสุด') || q.includes('เร็ว') || q.includes('horsepower') || q.includes('fastest') || q.includes('most hp') || q.includes('power')) {
    const topHp = [...localized].sort((a, b) => b.horsepower - a.horsepower).slice(0, 3);
    return {
      text: isEn
        ? `The highest-output automobiles in the ApexDrive collection are:\n\n1. ${topHp[0].brand} ${topHp[0].model} — ${topHp[0].horsepower.toLocaleString()} HP (0–100 in ${topHp[0].acceleration_0_100_sec}s)\n2. ${topHp[1].brand} ${topHp[1].model} — ${topHp[1].horsepower.toLocaleString()} HP (0–100 in ${topHp[1].acceleration_0_100_sec}s)\n3. ${topHp[2].brand} ${topHp[2].model} — ${topHp[2].horsepower.toLocaleString()} HP (0–100 in ${topHp[2].acceleration_0_100_sec}s)`
        : `ยนตรกรรมที่มีพละกำลังและอัตราเร่งสูงสุดในโชว์รูม ApexDrive ได้แก่:\n\n1. ${topHp[0].brand} ${topHp[0].model} — ${topHp[0].horsepower.toLocaleString()} แรงม้า (0–100 ใน ${topHp[0].acceleration_0_100_sec} วินาที)\n2. ${topHp[1].brand} ${topHp[1].model} — ${topHp[1].horsepower.toLocaleString()} แรงม้า (0–100 ใน ${topHp[1].acceleration_0_100_sec} วินาที)\n3. ${topHp[2].brand} ${topHp[2].model} — ${topHp[2].horsepower.toLocaleString()} แรงม้า (0–100 ใน ${topHp[2].acceleration_0_100_sec} วินาที)`,
      citations: ['ApexDrive Official Technical Telemetry Archive'],
      recommendedIds: topHp.map(c => c.id)
    };
  }

  // 3. Daily driving / budget / beginner
  // ไม่จับคำถามที่ถามเรื่องผ่อน/ดาวน์/ดอกเบี้ย เพราะตัวเลขผ่อนจริงมีแค่ใน RAG docs เท่านั้น
  const asksInstallment = /ผ่อน|ดาวน์|งวด|ดอกเบี้ย|installment|monthly payment|down payment/i.test(q);
  const budgetMatch = q.match(/(\d+(?:\.\d+)?)\s*(?:ล้าน|m\b)/i);
  if (!asksInstallment && (q.includes('ทุกวัน') || q.includes('งบ') || q.includes('ถูก') || q.includes('daily') || q.includes('budget') || q.includes('beginner') || budgetMatch)) {
    const budgetBaht = budgetMatch ? parseFloat(budgetMatch[1]) * 1_000_000 : null;
    const sorted = [...localized].sort((a, b) => a.price - b.price);
    const withinBudget = budgetBaht ? sorted.filter(p => p.price <= budgetBaht) : sorted;

    if (budgetBaht && withinBudget.length === 0) {
      const cheapest = sorted[0];
      return {
        text: isEn
          ? `No model is currently available under ฿${(budgetBaht / 1_000_000).toLocaleString()}M THB. Our most accessible model is the ${cheapest.brand} ${cheapest.model} at ฿${cheapest.price.toLocaleString()} THB.`
          : `ยังไม่มีรุ่นที่ราคาไม่เกิน ${(budgetBaht / 1_000_000).toLocaleString()} ล้านบาทครับ รุ่นที่เข้าถึงง่ายที่สุดตอนนี้คือ ${cheapest.brand} ${cheapest.model} ราคา ฿${cheapest.price.toLocaleString()} THB`,
        citations: ['ApexDrive Showroom Pricing Guide (Thailand Official)'],
        recommendedIds: [cheapest.id]
      };
    }

    const accessible = withinBudget.slice(0, 3);
    const lines = accessible.map(c =>
      isEn
        ? `• ${c.model} — ฿${c.price.toLocaleString()} THB (${c.horsepower} HP · ${c.fuel_type})`
        : `• ${c.model} — ฿${c.price.toLocaleString()} THB (${c.horsepower} แรงม้า · ${c.fuel_type})`
    ).join('\n');
    const heading = budgetBaht
      ? (isEn
          ? `Models under ฿${(budgetBaht / 1_000_000).toLocaleString()}M THB:`
          : `รุ่นที่ราคาไม่เกิน ${(budgetBaht / 1_000_000).toLocaleString()} ล้านบาท ได้แก่:`)
      : (isEn
          ? 'For daily usability or an accessible entry into performance driving:'
          : 'รุ่นที่เหมาะสำหรับการขับใช้งานทุกวันและเข้าถึงง่าย ได้แก่:');

    return {
      text: `${heading}\n\n${lines}`,
      citations: ['ApexDrive Showroom Pricing Guide (Thailand Official)'],
      recommendedIds: accessible.map(c => c.id)
    };
  }

  // 4. Electric / Hybrid
  if (q.includes('ไฟฟ้า') || /\bev\b/.test(q) || q.includes('electric') || q.includes('hybrid') || q.includes('ไฮบริด')) {
    const electrified = localized.filter(p => p.fuel_type.includes('Electric') || p.fuel_type.includes('Hybrid'));
    if (electrified.length === 0) {
      return {
        text: isEn
          ? `All ${products.length} vehicles in our current showroom are petrol-powered — we do not have electric or hybrid models at this time.`
          : `รถทั้ง ${products.length} รุ่นในโชว์รูมตอนนี้เป็นเครื่องยนต์สันดาปทั้งหมด ยังไม่มีรุ่นพลังงานไฟฟ้าหรือไฮบริดครับ`,
        citations: ['ApexDrive Electrified Powertrain Archive']
      };
    }
    return {
      text: isEn
        ? `We currently offer ${electrified.length} electrified performance models spanning Plug-in Hybrids (PHEV) and Pure Electric (BEV), led by the ${electrified[0].brand} ${electrified[0].model} (${electrified[0].horsepower.toLocaleString()} HP).`
        : `ในโชว์รูมมีรถพลังงานไฟฟ้าและปลั๊กอินไฮบริดทั้งหมด ${electrified.length} รุ่น นำโดย ${electrified[0].brand} ${electrified[0].model} (${electrified[0].horsepower.toLocaleString()} แรงม้า) ครับ`,
        citations: ['ApexDrive Electrified Powertrain Archive'],
      recommendedIds: electrified.slice(0, 3).map(c => c.id)
    };
  }

  // 5. RWD / AWD
  if (q.includes('rwd') || q.includes('ขับหลัง') || q.includes('awd') || q.includes('ขับสี่') || q.includes('4 ล้อ')) {
    const wantRwd = q.includes('rwd') || q.includes('ขับหลัง');
    const matched = localized.filter(p => p.drivetrain === (wantRwd ? 'RWD' : 'AWD'));
    return {
      text: isEn
        ? `We have ${matched.length} ${wantRwd ? 'Rear-Wheel Drive (RWD)' : 'All-Wheel Drive (AWD)'} models in the collection, including ${matched.slice(0, 3).map(c => `${c.brand} ${c.model}`).join(', ')}.`
        : `เรามีรุ่นระบบขับเคลื่อน ${wantRwd ? 'ล้อหลัง (RWD)' : '4 ล้อ (AWD)'} ทั้งหมด ${matched.length} รุ่น อาทิ ${matched.slice(0, 3).map(c => `${c.brand} ${c.model}`).join(', ')} ครับ`,
      citations: ['ApexDrive Drivetrain Classification'],
      recommendedIds: matched.slice(0, 3).map(c => c.id)
    };
  }

  // Default helpful concierge response when both RAG and local rules don't match
  return {
    text: isEn
      ? `I am your ApexDrive Private Concierge. I can assist you with technical specifications, horsepower & acceleration rankings, head-to-head model comparisons, or tailored recommendations across all ${products.length} vehicles in our showroom.\n\nTry asking about a specific model (e.g. "APEX X Hyper" or "APEX 35 GT") or your driving preference.`
      : `ยินดีต้อนรับสู่ ApexDrive Private Concierge ครับ ผมสามารถช่วยค้นหาข้อมูลสเปกรถยนต์ เปรียบเทียบสมรรถนะระหว่างรุ่น หรือแนะนำรถตามงบประมาณและสไตล์การขับขี่จากคลังทั้ง ${products.length} รุ่นของเราได้ครับ\n\nลองพิมพ์ชื่อรุ่นที่สนใจ (เช่น "APEX X Hyper", "APEX 35 GT") หรือเลือกคำถามแนะนำด้านล่างได้เลยครับ`,
    citations: ['ApexDrive Concierge Knowledge Base']
  };
}
