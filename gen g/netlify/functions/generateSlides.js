export async function handler(event) {
  try {
    const { query } = JSON.parse(event.body);

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `
Create a 5-frame strategic narrative deck about: ${query}
Frames:
1) Problem Frame
2) Tension Frame
3) Insight Frame
4) Solution Frame
5) Vision Frame

Return JSON:
[
 {headline, points[], layoutType, imagePrompt}
]
` }]}],
          generationConfig: { responseMimeType: "application/json" }
        })
      }
    );

    const data = await res.json();
    const slides = JSON.parse(data.candidates[0].content.parts[0].text);

    return { statusCode: 200, body: JSON.stringify({ slides }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
