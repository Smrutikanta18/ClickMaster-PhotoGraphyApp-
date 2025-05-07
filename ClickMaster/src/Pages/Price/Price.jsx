import React from 'react'
import Banner2 from '../../Components/Banner2/Banner2'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'

const Price  = () => {
  return (
    <>
    <Header/>
    <Banner2 title="Pricing" pageName="Pricing"/>
    <div id="pricing" className="section lb">
		<div className="container">
			<div className="section-title text-center">
                <h3>Pricing</h3>
                <p>Quisque eget nisl id nulla sagittis auctor quis id. Aliquam quis vehicula enim, non aliquam risus.</p>
            </div>
	
			
            
		</div>
	</div>
    <Footer/>
  </>
  )
}

export default Price