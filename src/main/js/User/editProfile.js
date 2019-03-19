import React from 'react';
import {connect} from 'react-redux';
import * as Users from './users';
import * as Bessemer from '../alloy/bessemer/components';
import * as Validation from 'js/alloy/utils/validation';
import * as ReduxForm from 'redux-form';
import {stateOptions} from 'js/LoginRegister/form';

class EditProfile1 extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			toggle:true,
			state:null,
		};

	}

	onSubmit = user => {
		let userToUpdate = JSON.parse(JSON.stringify(user));
		userToUpdate.principal = this.props.user.principal;
		if(this.state.state != null)
			userToUpdate.state = this.state.state;

		if(this.props.user.roles.includes('OWNER')) userToUpdate.petOwner = true;
		if(this.props.user.roles.includes('SITTER')) userToUpdate.petSitter = true;
		if (userToUpdate.firstName == null) userToUpdate.firstName = this.props.user.attributes['firstName'];
		if (userToUpdate.lastName == null) userToUpdate.lastName = this.props.user.attributes['lastName'];
		if (userToUpdate.phone == null) userToUpdate.phone = this.props.user.attributes['phone'];
		if (userToUpdate.street == null) userToUpdate.street = this.props.user.address['street'];
		if (userToUpdate.city == null) userToUpdate.city = this.props.user.address['city'];
		if (userToUpdate.zip == null) userToUpdate.zip = this.props.user.address['zip'];
		if (userToUpdate.state == null) userToUpdate.state = this.props.user.address['state'];
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
				this.state.toggle = !this.state.toggle;
				this.setState(this.state);
				this.props.action();
			});
		});
	};

	render() {
		let { handleSubmit, submitting } = this.props;
		return (
			<form name="editProfile1" onSubmit={handleSubmit(form => this.onSubmit(form))}>
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

class EditProfile2 extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			state:null,
		};
	}

	stateChange = e => {
		if (e != null) {
			this.state.state = e;
			this.setState(this.state);
		}
	};

	onSubmit = user => {
		let userToUpdate = JSON.parse(JSON.stringify(user));
		userToUpdate.principal = this.props.user.principal;
		if(this.state.state != null)
			userToUpdate.state = this.state.state;

		if(this.props.user.roles.includes('OWNER')) userToUpdate.petOwner = true;
		if(this.props.user.roles.includes('SITTER')) userToUpdate.petSitter = true;
		if (userToUpdate.firstName == null) userToUpdate.firstName = this.props.user.attributes['firstName'];
		if (userToUpdate.lastName == null) userToUpdate.lastName = this.props.user.attributes['lastName'];
		if (userToUpdate.phone == null) userToUpdate.phone = this.props.user.attributes['phone'];
		if (userToUpdate.street == null) userToUpdate.street = this.props.user.address['street'];
		if (userToUpdate.city == null) userToUpdate.city = this.props.user.address['city'];
		if (userToUpdate.zip == null) userToUpdate.zip = this.props.user.address['zip'];
		if (userToUpdate.state == null) userToUpdate.state = this.props.user.address['state'];
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
				this.props.dispatch(ReduxForm.reset('editProfile2'));
				this.setState(this.state);
				this.props.action();
			});
		});
	};

	render() {
		let { handleSubmit, submitting } = this.props;
		return (
			<form name="editProfile2" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<br/>
				<Bessemer.Field name='street' friendlyName='Street Address'
								field={<input className="form-control" placeholder={this.props.user.address['street']} />}
								validators={[Validation.requiredValidator]}/>
				<Bessemer.Field name='city' friendlyName='City'
								field={<input className="form-control" placeholder={this.props.user.address['city']} />}
								validators={[Validation.requiredValidator]}/>
				<Bessemer.Field name='zip' friendlyName='Zipcode'
								field={<input className="form-control" placeholder={this.props.user.address['zip']} />}
								validators={[Validation.requiredValidator, Validation.zipValidator]}/>
				<Bessemer.Select name={'state'}
								 className='col-8' style={{backgroundColor:'black'}}
								 friendlyName={'State'} placeholder="TX"
								 validators={[Validation.requiredValidator]}
								 options={stateOptions} value={this.state.state}
								 onChange={opt => this.stateChange(opt)}/>
				<Bessemer.Button loading={submitting}>Update</Bessemer.Button>
			</form>
		);
	}
}


EditProfile2 = ReduxForm.reduxForm({form: 'editProfile2'})(EditProfile2);

EditProfile2 = connect(
	state => ({
		user: Users.State.getUser(state),
		pets: Users.State.getPets(state),
	}),
	dispatch => ({
		fetchUser: () => dispatch(Users.Actions.fetchUser()),
		updateUser: user => dispatch(Users.Actions.updateUser(user)),
	})
)(EditProfile2);

export { EditProfile2 };

class EditProfile3 extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			state:null,
		};
	}

	onSubmit = user => {
		let userToUpdate = JSON.parse(JSON.stringify(user));
		userToUpdate.principal = this.props.user.principal;

		if(this.state.state != null)
			userToUpdate.state = this.state.state;

		if(this.props.user.roles.includes('OWNER')) userToUpdate.petOwner = true;
		if(this.props.user.roles.includes('SITTER')) userToUpdate.petSitter = true;
		if (userToUpdate.firstName == null) userToUpdate.firstName = this.props.user.attributes['firstName'];
		if (userToUpdate.lastName == null) userToUpdate.lastName = this.props.user.attributes['lastName'];
		if (userToUpdate.phone == null) userToUpdate.phone = this.props.user.attributes['phone'];
		if (userToUpdate.street == null) userToUpdate.street = this.props.user.address['street'];
		if (userToUpdate.city == null) userToUpdate.city = this.props.user.address['city'];
		if (userToUpdate.zip == null) userToUpdate.zip = this.props.user.address['zip'];
		if (userToUpdate.state == null) userToUpdate.state = this.props.user.address['state'];
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
				this.props.dispatch(ReduxForm.reset('editProfile3'));
				this.setState(this.state);
				this.props.action();
			});
		});
	};

	render() {
		let { handleSubmit, submitting } = this.props;
		return (
			<form name="editProfile3" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<br/>
				<Bessemer.Field name='phone' friendlyName='Phone Number'
								field={<input className="form-control" placeholder={this.props.user.attributes['phone']} />}
								validators={[Validation.requiredValidator, Validation.phoneNumberValidator]}/>
				<Bessemer.Button loading={submitting}>Update</Bessemer.Button>
			</form>
		);
	}
}


EditProfile3 = ReduxForm.reduxForm({form: 'editProfile3'})(EditProfile3);

EditProfile3 = connect(
	state => ({
		user: Users.State.getUser(state),
		pets: Users.State.getPets(state),
	}),
	dispatch => ({
		fetchUser: () => dispatch(Users.Actions.fetchUser()),
		updateUser: user => dispatch(Users.Actions.updateUser(user)),
	})
)(EditProfile3);

export { EditProfile3 };

class EditProfile4 extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			state:null,
		};
	}

	onSubmit = user => {
		let userToUpdate = JSON.parse(JSON.stringify(user));
		if (userToUpdate.principal == null) userToUpdate.principal = this.props.user.principal;
		if(this.state.state != null)
			userToUpdate.state = this.state.state;

		if(this.props.user.roles.includes('OWNER')) userToUpdate.petOwner = true;
		if(this.props.user.roles.includes('SITTER')) userToUpdate.petSitter = true;
		if (userToUpdate.firstName == null) userToUpdate.firstName = this.props.user.attributes['firstName'];
		if (userToUpdate.lastName == null) userToUpdate.lastName = this.props.user.attributes['lastName'];
		if (userToUpdate.phone == null) userToUpdate.phone = this.props.user.attributes['phone'];
		if (userToUpdate.street == null) userToUpdate.street = this.props.user.address['street'];
		if (userToUpdate.city == null) userToUpdate.city = this.props.user.address['city'];
		if (userToUpdate.zip == null) userToUpdate.zip = this.props.user.address['zip'];
		if (userToUpdate.state == null) userToUpdate.state = this.props.user.address['state'];
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
				this.props.dispatch(ReduxForm.reset('editProfile4'));
				this.setState(this.state);
				this.props.action();
			});
		});
	};

	render() {
		let { handleSubmit, submitting } = this.props;
		return (
			<form name="editProfile4" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<br/>
				<Bessemer.Field name="principal" friendlyName="Email Address"
								field={<input className="form-control" placeholder={this.props.user.principal} />}
								validators={[Validation.requiredValidator]}/>
				<Bessemer.Button loading={submitting}>Update</Bessemer.Button>
			</form>
		);
	}
}


EditProfile4 = ReduxForm.reduxForm({form: 'editProfile4'})(EditProfile4);

EditProfile4 = connect(
	state => ({
		user: Users.State.getUser(state),
		pets: Users.State.getPets(state),
	}),
	dispatch => ({
		fetchUser: () => dispatch(Users.Actions.fetchUser()),
		updateUser: user => dispatch(Users.Actions.updateUser(user)),
	})
)(EditProfile4);

export { EditProfile4 };

