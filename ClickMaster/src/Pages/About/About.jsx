import React from 'react'
import Services from '../../Components/Services/Services'
import Review from '../../Components/Review/Review'
import Banner2 from '../../Components/Banner2/Banner2'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'

const About = () => {
  return (
    <>
    <Header/>
  <Banner2 title="About Us" pageName="About Us"/>

  <div id="about" className="section wb">
        <div className="container">
            <div className="row mb-5">
                <div className="col-md-6">
                    <div className="message-box">                        
                    <h2> Welcome To ClickMaster</h2>
                        <p>Capture moments that matter.</p>
                        <p>At ClickMaster, we believe every photograph tells a story — your story. Whether it's a candid smile, a sweeping landscape, or an unforgettable event, our passion lies in preserving memories through the art of photography.

We bring together creativity, precision, and emotion to deliver stunning visuals tailored to your unique moments. From portraits and weddings to commercial shoots and lifestyle sessions, our lens is focused on excellence.</p>
                        <p>Let us transform fleeting moments into timeless memories. Because with PhotoShoot, it’s not just a picture — it’s a feeling captured forever.</p>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="right-box-pro wow fadeIn">
                        <img src="uploads/about_02.jpg" alt="" className="img-fluid img-rounded"/>
                    </div>
                </div>
            </div>
			
			<div className="row">
                <div className="col-md-6">
                    <div className="right-box-pro wow fadeIn">
                        <img src="uploads/about_03.jpg" alt="" className="img-fluid img-rounded"/>
                    </div>
                </div>  
				
				<div className="col-md-6">
                    <div className="message-box">                        
                        <h2> What we do</h2>
                        <p> Turning moments into masterpieces.</p>
                        <p>At ClickMaster, we specialize in capturing life’s most meaningful experiences through the lens of creativity and precision. Our services include portrait photography, weddings, fashion shoots, event coverage, and commercial projects — all delivered with artistic flair and professional excellence.</p>
                        <p>We don’t just take photos — we craft visual stories. With a keen eye for detail and a passion for perfection, we work closely with clients to understand their vision and bring it to life. Whether it's a grand celebration or a quiet candid moment, we’re here to capture it beautifully.</p>
                        <p>Let us help you preserve your most cherished memories — one frame at a time.</p>
                    </div> 
                </div>
				
            </div> 
        </div>
    </div>

    <Services/>

    <Review/>
    <Footer/>
    </>
  )
}

export default About