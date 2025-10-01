import React from "react";
import ReviewCard from "./ReviewCard";

const reviews = [
  {
    name: "Kehinde Matthew",
    initial: "K",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing lor elitLorem ipsum dolor sit amet, consectetur adipiscing lor elit...Lorem ipsum dolor sit amet, consectetur adipiscing lor elit......",
    rating: 5,
  },
  {
    name: "Kehinde Matthew",
    initial: "E",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing lor elit...",
    rating: 4,
  },
  {
    name: "Tosin Ayo",
    initial: "T",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing lor elit...Lorem ipsum dolor sit amet, consectetur adipiscing lor elit...Lorem ipsum dolor sit amet, consectetur adipiscing lor elit......",
    rating: 1,
  },
  {
    name: "Kehinde Matthew",
    initial: "K",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing lor elit......",
    rating: 3,
  },
];

const Reviews = () => {
  return (
    <div className="reviews">
      <h3>Reviews</h3>
      {reviews.map((review, index) => (
        <ReviewCard key={index} {...review} />
      ))}
    </div>
  );
};

export default Reviews;
