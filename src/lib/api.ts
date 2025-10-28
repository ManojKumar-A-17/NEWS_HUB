// GNews API integration
// Get a free API key: https://gnews.io/
// Put it in a Vite env file as VITE_GNEWS_API_KEY

const BASE_URL = "https://gnews.io/api/v4";

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

interface GNewsResponse {
  totalArticles: number;
  articles: NewsArticle[];
}

export const fetchNews = async (
  query: string = "latest",
  category: string = "All",
  limit: number = 10
): Promise<GNewsResponse> => {
  try {
  const API_KEY = (import.meta as any).env?.VITE_GNEWS_API_KEY as string | undefined;
  const IS_PROD = Boolean((import.meta as any).env?.PROD);
  // In production, prefer serverless function to avoid CORS and hide keys
  const USE_SERVER = IS_PROD || !API_KEY;

    // Helper to build params for a given page
    const buildParams = (page: number) => {
      const params = new URLSearchParams({
        lang: "en",
        max: String(Math.min(10, Math.max(1, limit))),
        page: String(page),
      });

      if (category && category !== "All") {
        params.append("topic", category.toLowerCase());
      } else if (query && query !== "latest") {
        params.append("q", query);
      }
      // Only include apikey when calling GNews directly
      if (!USE_SERVER && API_KEY) params.append("apikey", API_KEY);
      return params;
    };

    // Determine endpoint based on inputs
    let endpoint = "";
    if (category && category !== "All") {
      endpoint = "/top-headlines";
    } else if (!query || query === "latest") {
      endpoint = "/top-headlines";
    } else {
      endpoint = "/search";
    }

    const perPage = Math.min(10, Math.max(1, limit));
    const pagesNeeded = Math.max(1, Math.ceil(limit / perPage));

    let totalArticles = 0;
    const aggregated: NewsArticle[] = [];

    for (let page = 1; page <= pagesNeeded; page++) {
      let url = "";
      const params = buildParams(page);

      if (!USE_SERVER && API_KEY) {
        // Direct call to GNews if a client-side key is provided
        url = `${BASE_URL}${endpoint}?${params.toString()}`;
      } else {
        // Use Netlify function to keep the key secret
        // Do not pass apikey in params; function adds it from server env
        params.delete("apikey");
        url = `/.netlify/functions/fetchNews?${params.toString()}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(
            API_KEY
              ? "Invalid or unauthorized API key. Set VITE_GNEWS_API_KEY in your .env (get one free at gnews.io)."
              : "Unauthorized calling Netlify function. Ensure GNEWS_API_KEY is set in your Netlify site env."
          );
        }
        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again later or upgrade your GNews plan.");
        }
        throw new Error(`Failed to fetch news (${response.status}): ${response.statusText}`);
      }

      const data: GNewsResponse = await response.json();
      if (page === 1) totalArticles = data.totalArticles;
      if (Array.isArray(data.articles)) {
        for (const a of data.articles) {
          aggregated.push(a);
          if (aggregated.length >= limit) break;
        }
      }
      if (aggregated.length >= limit) break;
    }

    return { totalArticles, articles: aggregated.slice(0, limit) };
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
