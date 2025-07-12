import React, { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({ cards, isLoggedIn, savedArticles, onSave, onUnsave }) {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleCards = cards.slice(0, visibleCount);

  return (
    <section className="news__card-list">
      <h2 className="news__card-list_title">Search results</h2>
      <div className="news__card-list_container">
        {visibleCards.map((card, index) => {
          const isSaved = savedArticles.some((a) => a.link === card.link);
          return (
            <NewsCard
              key={card.link || index}   
              card={card}
              isSaved={isSaved}
              isLoggedIn={isLoggedIn}
              onSave={onSave}
              onUnsave={onUnsave}
            />
          );
        })}
      </div>
      {visibleCount < cards.length && (
        <button className="news__card-list_button" onClick={handleShowMore}>
          Show more
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
