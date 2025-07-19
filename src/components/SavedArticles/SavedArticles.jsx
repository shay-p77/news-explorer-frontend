import React from "react";
import "./SavedArticles.css";
import NewsCard from "../NewsCard/NewsCard";
import Footer from "../Footer/Footer";

function SavedArticles({ savedArticles, onRemove, currentUser }) {
  const articleCount = savedArticles.length;
  const username = currentUser?.name || "User";

  const keywords = savedArticles.map((a) => a.keyword).filter(Boolean);

  const keywordFrequency = {};
  keywords.forEach((kw) => {
    keywordFrequency[kw] = (keywordFrequency[kw] || 0) + 1;
  });

  const sortedKeywords = Object.keys(keywordFrequency).sort(
    (a, b) => keywordFrequency[b] - keywordFrequency[a]
  );

  const keywordDisplay = () => {
    if (sortedKeywords.length === 0) return "no keywords";
    if (sortedKeywords.length === 1) return sortedKeywords[0];
    if (sortedKeywords.length === 2)
      return `${sortedKeywords[0]} and ${sortedKeywords[1]}`;
    return `${sortedKeywords[0]}, ${sortedKeywords[1]}, and ${
      sortedKeywords.length - 2
    } others`;
  };

  return (
    <section className="saved">
      <p className="saved__label">Saved articles</p>
      <h2 className="saved__title">
        {username}, you have {articleCount} saved{" "}
        {articleCount === 1 ? "article" : "articles"}
      </h2>
      <p className="saved__keywords">
        By keywords:{" "}
        <span className="saved__keywords-bold">{keywordDisplay()}</span>
      </p>

      <div className="saved__cards">
        {savedArticles.map((article) => (
          <NewsCard
            key={article.link}
            card={article}
            isSaved={true}
            isOnSavedPage={true}
            onUnsave={onRemove}
            isLoggedIn={true}
          />
        ))}
      </div>
      <Footer />
    </section>
  );
}

export default SavedArticles;
