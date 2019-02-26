import _ from 'lodash';

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Users from 'js/users';
import * as Login from 'js/login';
import * as NavBarr from 'js/gen';
import * as Prefer from 'js/pref';
import axios from 'axios';


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
				{this.state.message} This is the home page. <br/>
				<img style={{position:'absolute',top:'40%', left:'35%'}} src={'statics/bearsitting.png'} alt="the bear will sit" title="the bear will sit"/>
			</div>
		);
	}
}

export class RegisterPage extends React.Component {
	render() {

        if(this.props.user){
            return <Redirect to='/'/>;
        }

		return (
			<div className="container padded">
                <NavBarr.NavBar />
				<div className="row">
					<div className="col-6 offset-md-3">
						<h2>Register</h2>
						<hr />
						<Login.RegistrationForm />
					</div>
				</div>
			</div>
		);
	}
}

export class LoginPage extends React.Component {
	render() {

        if(this.props.user){
            return <Redirect to='/'/>;
        }

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

class Page1 extends React.Component {
	render() {
		return (
			<div className="container padded">
                <NavBarr.NavBar />
				This is page 1.

				{ _.isDefined(this.props.authentication) &&
				<div>{this.props.authentication['access_token']}</div>
				}

				{ _.isDefined(this.props.user) &&
				<div>Welcome, {this.props.user.principal}!</div>
				}
			</div>
		);
	}
}

Page1 = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state)
	})
)(Page1);

export { Page1 };

export class Page2 extends React.Component {
	render() {
		return (
			<div className="container padded">
                <NavBarr.NavBar />
				This is page 2.
			</div>
		);
	}
}

export class Page3 extends React.Component {
	render() {
		return (
			<div className="container padded">
                <NavBarr.NavBar />
				This is page 3.
			</div>
		);
	}
}

export class Preferences extends React.Component {
	render() {
		return (
			<div className="container padded">
				<NavBarr.NavBar />
				<Prefer.Preferences/>
			</div>
		);
	}
}