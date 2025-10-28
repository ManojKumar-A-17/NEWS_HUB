export async function handler(event, context) {
  const API_KEY = process.env.GNEWS_API_KEY; // Keep secret on server
  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing GNEWS_API_KEY on Netlify" }),
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  }

  const BASE_URL = "https://gnews.io/api/v4";
  const params = new URLSearchParams({ apikey: API_KEY, lang: "en" });

  const { q, topic, page = "1", max = "10" } = event.queryStringParameters || {};
  if (q) params.append("q", q);
  if (topic) params.append("topic", topic);
  params.append("page", String(page));
  params.append("max", String(max));

  // Choose endpoint: use search when q is present, otherwise top-headlines
  const endpoint = q ? "/search" : "/top-headlines";
  const url = `${BASE_URL}${endpoint}?${params.toString()}`;

  try {
    const res = await fetch(url);
    const text = await res.text();
    const isJson = res.headers.get("content-type")?.includes("application/json");
    const body = isJson ? JSON.parse(text) : text;

    return {
      statusCode: res.status,
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch news" }),
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  }
}
