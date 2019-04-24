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
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			items: new Map(),
			state:'TX',
		};
	}

	// When the form is being submitted
	onSubmit = user => {
		let newUser = JSON.parse(JSON.stringify(user));

		newUser.petSitter = this.state.items.get('petSitter');
		newUser.petOwner = this.state.items.get('petOwner');
		newUser.email = this.state.items.get('email');
		newUser.state = this.state.state;

		return this.props.register(newUser);
	};

	// Changes for checkboxes of roles of user
	checkboxChange(e) {
		this.state.items.set(e, !this.state.items.get(e));
		this.setState(this.state);
	}

	stateChange = e => {
		if (e != null) {
			this.state.state = e;
			this.setState(this.state);
		}
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
				<span className="row align-content-center mb-3">
                                <label className={'col-4 d-inline-block'}>State{<span>*</span>}</label>
					<Bessemer.Select name={'state'}
									 className='col-8' style={{backgroundColor:'black'}}
									 friendlyName={'State'} placeholder="TX"
									 validators={[Validation.requiredValidator]}
									 options={stateOptions} value={this.state.state}
									 onChange={opt => this.stateChange(opt)}/>
				</span>
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
				<Bessemer.Field name={'email'}
								onChange={(e) => this.checkboxChange(e)}
								showLabel={false}
								field={<Checkbox label={'I want to receive email notifications.'}
												 checkboxChange={this.checkboxChange}
												 name={'email'}
												 defaultCheck={this.state.items.get('email')}/>}/>
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

// State options
export const stateOptions = [
	{label: 'Alabama', value: 'AL'},
	{label: 'Alaska', value: 'AK'},
	{label: 'Arizona', value: 'AZ'},
	{label: 'Arkansas', value: 'AR'},
	{label: 'California', value: 'CA'},
	{label: 'Colorado', value: 'CO'},
	{label: 'Connecticut', value: 'CT'},
	{label: 'Delaware', value: 'DE'},
	{label: 'Florida', value: 'FL'},
	{label: 'Georgia', value: 'GA'},
	{label: 'Hawaii', value: 'HI'},
	{label: 'Idaho', value: 'ID'},
	{label: 'Illinois', value: 'IL'},
	{label: 'Indiana', value: 'IN'},
	{label: 'Iowa', value: 'IA'},
	{label: 'Kansas', value: 'KS'},
	{label: 'Kentucky', value: 'KY'},
	{label: 'Louisiana', value: 'LA'},
	{label: 'Maine', value: 'ME'},
	{label: 'Maryland', value: 'MD'},
	{label: 'Massachusetts', value: 'MA'},
	{label: 'Michigan', value: 'MI'},
	{label: 'Minnesota', value: 'MN'},
	{label: 'Mississippi', value: 'MS'},
	{label: 'Missouri', value: 'MO'},
	{label: 'Montana', value: 'MT'},
	{label: 'Nebraska', value: 'NE'},
	{label: 'Nevada', value: 'NV'},
	{label: 'New Hampshire', value: 'NH'},
	{label: 'New Jersey', value: 'NJ'},
	{label: 'New Mexico', value: 'NM'},
	{label: 'New York', value: 'NY'},
	{label: 'North Carolina', value: 'NC'},
	{label: 'North Dakota', value: 'ND'},
	{label: 'Ohio', value: 'OH'},
	{label: 'Oklahoma', value: 'OK'},
	{label: 'Oregon', value: 'OR'},
	{label: 'Pennsylvania', value: 'PA'},
	{label: 'Rhode Island', value: 'RI'},
	{label: 'South Carolina', value: 'SC'},
	{label: 'South Dakota', value: 'SD'},
	{label: 'Tennessee', value: 'TN'},
	{label: 'Texas', value: 'TX'},
	{label: 'Utah', value: 'UT'},
	{label: 'Vermont', value: 'VT'},
	{label: 'Virginia', value: 'VA'},
	{label: 'Washington', value: 'WA'},
	{label: 'West Virginia', value: 'WV'},
	{label: 'Wisconsin', value: 'WI'},
	{label: 'Wyoming', value: 'WY'}
];

export { RegistrationForm };