import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className="main-footer">
		<div className="container">
			<div className="row">
				<div className="col-lg-3 col-md-6 col-sm-12">
					<div className="mb-3 img-logo">
						<a href="#">
						<img style={{ width: "175px", height: "40px" }} src="images/logo.jpg" alt="Logo" />
						</a>
						<p>ClickMaster is your all-in-one photography companion, designed to turn every click into a masterpiece. Whether you're a beginner or a seasoned pro, ClickMaster gives you powerful tools to shoot, edit, and share stunning images effortlessly.</p>
					</div>
				</div>
				<div className="col-lg-3 col-md-6 col-sm-12">
					<h4 className="mb-4 ph-fonts-style foot-title">
						RECENT NEWS
					</h4>
					<p className="ph-links-column">
					<a href="/" className="text-black">Home</a>
						<a href="/about" className="text-black">About</a>
						<a href="/service" className="text-black">Services</a>
						<a href="/gallery" className="text-black">Gallery</a>
						<a href="/contact" className="text-black">Contact</a>
					</p>
				</div>
				<div className="col-lg-3 col-md-6 col-sm-12">
					<h4 className="mb-4 ph-fonts-style foot-title">
						SERVICES
					</h4>
					<p className="ph-links-column">
						<a href="/service" className="text-black">Business</a>
						<a href="/service" className="text-black">Design</a>
						<a href="/service" className="text-black">Real life</a>
					</p>
				</div>
				<div className="col-lg-3 col-md-6 col-sm-12">
					<h4 className="mb-4 ph-fonts-style foot-title">
						FELL FREE TO CALL
					</h4>
					<p className="ph-links-column">
					<a href="#" className="text-black">9556911839</a>
					<a href="#" className="text-black">demo@gmail.com</a>
					</p>
				</div>
			</div>
		</div>
	</footer>

    <div className="copyrights">
        <div className="container">
            <div className="footer-distributed">
                <div className="footer-left">                    
                    <p className="footer-company-name">All Rights Reserved. &copy; 2018 Design by : 
					<a href='/'> Smrutikanta</a>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <a href="#" id="scroll-to-top" className="dmtop global-radius"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></a>

    </>
  )
}

export default Footer