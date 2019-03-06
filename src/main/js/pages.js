import _ from 'lodash';

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Users from 'js/users';
import * as Login from 'js/login';
import * as NavBarr from 'js/gen';
import * as Prof from 'js/profile';
import axios from 'axios';
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
				{this.state.message}Welcome to BearSitters!<br/>
				<img style={{position:'absolute',  top:'40%', left:'35%'}} src={'statics/bearsitting.png'} alt="the bear will sit" title="the bear will sit"/>
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
export class Availability extends React.Component {
    /*constructor(props) {
        super(props);
        this.state = {
            startDate: new Date()
        };
        this.handleChange = this.handlechange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    handleSubmit(e){
        e.preventDefault();
        let main = this.state.startDate;
    }*/

/*				<form onSubmit={ this.handleSubmit }>
                    <div className="form-group">
                        <label>Select Start Date: </label>
                        *//*
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                         />*//*
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success">Add Dates</button>
                    </div>
                </form>*/
	render() {
		return (
			<div className="container padded">
                <NavBarr.NavBar />
                This is availability page
                <form>
                    <div className="form-group">
                        <label>Select Start Date:</label>
						<input type="text" id="dates" class="form-control"></input>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success">Add Dates</button>
                    </div>
                </form>
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