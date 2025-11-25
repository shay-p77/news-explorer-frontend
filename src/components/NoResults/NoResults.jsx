import React from "react";
import "./NoResults.css";
import noResultsIcon from "../../assets/not-found.svg";

function NoResults() {
  return (
    <section className="no__results">
      <img
        src={noResultsIcon}
        alt="Nothing found"
        className="no__results-icon"
      />
      <h2 className="no__results-title">Nothing found</h2>
      <p className="no__results-subtitle">
        Sorry, but nothing matched
        <br /> your search terms.
      </p>
    </section>
  );
}

export default NoResults;
