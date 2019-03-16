import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import * as Users from './users';
import * as Bessemer from '../alloy/bessemer/components';
import * as Validation from 'js/alloy/utils/validation';
import * as ReduxForm from 'redux-form';
import Redirect from 'js/LoginRegister/form';

class EditProfile1 extends React.Component {

	constructor(props){
		super(props);

	}

	onSubmit = user => {
		let userToUpdate = JSON.parse(JSON.stringify(user));
		userToUpdate.principal = this.props.user.principal;

		if(this.props.user.roles.includes('OWNER')) userToUpdate.petOwner = true;
		if(this.props.user.roles.includes('SITTER')) userToUpdate.petSitter = true;
		if (userToUpdate.firstName == null) userToUpdate.firstName = this.props.user.attributes['firstName'];
		if (userToUpdate.lastName == null) userToUpdate.lastName = this.props.user.attributes['lastName'];
		if (userToUpdate.phone == null) userToUpdate.phone = this.props.user.attributes['phone'];
		if (userToUpdate.street == null) userToUpdate.street = this.props.user.address['street'];
		if (userToUpdate.city == null) userToUpdate.city = this.props.user.address['city'];
		if (userToUpdate.zip == null) userToUpdate.zip = this.props.user.address['zip'];
		if (userToUpdate.roles == null) userToUpdate.roles = this.props.user.roles;
		if(userToUpdate.pets == null){
			let Pet;
			let list = [];
			for(Pet in this.props.pets){
				list.push(this.props.pets[Pet].id);
			}
			userToUpdate.pets = list;
		}

		Users.updateUser(userToUpdate).then(() => {
			this.props.fetchUser().then(() => {
				this.setState(this.state);
			});
		});
	};

	render() {
		let { handleSubmit, submitting } = this.props;
		return (
			<form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<br/>
				<Bessemer.Field name='firstName' friendlyName='First Name'
								field={<input className="form-control" placeholder={this.props.user.attributes['firstName']} />}
								validators={[Validation.requiredValidator]}/>
				<Bessemer.Field name='lastName' friendlyName='Last Name'
								field={<input className="form-control" placeholder={this.props.user.attributes['lastName']} />}
								validators={[Validation.requiredValidator]}/>
				<Bessemer.Button loading={submitting}>Update</Bessemer.Button>
			</form>
		);
	}
}


EditProfile1 = ReduxForm.reduxForm({form: 'editProfile1'})(EditProfile1);

EditProfile1 = connect(
	state => ({
		user: Users.State.getUser(state),
		pets: Users.State.getPets(state),
	}),
	dispatch => ({
		fetchUser: () => dispatch(Users.Actions.fetchUser()),
		updateUser: user => dispatch(Users.Actions.updateUser(user)),
	})
)(EditProfile1);

export { EditProfile1 };