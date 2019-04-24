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


				<div className="registerButton">
                	<a href = "#/AboutUs">
                		<Bessemer.Button> Ask a Question! </Bessemer.Button>
                	</a>
                </div>

               <button class="accordion">Section 1</button>
               <div class="panel">
                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
               </div>

               <button class="accordion">Section 2</button>
               <div class="panel">
                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
               </div>

               <button class="accordion">Section 3</button>
               <div class="panel">
                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
               </div>

               <html>
               <body>

               <h2>An unordered HTML list</h2>

               <ul>
                 <li>Coffee</li>
                 <li>Tea</li>
                 <li>Milk</li>
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