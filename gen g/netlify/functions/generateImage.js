export async function handler(event) {
  try {
    const { prompt } = JSON.parse(event.body);

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instances: [{ prompt }] })
      }
    );

    const data = await res.json();

    let imageUrl = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa';

    if (data?.predictions?.[0]?.bytesBase64Encoded) {
      imageUrl = `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`;
    }

    return { statusCode: 200, body: JSON.stringify({ imageUrl }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
