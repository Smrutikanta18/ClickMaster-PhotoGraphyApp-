import React from 'react'
import Banner from '../../Components/Banner/Banner'
import AboutUs from '../../Components/AboutUs/AboutUs'
import Gallery from '../../Components/Gallery1/Gallery2'
import Services from '../../Components/Services/Services'
import Review from '../../Components/Review/Review'
import Loader from '../../Components/Loader/Loader'
import Footer from "../../Components/Footer/Footer"
import Header from '../../Components/Header/Header'


const Home = () => {
  return (
    <>
    <Header/>
    <Loader/>
    <Banner/>
    <AboutUs/>
    <Gallery/>
    <Services/>
    <Review/>
    <Footer/>
    </>
  )
}

export default Home