import React, { useEffect } from 'react';

const Header = () => {
  useEffect(() => {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');
    const menuList = document.querySelector('.menu__list');
    const brand = document.querySelector('.menu__brand');
    const menuItems = document.querySelectorAll('.menu__item');

    let active = false;

    const toggleMenu = () => {
      if (!active) {
        menu.classList.add('menu--active');
        menuList.classList.add('menu__list--active');
        brand.classList.add('menu__brand--active');
        burger.classList.add('burger--close');
        menuItems.forEach(item => item.classList.add('menu__item--active'));
        active = true;
      } else {
        menu.classList.remove('menu--active');
        menuList.classList.remove('menu__list--active');
        brand.classList.remove('menu__brand--active');
        burger.classList.remove('burger--close');
        menuItems.forEach(item => item.classList.remove('menu__item--active'));
        active = false;
      }
    };

    if (burger) {
      burger.addEventListener('click', toggleMenu);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (burger) {
        burger.removeEventListener('click', toggleMenu);
      }
    };
  }, []);

  return (
    <>
      <header className="header">
        <div className="burger">
          <div className="burger__patty"></div>
          <div className="burger__patty"></div>
          <div className="burger__patty"></div>
        </div>
        <nav className="menu">
          <div className="menu__brand">
            <a href="/">
              <div className="logo">
                <img className="img-fluid" src="images/logo.jpg" alt="Logo" />
              </div>
            </a>
          </div>
          <ul className="menu__list">
            <li className="menu__item"><a href="/" className="menu__link">Home</a></li>
            <li className="menu__item"><a href="about" className="menu__link">About Us</a></li>
            <li className="menu__item"><a href="service" className="menu__link">Services</a></li>
            <li className="menu__item"><a href="gallery" className="menu__link">Gallery</a></li>
            <li className="menu__item"><a href="price" className="menu__link">Pricing</a></li>
            <li className="menu__item"><a href="contact" className="menu__link">Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
        <div className="container-fluid">
          <a className="navbar-brand js-scroll-trigger" href="/">
          <img className="img-fluid" style={{ width: "150px", height: "40px" }} src="images/logo.jpg" alt="Logo" />
          </a>
        </div>
      </nav>
    </>
  );
};

export default Header;
