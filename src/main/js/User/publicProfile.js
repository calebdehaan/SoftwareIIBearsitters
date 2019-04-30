import * as Users from './users';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';

class PublicProfile extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			publicUser: null,
			pets:[],
		};
	}

	componentDidMount() {
		Users.getPublicUser(this.props.match.params.id).then(user => {
			this.state.hasLoaded = true;
			this.state.publicUser = user;
			this.setState(this.state);
		});
	}

	displayRoles = () => {
		let rolesStr = 'No role';

		let len = this.state.publicUser.roles.length;
		if(len === 1){
			if(this.state.publicUser.roles[0] === 'OWNER'){
				rolesStr = 'Pet Owner';
			} else if(this.state.publicUser.roles[0] === 'SITTER'){
				rolesStr = 'Pet Sitter';
			}
		} else if(len === 2){
			rolesStr = 'Pet Owner/Sitter';
		}

		return rolesStr;
	};

	render() {
		return (
			<div>
				{(_.isEmpty(this.state.publicUser) && _.isEmpty(this.state.pets))?
					<div>
						<h1>The user {this.props.match.params.id} does not exist! </h1>
					</div>
					:
					<div>
						<h1>{this.state.publicUser.attributes['firstName']} {this.state.publicUser.attributes['lastName']} - {this.displayRoles()}</h1>
						<h3>Contact Information</h3>
						<h4>Email</h4>
						<p>{this.state.publicUser.principal}</p>
						<h4>Phone</h4>
						<p>{this.state.publicUser.attributes['phone']}</p>
						{this.state.publicUser.roles.includes('SITTER') &&
						<h4>Ratings</h4>
						}
					</div>
				}
			</div>
		);
	}
}

PublicProfile = connect(
	state => ({
		user: Users.State.getUser(state),
	})
)(PublicProfile);

export { PublicProfile };