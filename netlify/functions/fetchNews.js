export async function handler(event, context) {
  const API_KEY = process.env.GNEWS_API_KEY; // No VITE_ prefix, keeps it secret
  const url = `https://gnews.io/api/v4/top-headlines?lang=en&max=10&page=1&apikey=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch news" })
    };
  }
}
