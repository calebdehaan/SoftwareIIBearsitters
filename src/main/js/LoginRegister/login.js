import React from 'react';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';

import * as Validation from '../alloy/utils/validation';
import * as Bessemer from '../alloy/bessemer/components';

import * as Users from '../User/users';
import Redirect from 'react-router-dom/es/Redirect';
import _ from 'lodash';

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