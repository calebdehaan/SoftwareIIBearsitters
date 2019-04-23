import React from 'react';
import * as Login from 'js/LoginRegister/login';
import * as Register from 'js/LoginRegister/form';
import * as NavBarr from 'js/Common/navBar';
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



export class PublicProfile extends React.Component {
    render() {
        return (
            <div className="container padded">
                <NavBarr.NavBar />
                <PublicProf.PublicProfile />
            </div>
        );
    }
}

Home = connect(
    state => ({
        user: Users.State.getUser(state),
    })
)(Home);