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
    if (!API_KEY) {
      throw new Error(
        "Missing GNews API key. Create a .env file with VITE_GNEWS_API_KEY=your_key from gnews.io"
      );
    }

    // Helper to build params for a given page
    const buildParams = (page: number) => {
      const params = new URLSearchParams({
        apikey: API_KEY,
        lang: "en",
        max: String(Math.min(10, Math.max(1, limit))),
        page: String(page),
      });

      if (category && category !== "All") {
        params.append("topic", category.toLowerCase());
      } else if (query && query !== "latest") {
        params.append("q", query);
      }
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
      const url = `${BASE_URL}${endpoint}?${buildParams(page).toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(
            "Invalid or unauthorized API key. Set VITE_GNEWS_API_KEY in your .env (get one free at gnews.io)."
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
