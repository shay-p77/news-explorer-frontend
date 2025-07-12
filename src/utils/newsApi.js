const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

export async function getNews(keyword) {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);

  const from = weekAgo.toISOString().split("T")[0];
  const to = today.toISOString().split("T")[0];

  const url = `${BASE_URL}?q=${encodeURIComponent(
    keyword
  )}&apiKey=${API_KEY}&from=${from}&to=${to}&pageSize=100`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`API Error: ${res.status}`);

  const data = await res.json();
  return data.articles.map((article) => ({
    title: article.title,
    description: article.description,
    date: new Date(article.publishedAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    source: article.source.name,
    image:
      article.urlToImage || "https://via.placeholder.com/400x200?text=No+Image",
    link: article.url,
  }));
}
