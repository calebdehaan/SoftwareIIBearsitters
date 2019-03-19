import React from 'react';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';
import * as Users from '../User/users';


class Request extends React.Component {
	render() {
	    let { handleSubmit, submitting } = this.props;

		return (
            <form name='request'>
                <div className="form-group">
                    <label>Select Start Date:</label>
                    <input type="text" id="dates" className="form-control"></input>
                </div>
                <div className="form-group">
                    <label>Select Start Time:</label>
                    <input type="text" id="dates" className="form-control"></input>
                </div>
                <div className="form-group">
                    <label>Select End Date:</label>
                    <input type="text" id="dates" className="form-control"></input>
                </div>
                <div className="form-group">
                    <label>Select End Time:</label>
                    <input type="text" id="dates" className="form-control"></input>
                </div>
                <div className="form-group">
                    <button className="btn btn-success">Add Dates</button>
                </div>
            </form>
		);
	}
}


Request = ReduxForm.reduxForm({form: 'request'})(Request);

Request = connect(
	state => ({
		user: Users.State.getUser(state)
	}),
	dispatch => ({
		register: user => dispatch(Users.Actions.register(user))
	})
)(Request);

export { Request };