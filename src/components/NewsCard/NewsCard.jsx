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
    <article className="news__card">
      {/* Keyword label */}
      {isOnSavedPage && keyword && (
        <span className="news__card-keyword">{keyword}</span>
      )}

      {/* Wrapper div for button and tooltip with relative positioning */}
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => isOnSavedPage ? setIsDeleteHovered(true) : setIsHovered(true)}
        onMouseLeave={() => isOnSavedPage ? setIsDeleteHovered(false) : setIsHovered(false)}
      >
        {/* Tooltip for not logged in */}
        {!isLoggedIn && isHovered && !isOnSavedPage && (
          <div className="news__card-tooltip">Sign in to save articles</div>
        )}

        {/* Save or Delete button */}
        <button
          className="news__card-save_button"
          onClick={handleSaveClick}
          type="button"
          aria-label={isOnSavedPage ? "Remove article" : "Save article"}
        >
          <img
            src={isOnSavedPage ? (isDeleteHovered ? deleteIconDark : deleteIcon) : iconSrc}
            alt={isOnSavedPage ? "Remove article" : isSaved ? "Saved" : "Save"}
            className="news__card-delete_icon"
          />
        </button>

        {/* Tooltip for delete button */}
        {isOnSavedPage && isDeleteHovered && (
          <div className=" news__card-tooltip_delete">
            Remove from saved
          </div>
        )}
      </div>

      <a
        href={link}
        className="news__card-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={image} alt={title} className="news__card-image" />
        <div className="news__card-info">
          <p className="news__card-date">{date}</p>
          <h3 className="news__card-title">{title}</h3>
          <p className="news__card-description">{description}</p>
          <p className="news__card-source">{source}</p>
        </div>
      </a>
    </article>
  );
}

export default NewsCard;
