import React from 'react'
import Banner2 from '../../Components/Banner2/Banner2'
import Gallery1 from '../../Components/Gallery1/Gallery1'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'


const Gallery = () => {
  return (
    <>
    <Header/>
    <Banner2 title="Gallery" pageName="Gallery"/>
    <Gallery1/>
    <Footer/>
    </>
  )
}

export default Gallery