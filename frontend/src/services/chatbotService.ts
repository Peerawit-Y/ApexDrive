export async function askChatbot(
  query: string,
  apiEndpoint?: string
): Promise<{ text: string; sources: string[] }> {
  // If user provided a backend / Cloudflare Worker URL
  if (apiEndpoint && apiEndpoint.trim() !== '') {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query })
      });
      if (!response.ok) {
        throw new Error(`API returned HTTP ${response.status}`);
      }
      const data = await response.json();
      return {
        text: data.answer || data.text,
        sources: data.sources || ['ApexDrive Technical Knowledge Base']
      };
    } catch (err) {
      console.error("Direct API call failed:", err);
      throw err;
    }
  }

  // Fallback when no backend is configured yet
  return {
    text: "ระบบ Chatbot อยู่ระหว่างการตั้งค่าเชื่อมต่อกับ Cloudflare Worker และ Knowledge Base ครับ",
    sources: []
  };
}
