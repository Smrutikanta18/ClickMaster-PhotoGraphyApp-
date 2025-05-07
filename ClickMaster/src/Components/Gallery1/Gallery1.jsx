import React, { useEffect, useState } from "react";
import Isotope from "isotope-layout";
import imagesLoaded from "imagesloaded";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Gallery1 = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8088/api/gallery/all") // Replace with your actual backend endpoint
      .then((res) => res.json())
      .then((data) => setGalleryItems(data))
      .catch((err) => console.error("Error fetching gallery data:", err));
  }, []);

  useEffect(() => {
    if (galleryItems.length === 0) return;

    const grid = document.querySelector(".gallery-list");

    imagesLoaded(grid, function () {
      const iso = new Isotope(grid, {
        itemSelector: ".gallery-grid",
      });

      const filterButtons = document.querySelectorAll(".filter-button-group button");
      filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
          filterButtons.forEach((btn) => btn.classList.remove("active"));
          this.classList.add("active");
          const filterValue = this.getAttribute("data-filter");
          iso.arrange({ filter: filterValue });
        });
      });
    });
  }, [galleryItems]);

  return (
    <div id="gallery" className="section lb">
      <div className="container">
        <div className="section-title text-center">
          <h3>Gallery</h3>
          <p>Explore our curated collection of stunning photos, showcasing creativity and artistry in every shot.</p>
        </div>

        {/* Filter Buttons */}
        <div className="gallery-menu text-center row">
          <div className="col-md-12">
            <div className="button-group filter-button-group">
              <button className="active m-1" data-filter="*">All</button>
              <button className="m-1" data-filter=".photo_a">Wedding</button>
              <button className="m-1" data-filter=".photo_b">Models</button>
              <button className="m-1" data-filter=".photo_c">Fashion</button>
            </div>
          </div>
        </div>

        {/* Gallery Items */}
        <div className="gallery-list row">
          {galleryItems.map((item, index) => (
            <div key={index} className={`col-md-4 col-sm-6 gallery-grid ${item.category}`}>
              <div className="gallery-single fix">
                <img src={`http://localhost:8088/images/${item.image}`} className="img-fluid" alt={item.title} />
                <div className="box-content">
                  <div className="inner-content">
                    <h3 className="title">{item.title}</h3>
                    <span className="post">Latest Photo</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery1;
