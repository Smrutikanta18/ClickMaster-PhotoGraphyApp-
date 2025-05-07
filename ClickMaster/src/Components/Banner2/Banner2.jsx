import React from 'react'

const Banner2 = ({ title, pageName }) => {
  return (
    
    <div className="banner-area banner-bg-1">
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<div className="banner">
						<h2>{title}</h2>
						<ul className="page-title-link">
							<li><a href="#">Home</a></li>
							<li><a href="#">{pageName}</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
  )
}

export default Banner2