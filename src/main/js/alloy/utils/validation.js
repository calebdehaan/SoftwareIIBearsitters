import _ from 'lodash';

export class Validator {
	constructor(spec, error) {
		this.spec = spec;
		this.error = error;
	}
}

let Spec = {};

Spec.makeOptional = spec => val => _.isEmpty(val) ? true : spec(val);

export { Spec };

export const required = value => !!value;
export const requiredValidator = new Validator(required, (details) => details.friendlyName + ' is required.');

export const isEmail = (val) => val.match(/^[a-zA-Z0-9](\.?\+?[a-zA-Z0-9_-]){0,}@[a-zA-Z0-9-]+\.([a-zA-Z]{1,6}\.)?[a-zA-Z]{2,6}$/);
export const emailValidator = new Validator(isEmail, (details, value) => value + ' is not a valid email address.');

export const isValidPassword = (val) => val.toString().length >= 6 && val.match(/^[a-zA-Z0-9!@#$%^&*]{6,64}$/);
export const passwordValidator = new Validator(isValidPassword, (details) => details.friendlyName + ' must be a valid password.');

export const isPhoneNumber = (val) => (!val) || val.match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/) || val.match(/^[0-9]{10}$/) || val.match(/^\([0-9]{3}\)-[0-9]{3}-[0-9]{4}$/);
export const phoneNumberValidator = new Validator(isPhoneNumber, (details, value) => value + ' is not a valid phone.');

export const isZip = (val) => (!val) || val.match(/^\d{5}$/);
export const zipValidator = new Validator(isZip, () => 'Please enter in a 5 digit ZIP code.');

