import React from "react";
import Carousel from "react-bootstrap/Carousel";

const Slide = ({ title, image, averageRating }) => {
  return (
    <>
      <div className="m-2 mb-5"></div>
      <div className="col-md-8 offset-md-2 bg-secondary">
        <img className="d-inline-block img-fluid" src={image} alt={title} />
        <div className="slide-rating-div">
          <p>
            Average Rating
            {averageRating}
          </p>
        </div>

        <Carousel.Caption className="carousel slide ">
          <h3>{title}</h3>
        </Carousel.Caption>
      </div>
    </>
  );
};

export default Slide;
