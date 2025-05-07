import React, { useEffect, useState } from 'react';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Review = () => {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8088/api/rates")
      .then((res) => res.json())
      .then((data) => {
        setRates(data);
      })
      .catch((error) => {
        console.error("Error fetching rates:", error);
      });
  }, []);

  useEffect(() => {
    if (rates.length > 0) {
      // Wait for DOM to update before initializing Owl Carousel
      setTimeout(() => {
        if ($('.testi-carousel').length && typeof $('.testi-carousel').owlCarousel === 'function') {
          $('.testi-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 3000,
            responsive: {
              0: { items: 1 },
              600: { items: 2 },
              1000: { items: 3 },
            },
          });
        } else {
          console.error('OwlCarousel is not available or not loaded properly.');
        }
      }, ); // Delay ensures DOM is ready
    }
  }, [rates]); // <- depends on `rates` so it runs after data is rendered

  return (
    <div id="reviews" className="section wb parallaxie" style={{ background: `url('uploads/reviews-bg.jpg')` }}>
      <div className="container">
        <div className="section-title text-center">
          <h3>Reviews</h3>
          <p>We thank all our awesome customers for their testimonials!</p>
        </div>
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="testi-carousel owl-carousel owl-theme">
              {rates.map((rate, index) => (
                <div className="testimonial clearfix" key={index}>
                  <figure className="testimonial_img">
                    <img
                      src={`http://localhost:8088/images/${rate.image}`}
                      alt=""
                      className="img-fluid"
                    />
                  </figure>
                  <div className="desc">
                    <h3><i className="fa fa-quote-left"></i> {rate.comment}</h3>
                    <p>{rate.comment1}</p>
                  </div>
                  <div className="testi-meta">
                    <h4>{rate.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
