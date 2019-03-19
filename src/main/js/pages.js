import React from 'react';
import * as Login from 'js/LoginRegister/login';
import * as Register from 'js/LoginRegister/form';
import * as NavBarr from 'js/Common/navBar';
import * as Prof from 'js/User/profile';
import * as Request from 'js/User/requestSitting';
import * as Post from 'js/Post/postings';
//import DatePicker from 'react-datepicker';

//import 'react-datepicker/dist/react-datepicker.css'

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
				{this.state.message}Welcome to the BearSitters!<br/>
				<img style={{position:'absolute',  top:'40%', left:'35%'}} src={'statics/bearsitting.png'} alt="the bear will sit" title="the bear will sit"/>
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