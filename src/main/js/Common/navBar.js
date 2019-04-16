import React from 'react';
import ReactDOM from 'react-dom';
import * as Users from '../User/users';
import {connect} from 'react-redux';
import Favicon from 'react-favicon';


class NavBar extends React.Component {
	constructor(props) {
		super(props);
	}

	LogoutClick = () => {
		return this.props.logout();
	};

	render() {
		return (
			<div>
				<Favicon url="https://img.icons8.com/ios/50/000000/bear-footprint-filled.png" />
				<nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
					<a class="navbar-brand" href="#">BearSitters</a>
					<button class="navbar-toggler" type="button" data-toggle="collapse"
							data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
							aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarNav">
						<ul class="navbar-nav">
							<li class="nav-item active">
								<a class="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
							</li>
							<li class="nav-item">
                                <a class="nav-link" href="#/login"> </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#/register"> </a>
                            </li>






							{ (this.props.user != null) && (this.props.user.roles != null) && (this.props.user.roles.includes('OWNER')) &&
							<li className="nav-item">
								<a className="nav-link" href="#/request">Request Sitting</a>
							</li>
							}

							{ (this.props.user != null) && (this.props.user.roles != null) && (this.props.user.roles.includes('OWNER')) &&
							<li className="nav-item">
								<a className="nav-link" href="#/sittersPosts">Your Posts</a>
							</li>
							}

							{ (this.props.user != null) && (this.props.user.roles != null) && (this.props.user.roles.includes('SITTER')) &&
							<li className="nav-item">
								<a className="nav-link" href="#/posting">Find Postings</a>
							</li>
							}

							{ (this.props.user != null) &&
							<li className="nav-item" style={{float:'right'}}>
								<a className="nav-link" href="#/profile" > Profile </a>
							</li>
							}
						</ul>

						<ul className="navbar-nav" style={{float:'right'}}>
							{ (!this.props.user) &&
							<li className="nav-item">
								<a className="nav-link" href="#/register">Register</a>
							</li>
							}

							{ (!this.props.user) &&
							<li className="nav-item">
								<a className="nav-link" href="#/login">Login</a>
							</li>
							}
							{ (this.props.user) &&
							<li className="nav-item">
								<a className="nav-link" href="#/" onClick={this.LogoutClick}> Log Out</a>
							</li>
							}

						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

NavBar = connect(
	state => ({
		user: Users.State.getUser(state),
	}),
	dispatch => ({
		logout: () => dispatch(Users.Actions.logout())
	})
)(NavBar);

export { NavBar };
