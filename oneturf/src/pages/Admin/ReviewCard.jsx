import React from "react";

const ReviewCard = ({ name, initial, text, rating }) => {
  return (
    <div className="review-card">
      <div className="review-header">
        <div className="avatar">{initial}</div>
        <div>
          <p className="name">{name}</p>
          <p className="stars">{"⭐".repeat(rating)}{"☆".repeat(5 - rating)}</p>
        </div>
      </div>
      <p className="review-text">{text}</p>
      <a href="/" className="show-more">Show less</a>
    </div>
  );
};

export default ReviewCard;
