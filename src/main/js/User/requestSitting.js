import React from 'react';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';
import * as Users from '../User/users';
import * as Validation from '../alloy/utils/validation';
import * as Bessemer from '../alloy/bessemer/components';


class Request extends React.Component {
    // Default constructor for props
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = posting => {
        let newPosting = JSON.parse(JSON.stringify(posting));
        newPosting.id = Math.round(Date.now() + Math.random() + Math.random()).toString();
        newPosting.sitterPrincipal = this.props.user.principal;
        newPosting.ownerPrincipal = 'None';
        if(newPosting.startDate == null) newPosting.startDate = '01/02/2019';
		if(newPosting.endDate == null) newPosting.endDate = '01/02/2019';
		if(newPosting.startTime == null) newPosting.startTime = '1:00 PM';
		if(newPosting.endTime == null) newPosting.endTime = '3:00 PM';
        this.props.addPost(newPosting);
    };

	render() {
	    let { handleSubmit, submitting } = this.props;

	    if(this.props.posting){
	        return <Redirect to='/'/>;
	    }

		return (
            <form name='posting' onSubmit={handleSubmit(form => this.onSubmit(form))}>
                <Bessemer.Field name="startDate" friendlyName="Start Date" field={<input className="form-control" placeholder={'01/01/1996'} />}
                                />

                <Bessemer.Field name="endDate" friendlyName="End Date" field={<input className="form-control" placeholder={'01/01/1996'} />}
                                                />

                <Bessemer.Field name="startTime" friendlyName="Start Time" field={<input className="form-control" placeholder={'1:00 PM'} />}
                                                 />

                <Bessemer.Field name="endTime" friendlyName="End Time" field={<input className="form-control" placeholder={'1:00 PM'} />}
                                                               />

                <Bessemer.Button loading={submitting}>Add Sitting Request</Bessemer.Button>
            </form>
		);
	}
}


Request = ReduxForm.reduxForm({form: 'posting'})(Request);

Request = connect(
	state => ({
		user: Users.State.getUser(state)
	}),
	dispatch => ({
		addPost: user => dispatch(Users.Actions.addPost(user))
	})
)(Request);

export { Request };