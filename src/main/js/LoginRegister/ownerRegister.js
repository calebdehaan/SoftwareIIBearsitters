import React from 'react';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';

import * as Validation from '../alloy/utils/validation';
import * as Bessemer from '../alloy/bessemer/components';

import * as Users from '../User/users';
import Redirect from 'react-router-dom/es/Redirect';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
	}

	onSubmit = ({principal, password}) => {
		return this.props.authenticate(principal, password);
	};

	render() {
		let { handleSubmit, submitting } = this.props;

		if (this.props.user) {
			return <Redirect to='/'/>;
		}

		return (
			<form style={{backgroundColor:'black'}} name="form" action={'/'} onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<Bessemer.Field style={{backgroundColor:'black'}} name="principal" friendlyName="Email Address"
									validators={[Validation.requiredValidator, Validation.emailValidator]}
									field={<input className="form-control" type="email" autoComplete="username"/>}
				/>

				<Bessemer.Field style={{backgroundColor:'black'}} name="password" friendlyName="Password"
									validators={[Validation.requiredValidator, Validation.passwordValidator]}
									field={<input className="form-control" type="password"
												  autoComplete={'current-password'}/>}
				/>

				<Bessemer.Button loading={submitting}>Sign In</Bessemer.Button>
			</form>
		);
	}
}

LoginForm = ReduxForm.reduxForm({form: 'login'})(LoginForm);

LoginForm = connect(
	state => ({
		user: Users.State.getUser(state)
	}),
	dispatch => ({
		authenticate: (principal, password) => dispatch(Users.Actions.authenticate(principal, password))
	})
)(LoginForm);

export { LoginForm };

import React from 'react';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';

import * as Validation from '../alloy/utils/validation';
import * as Bessemer from '../alloy/bessemer/components';

import * as Users from '../User/users';
import Redirect from 'react-router-dom/es/Redirect';

class RegistrationForm extends React.Component {

	constructor(props) {
		super(props);
	}

	onSubmit = user => {
		return this.props.register(user).then();
	};

	render() {
		let { handleSubmit, submitting } = this.props;

		if (this.props.user) {
			return <Redirect to='/'/>;
		}

		return (
			<form name="form" onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<Bessemer.Field name="principal" friendlyName="Email Address"
								validators={[Validation.requiredValidator, Validation.emailValidator]} />

				<Bessemer.Field name="password" friendlyName="Password"
								validators={[Validation.requiredValidator, Validation.passwordValidator]}
								field={<input className="form-control" type="password" />} />

				<Bessemer.Field name='firstName' friendlyName='First Name'  field={<input className="form-control" placeholder={'First Name'} />}
								validators={[Validation.requiredValidator]}/>

				<Bessemer.Field name='lastName' friendlyName='Last Name' field={<input className="form-control" placeholder={'Last Name'} />}
								validators={[Validation.requiredValidator]}/>

				<Bessemer.Field name='phone' friendlyName='Phone Number' field={<input className="form-control" placeholder={'Phone Number'} />}
								validators={[Validation.requiredValidator, Validation.phoneNumberValidator]}/>

				<Bessemer.Field name='street' friendlyName='Street Address' field={<input className="form-control" placeholder={'Street Address'} />}
								validators={[Validation.requiredValidator]}/>

				<Bessemer.Field name='city' friendlyName='City' field={<input className="form-control" placeholder={'City'} />}
								validators={[Validation.requiredValidator]}/>

				<Bessemer.Field name='zip' friendlyName='Zipcode' field={<input className="form-control" placeholder={'Zipcode'} />}
								validators={[Validation.requiredValidator, Validation.zipValidator]}/>


				<Bessemer.Button loading={submitting}>Register</Bessemer.Button>
			</form>
		);
	}
}

RegistrationForm = ReduxForm.reduxForm({form: 'register'})(RegistrationForm);

RegistrationForm = connect(
	state => ({
		user: Users.State.getUser(state)
	}),
	dispatch => ({
		register: user => dispatch(Users.Actions.register(user))
	})
)(RegistrationForm);

export { RegistrationForm };