import React from 'react';
import * as Login from 'js/LoginRegister/login';
import * as Register from 'js/LoginRegister/form';
import * as NavBarr from 'js/Common/navBar';
import * as Footer from 'js/Common/footer';
import * as Prof from 'js/User/profile';
import * as PublicProf from 'js/User/publicProfile';
import * as Request from 'js/Post/requestSitting';
import * as Post from 'js/Post/postings';
import * as NotificationCenter from 'js/Common/notificationCenter';
import connect from 'react-redux/es/connect/connect';
import * as Users from './User/users';
import * as Bessemer from 'js/alloy/bessemer/components';


export class Home extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			message: ' '
		};
	}

	componentDidMount(){
	}

	render() {
		return (
			<div className="container padded">
				<NavBarr.NavBar />
				<NotificationCenter.NotificationCenter/>
				{this.state.message}
				<p className="welcome">Welcome to the BearSitters!</p><br/>
				<img style={{display: 'block', margin: 'auto'}} src={'statics/bearsitting.png'} alt="the bear will sit" title="the bear will sit"/>
				{ (!this.props.user) &&
				<div className="valueProp">
					We are a group which seeks to allow pet owners to travel with ease. Our website allows pet
					owners and pet sitters to be linked up to make getting pets sat during periods of travel much easier.
				</div>
				}
				<br/>
				{ (!this.props.user)  &&
				<div className="registerButton">
					<a href = "#/register">
						<Bessemer.Button> Register for free! </Bessemer.Button>
					</a>
				</div>
				}
				<Footer.Footer/>
			</div>
		);
	}
}

export class RegisterPage extends React.Component {
	render() {

		return (
			<div className="container padded">
				<NavBarr.NavBar />
				<div className="row">
					<div className="col-6 offset-md-3">
						<h2>Register</h2>
						<hr />
						<Register.RegistrationForm />
					</div>
				</div>
			</div>
		);
	}
}

export class LoginPage extends React.Component {
	render() {
		return (
			<div className="container padded">
				<NavBarr.NavBar />
				<div className="row">
					<div className="col-6 offset-md-3">
						<h2>Login</h2>
						<hr />
						<Login.LoginForm />
					</div>
				</div>
			</div>
		);
	}
}

export class RequestSitting extends React.Component {
	render() {
		return (
			<div className="container padded">
				<NavBarr.NavBar />
				This is request a sitting page. Enter the start and end date you want your pet sat.
				<Request.Request/>

			</div>
		);
	}
}

export class Postings extends React.Component {
	render() {
		return (
			<div className="container padded">
				<NavBarr.NavBar />
				These are all of the postings available.
				<Post.Posting/>
			</div>
		);
	}
}

export class SitterPosts extends React.Component {
	render() {
		return (
			<div className="container padded">
				<NavBarr.NavBar />
				These are all of the postings you have posted
				<Post.MyPostings/>
			</div>
		);
	}
}

export class Profile extends React.Component {
	render() {
		return (
			<div className="container padded">
				<NavBarr.NavBar />
				<Prof.Profile/>
			</div>
		);
	}
}

export class FAQ extends React.Component {
	render() {
		return (
			<div className="container padded">
				<NavBarr.NavBar />

                 <h4>Do you have a question you'd like to ask us? Click the link for our contact info</h4>

				<div className="registerButton">
                	<a href = "#/AboutUs">
                		<Bessemer.Button> Ask the Developers a Question! </Bessemer.Button>
                	</a>
                </div>

               <h2>What does Tempetūrs mean?</h2>
               <div class="panel">
                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                 eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                 nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                 </p>
               </div>

               <h2>Can I register as both a sitter and an owner?</h2>
               <div class="panel">
                 <p>Yes!  When you register with BearSitters, you will be asked for the following:
                 <li>Email address (which will serve as your username)</li>
                 <li>Create a password</li>
                 <li>First and Last name</li>
                 <li>Phone number: so that potential sitters/owners can get in touch with you</li>
                 <li>Address: so that you can set a range</li>
                 You will then be presented with check boxes asking if you would like to be a sitter or an owner.
                 You can select both boxes!  You are now registered as both a sitter and an owner.
                  </p>
               </div>

               <h2>Is this website safe?</h2>
               <div class="panel">

               <dl>
                 <dt>What if something happens to my pet?</dt>
                 <li>We are not legally responsible for the safely of your pets.</li>
                 <li>Sitters are not required to sign any legal paperword.  Honors System everyone!!! :)</li>
                 <dt>How well is my information protected?</dt>
                 <li>Your information is not protected very well.</li>
                 <li>All passwords are stored in plain text in a database which we have never cleaned.</li>
                 <dt>Outside the scope of this project.</dt>
               </dl>
               </div>

               <h2>How do I get someone banned from this website?</h2>
                  <div class="panel">
                    <p>We do not have an easy way that you can report someone for inappropriate content, it was outside the scope of this project.  You will have
                    to shoot one of the developers an email explaining the situation and we can take the person out of
                    the database manually!
                     <dl>
                     <dt>What constitutes inappropriate behavior?</dt>
                     <li>Threats of violence</li>
                     <li>Hate-speech</li>
                     <li>Nudity</li>
                     <dt>Not on my Christian Website!!!</dt>


                   </dl>
                     </p>
                  </div>

                  <h2>How do I get un-banned from this website?</h2>
                    <div class="panel">
                      <p>We do not have an easy way that to un-ban yourself from this website, it was outside the scope of this project.  You will have
                      to shoot one of the developers an email explaining the situation and we can let you off the short leash (pun intended)!
                       <dl>
                       <dt>What constitutes a reinstatement?</dt>
                       <li>A display of sincere remorse for what you did >:(</li>

                     </dl>
                       </p>
                    </div>

               <html>
               <body>

               <h2>Additional Resources</h2>

               <ul>
                 <li>resource 1</li>
                 <li>resource 2</li>
                 <li>resource 3</li>
               </ul>

               </body>
               </html>

				<span> Our FAQ page </span>


			</div>
		);
	}
}

export class Support extends React.Component {
	render() {
		return (
			<div className="container padded">
				<NavBarr.NavBar />
				<span> Our Support page </span>
			</div>
		);
	}
}

export class AboutUs extends React.Component {
	render() {
		return (
			<div className="container padded">
				<NavBarr.NavBar />
				<span> Our About Us page </span>
			</div>
		);
	}
}

export class PublProfile extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="container padded">
				<div className="row">
					<PublicProf.PublicProfile match={this.props.match}/>
				</div>
			</div>
		);
	}
}

Home = connect(
	state => ({
		user: Users.State.getUser(state),
	})
)(Home);