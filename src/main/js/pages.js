import React from 'react';
import * as Login from 'js/LoginRegister/login';
import * as Register from 'js/LoginRegister/form';
import * as NavBarr from 'js/Common/navBar';
import * as Prof from 'js/User/profile';
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

/*				<Form.js onSubmit={ this.handleSubmit }>
                    <div className="Form.js-group">
                        <label>Select Start Date: </label>
                        *//*
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                         />*//*
                    </div>
                    <div className="Form.js-group">
                        <button className="btn btn-success">Add Dates</button>
                    </div>
                </Form.js>*/
	render() {
		return (
			<div className="container padded">
                <NavBarr.NavBar />
                This is availability page
                <form>
                    <div className="form-group">
                        <label>Select Start Date:</label>
						<input type="text" id="dates" className="form-control"></input>
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