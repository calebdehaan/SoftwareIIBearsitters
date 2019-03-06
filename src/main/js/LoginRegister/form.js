import React from 'react';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';
import * as Validation from '../alloy/utils/validation';
import * as Bessemer from '../alloy/bessemer/components';
import * as Users from '../User/users';
import Redirect from 'react-router-dom/es/Redirect';
import Checkbox from 'js/Common/checkBox';

class RegistrationForm extends React.Component {

	// Default constructor for props
	constructor(props) {
		super(props);
		this.checkboxChange = this.checkboxChange.bind(this);

		this.state = {
			items: new Map(),
		};
	}

	// When the form is being submitted
	onSubmit = user => {
		let newUser = JSON.parse(JSON.stringify(user));

		newUser.petSitter = this.state.items.get('petSitter');
		newUser.petOwner = this.state.items.get('petOwner');


		return this.props.register(newUser);
	};

	// Changes for checkboxes of roles of user
	checkboxChange(e) {
		this.state.items.set(e, !this.state.items.get(e));
		this.setState(this.state);
		console.log(e + ' set to ' + this.state.items.get(e));
	}

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
				<Bessemer.Field name={'petOwner'}
								onChange={(e) => this.checkboxChange(e)}
								showLabel={false}
								field={<Checkbox label={'I am going to be a pet owner.'}
												 checkboxChange={this.checkboxChange}
												 name={'petOwner'}
												 defaultCheck={this.state.items.get('petOwner')}/>}/>
				<Bessemer.Field name={'petSitter'}
								onChange={(e) => this.checkboxChange(e)}
								showLabel={false}
								field={<Checkbox label={'I am going to be a pet sitter.'}
												 checkboxChange={this.checkboxChange}
												 name={'petSitter'}
												 defaultCheck={this.state.items.get('petSitter')}/>}/>


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