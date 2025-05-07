import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const sliderRef = useRef(null);

  // Fetch banners from backend
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get("http://localhost:8088/api/banners");
        setBanners(res.data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchBanners();
  }, []);

  // Initialize slider after banners are rendered
  useEffect(() => {
    if (banners.length === 0) return;

    // Wait for background images to load before initializing slider
    const imgLoad0 = window.imagesLoaded('.page-view', { background: true }, () => {
      // Prevent multiple initializations
      if (!sliderRef.current) {
        sliderRef.current = new window.Core.Slider();
      }
    });

    // Cleanup function
    return () => {
      if (sliderRef.current && typeof sliderRef.current.clear === 'function') {
        sliderRef.current.clear();
        sliderRef.current = null;
      }
    };
  }, [banners]);

  return (
    <div className="demo-2">
      <div className="page-view">
        {banners.map((banner, index) => (
          <div
            className="project"
            key={index}
            style={{ backgroundImage: `url(http://localhost:8088/images/${banner.image})` }}
          >
            <div className="text">
              <h1>{banner.name}</h1>
              <p>Photo by {banner.photoBy}</p>
            </div>
          </div>
        ))}

        <nav className="arrows">
          <div className="arrow previous">
            <svg viewBox="208.3 352 4.2 6.4">
              <polygon className="st0" points="212.1,357.3 211.5,358 208.7,355.1 211.5,352.3 212.1,353 209.9,355.1" />
            </svg>
          </div>
          <div className="arrow next">
            <svg viewBox="208.3 352 4.2 6.4">
              <polygon className="st0" points="212.1,357.3 211.5,358 208.7,355.1 211.5,352.3 212.1,353 209.9,355.1" />
            </svg>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Banner;
