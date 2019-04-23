import React from 'react';
import * as Users from './users';
import * as Owner from 'js/User/owner';
import * as Sitter from 'js/User/sitter';
import * as Pet from 'js/Pet/addPets';
import _ from 'lodash';
import {connect} from 'react-redux';

class PublicProfile extends React.Component {
	seconds = 0;

	constructor(props){
		super(props);

		this.state = {
		};
	}

	componentDidMount() {
		this.props.fetchUser().then(() => {
			this.state.toggle = !this.state.toggle;
			this.setState(this.state);
		});
		this.seconds = setInterval(() => this.props.fetchUser(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.seconds);
	}

	render() {
		return (
			<div className="container padded">
				This is {this.props.user.attributes['firstName']}'s public profile page
				{ !_.isNil(this.props.user) && this.props.user.roles != null &&
					<div> They're a
						{ (this.props.user.roles.length === 2) &&
						<span> Petsitter and Petowner! </span>
						}
						{(this.props.user.roles.length === 1) && this.props.user.roles.includes('OWNER') &&
						<span> Petowner! </span>
						}
						{(this.props.user.roles.length === 1) && this.props.user.roles.includes('SITTER') &&
						<span> Petsitter! </span>
						}
					<br/></div>
				}

				{ !_.isNil(this.props.user) &&
					<div>
						<div className="profileHeader">Full Name: <br/></div>
						<p>{this.props.user.attributes['firstName']} {this.props.user.attributes['lastName']} </p>

						<div className="profileHeader">Street Address: <br/></div>
						<p>{this.props.user.address['street']} , {this.props.user.address['city']} {this.props.user.address['zip']} {this.props.user.address['state']}</p>

						<div className="profileHeader">Phone Number: <br/></div>
						<p>{this.props.user.attributes['phone']}</p>

						<div className="profileHeader">Email: <br/></div>
						<p>{this.props.user.principal}</p>

						<div className="profileHeader">Owner Sitter Status: <br/></div>
						<p>{this.props.user.roles}</p>
					</div>
				}

				{/* Owner profile settings */}
				{ !_.isNil(this.props.user) && this.props.user.roles != null && this.props.user.roles.includes('OWNER') && <Pet.PetList/> }

				{/* Sitter profile settings */}
				{/* !_.isNil(this.props.user) && this.props.user.roles != null && this.props.user.roles.includes('SITTER') && <Sitter.Sitter/> */}

			</div>
		);
	}
}

PublicProfile = connect(
	state => ({
	    user: Users.State.getUser(state),
    	pets: Users.State.getPets(state),
	}),
	dispatch => ({
		fetchUser: () => dispatch(Users.Actions.fetchUser()),
	})
)(PublicProfile);

export { PublicProfile };