import React, { useState } from "react";
import saveDefault from "../../assets/save_default.svg";
import saveHover from "../../assets/save_hover.svg";
import saveMarked from "../../assets/save_marked.svg";
import deleteIcon from "../../assets/trash.svg";
import deleteIconDark from "../../assets/trash-hover.svg";
import "./NewsCard.css";

function NewsCard({
  card,
  isSaved = false,
  isLoggedIn = false,
  onSave,
  onUnsave,
  isOnSavedPage = false,
}) {
  const { title, description, date, source, image, link, keyword } = card;
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);

  const iconSrc = isSaved ? saveMarked : isHovered ? saveHover : saveDefault;

  const handleSaveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) return;

    if (isSaved || isOnSavedPage) {
      onUnsave(card);
    } else {
      onSave(card);
    }
  };

  return (
    <article className="news-card">
      {/* Keyword label */}
      {isOnSavedPage && keyword && (
        <span className="news-card__keyword">{keyword}</span>
      )}

      {/* Wrapper div for button and tooltip with relative positioning */}
      <div
        style={{ position: "relative" }}
        onMouseEnter={() =>
          isOnSavedPage ? setIsDeleteHovered(true) : setIsHovered(true)
        }
        onMouseLeave={() =>
          isOnSavedPage ? setIsDeleteHovered(false) : setIsHovered(false)
        }
      >
        {/* Tooltip for not logged in */}
        {!isLoggedIn && isHovered && !isOnSavedPage && (
          <div className="news-card__tooltip">Sign in to save articles</div>
        )}

        {/* Save or Delete button */}
        <button
          className="news-card__save-button"
          onClick={handleSaveClick}
          type="button"
          aria-label={isOnSavedPage ? "Remove article" : "Save article"}
        >
          <img
            src={
              isOnSavedPage
                ? isDeleteHovered
                  ? deleteIconDark
                  : deleteIcon
                : iconSrc
            }
            alt={isOnSavedPage ? "Remove article" : isSaved ? "Saved" : "Save"}
            className="news-card__delete-icon"
          />
        </button>

        {/* Tooltip for delete button */}
        {isOnSavedPage && isDeleteHovered && (
          <div className=" news-card__tooltip-delete">Remove from saved</div>
        )}
      </div>

      <a
        href={link}
        className="news-card__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={image} alt={title} className="news-card__image" />
        <div className="news-card__info">
          <p className="news-card__date">{date}</p>
          <h3 className="news-card__title">{title}</h3>
          <p className="news-card__description">{description}</p>
          <p className="news-card__source">{source}</p>
        </div>
      </a>
    </article>
  );
}

export default NewsCard;
