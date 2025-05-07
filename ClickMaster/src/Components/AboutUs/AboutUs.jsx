import React from 'react'

const AboutUs = () => {
  return (
    <div id="about" className="section wb">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="message-box">                        
                        <h2> Welcome To ClickMaster</h2>
                        <p>Capture moments that matter.</p>
                        <p>At ClickMaster, we believe every photograph tells a story — your story. Whether it's a candid smile, a sweeping landscape, or an unforgettable event, our passion lies in preserving memories through the art of photography.

We bring together creativity, precision, and emotion to deliver stunning visuals tailored to your unique moments. From portraits and weddings to commercial shoots and lifestyle sessions, our lens is focused on excellence.</p>
                        <p>Let us transform fleeting moments into timeless memories. Because with PhotoShoot, it’s not just a picture — it’s a feeling captured forever.</p>
                        <a href="/about" className="hover-effect-new"><span>Read More...</span></a>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="right-box-pro wow fadeIn">
                        <img src="uploads/about_01.jpg" alt="" className="img-fluid img-rounded"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutUs