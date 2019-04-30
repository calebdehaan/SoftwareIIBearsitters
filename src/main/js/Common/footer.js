import React from 'react';

class Footer extends React.Component {
	render() {
		return (
			<div className="container padded horizontal-center">
				<br/>
				<div className="footer">
					<div className="row mt-md-5 mb-md-5">
						<div className="col-md-7">
							&copy; 2019 BearSitters
						</div>
						<ul className="col-md-4 footer-links" style={{textAlign:'center'}} >
							<li className="grow px-4" style={{display:'inline'}}><a href="/#/aboutUs">About Us</a></li>
							<li className="grow px-4" style={{display:'inline'}}><a href="/#/faq">FAQ</a></li>
							<li className="grow px-4" style={{display:'inline'}}><a href="/#/support">Support</a></li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export {Footer};