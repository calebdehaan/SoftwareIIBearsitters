import React from 'react';
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
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
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


							{ (this.props.user) &&
								<li className="nav-item">
									<a className="nav-link" href="#/availability">Schedule Availability</a>
								</li>
							}

							{ (this.props.user) &&
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