// const API_KEY = "b35e1697cbb44268990d38f3e121a612";

// const newsApiBaseUrl =
//   process.env.NODE_ENV === "production"
//     ? "https://nomoreparties.co/news/v2/everything"
//     : "https://newsapi.org/v2/everything";

// export async function fetchNews(keyword) {
//   const today = new Date().toISOString().slice(0, 10);
//   const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//     .toISOString()
//     .slice(0, 10);

//   const url = `${newsApiBaseUrl}?q=${encodeURIComponent(
//     keyword
//   )}&from=${sevenDaysAgo}&to=${today}&apiKey=${API_KEY}&pageSize=100`;

//   const res = await fetch(url);

//   if (!res.ok) {
//     throw new Error(`Error: ${res.status}`);
//   }

//   const data = await res.json();

//   if (!data.articles) return [];

//   return data.articles.map((article) => ({
//     title: article.title,
//     description: article.description,
//     date: new Date(article.publishedAt).toLocaleDateString(),
//     source: article.source.name,
//     image:
//       article.urlToImage || "https://via.placeholder.com/400x200?text=No+Image",
//     link: article.url,
//   }));
// }
