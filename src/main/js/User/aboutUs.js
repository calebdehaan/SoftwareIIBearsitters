import React from 'react';
import {connect} from 'react-redux';

class AboutUsPage extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div className="container">
				<div className="row no-gutters">
					<div className="col-lg-6" >
						<div className="titreCarre">
							<h2 className="titreCarre-internal" >
								<small className="titreCarre-preTitre"><font style={{verticalAlign:'inherit'}}><font style={{verticalAlign:'inherit'}}>The </font></font></small>
								<span className="titreCarre-titre"><font style={{verticalAlign:'inherit'}}><font style={{verticalAlign:'inherit'}}>Team</font></font></span>
							</h2>
						</div>
					</div>
					<div className="col-lg-6" style={{display:'flex',margin:'auto'}}>
						  <span className="aboutUsText" style={{margin:'auto',textAlign:'center',fontSize:'24px',fontStyle:'oblique',fontWeight:'700'}} >
							  We are extremely selective when it comes to adding people to our team. We’ve blended our unique efforts in order to create an atmosphere
							  that our tech-savvy engineers thrive in. We are experts who are relentless in finding a solution for our clients.
						  </span>
					</div>
				</div>

				<div className="row" style={{paddingTop:'0px', paddingBottom:'40px'}} >
					<div className="col-lg-3 memberCard" style={{textAlign:'center',paddingRight:'0px',paddingLeft:'0px',float:'left'}}>
						<a className="no--underline block" href="http://michaelibanez.org/">
							<div className="memberPic" ></div>
						</a>
						<div className="memberInfo ">
							<h4> Michael Ibanez </h4>
							<h6>Student at Baylor University </h6>
							<div className="memberAbout" >
								<a href="http://michaelibanez.org/" style={{marginRight:'4px',display:'inline'}}> About </a> |
								<h6 style={{marginLeft:'2px',display:'inline'}}> Connect: </h6>
								<a className="memberSocial" href="https://www.linkedin.com/in/michael-ibanez" target="_blank">
									<i className="fa fa-linkedin"></i>
								</a>
								<a className="memberSocial" href="https://github.com/Michael-ibanez" target="_blank">
									<i className="fa fa-github"></i>
								</a>
							</div>
						</div>
					</div>
					<div className="col-lg-3 memberCard" style={{textAlign:'center',paddingRight:'0px',paddingLeft:'0px'}}>
						<a className="no--underline block" href="">
							<div className="memberPic" ></div>
						</a>
						<div className="memberInfo ">
							<h4> Michael Ibanez </h4>
							<h6>Student at Baylor University </h6>
							<div className="memberAbout" >
								<a href="" style={{marginRight:'4px',display:'inline'}}> About </a> |
								<h6 style={{marginLeft:'2px',display:'inline'}}> Connect: </h6>
								<a className="memberSocial" href="" target="_blank">
									<i className="fa fa-linkedin"></i>
								</a>
								<a className="memberSocial" href="" target="_blank">
									<i className="fa fa-github"></i>
								</a>
							</div>
						</div>
					</div>
					<div className="col-lg-3 memberCard" style={{textAlign:'center',paddingRight:'0px',paddingLeft:'0px',marginRight:'0%'}}>
						<a className="no--underline block" href="">
							<div className="memberPic" ></div>
						</a>
						<div className="memberInfo ">
							<h4> Michael Ibanez </h4>
							<h6>Student at Baylor University </h6>
							<div className="memberAbout" >
								<a href="" style={{marginRight:'4px',display:'inline'}}> About </a> |
								<h6 style={{marginLeft:'2px',display:'inline'}}> Connect: </h6>
								<a className="memberSocial" href="" target="_blank">
									<i className="fa fa-linkedin"></i>
								</a>
								<a className="memberSocial" href="" target="_blank">
									<i className="fa fa-github"></i>
								</a>
							</div>
						</div>
					</div>

					<div className="col-lg-3 memberCard memBot" style={{textAlign:'center',paddingRight:'0px',paddingLeft:'0px'}}>
						<a className="no--underline block" href="">
							<div className="memberPic" ></div>
						</a>
						<div className="memberInfo ">
							<h4> Michael Ibanez </h4>
							<h6>Student at Baylor University </h6>
							<div className="memberAbout" >
								<a href="" style={{marginRight:'4px',display:'inline'}}> About </a> |
								<h6 style={{marginLeft:'2px',display:'inline'}}> Connect: </h6>
								<a className="memberSocial" href="" target="_blank">
									<i className="fa fa-linkedin"></i>
								</a>
								<a className="memberSocial" href="" target="_blank">
									<i className="fa fa-github"></i>
								</a>
							</div>
						</div>
					</div>
					<div className="col-lg-3 memberCard memBot" style={{textAlign:'center',paddingRight:'0px',paddingLeft:'0px'}}>
						<a className="no--underline block" href="">
							<div className="memberPic" ></div>
						</a>
						<div className="memberInfo ">
							<h4> Michael Ibanez </h4>
							<h6>Student at Baylor University </h6>
							<div className="memberAbout" >
								<a href="" style={{marginRight:'4px',display:'inline'}}> About </a> |
								<h6 style={{marginLeft:'2px',display:'inline'}}> Connect: </h6>
								<a className="memberSocial" href="" target="_blank">
									<i className="fa fa-linkedin"></i>
								</a>
								<a className="memberSocial" href="" target="_blank">
									<i className="fa fa-github"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AboutUsPage = connect(
)(AboutUsPage);

export { AboutUsPage };