import _ from 'lodash';

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Users from 'js/users';
import * as Login from 'js/login';
import axios from 'axios';


export class Home extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			message: ' '
		};
	}

	componentDidMount(){
		/*
		axios.get('/api/user/hello')
			.then(response => {
				this.setState({ message: response.data });
			})
			.catch(function (error) {
				console.log(error);
			});
		*/
	}

	render() {
		return (
			<div className="container padded">
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="#">BearSitters</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/page-1">Page1</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/page-2">Page2</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/page-3">Page3</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
				{this.state.message} This is the home page. <br/>
				<img src={require('../resources/statics/bearsitting.png')} alt="the bear will sit" title="the bear will sit"/>
			</div>
		);
	}
}

export class RegisterPage extends React.Component {
	render() {
		return (
			<div className="container padded">

                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="#">BearSitters</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/page-1">Page1</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/page-2">Page2</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/page-3">Page3</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

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
		return (
			<div className="container padded">

                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="#">BearSitters</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/page-1">Page1</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/page-2">Page2</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/page-3">Page3</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

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

                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="#">BearSitters</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/page-1">Page1</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/page-2">Page2</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/page-3">Page3</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

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

                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="#">BearSitters</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/page-1">Page1</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/page-2">Page2</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/page-3">Page3</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

				This is page 2.
			</div>
		);
	}
}

export class Page3 extends React.Component {
	render() {
		return (
			<div className="container padded">

                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="#">BearSitters</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/page-1">Page1</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/page-2">Page2</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#/page-3">Page3</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

				This is page 3.
			</div>
		);
	}
}