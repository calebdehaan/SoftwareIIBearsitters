import React from 'react';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';
import * as Users from '../User/users';
import * as Bessemer from '../alloy/bessemer/components';
import * as Validation from 'js/alloy/utils/validation';
import {speciesOptions} from 'js/Pet/addPets';
import Redirect from 'react-router-dom/es/Redirect';


class Request extends React.Component {
    // Default constructor for props
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			postName: '',
			postStartHour: 1,
			postStartMinute: 0,
			postEndHour: 1,
			postEndMinute: 0,
			postStartMonth: 1,
			postEndMonth: 1,
			postStartDay: 1,
			postEndDay: 1,
			postStartYear: 2019,
			postEndYear: 2019,
		};
    }

    onSubmit = posting => {
        let newPosting = JSON.parse(JSON.stringify(posting));
        let startDate = new Date(this.state.postStartYear, this.state.postStartMonth-1,this.state.postStartDay, this.state.postStartHour, this.state.postStartMinute,0, 0);
        let endDate = new Date(this.state.postEndYear, this.state.postEndMonth-1,this.state.postEndDay, this.state.postEndHour, this.state.postEndMinute,0, 0);

        //TODO remove this
        console.log('StartDate : ' + startDate + '\n\n\n');
        console.log('EndDate : ' + endDate);

        newPosting.id = Math.round(Date.now() + Math.random() + Math.random()).toString();
        newPosting.ownerPrincipal = this.props.user.principal;
        newPosting.sitterPrincipal = '';
        newPosting.startDate = startDate;
        newPosting.endDate = endDate;

        this.props.addPost(newPosting);
    };

	minuteStartChange = e => {
		if (e != null) {
			this.state.postStartMinute = e;
			this.setState(this.state);
		}
	};

	hourStartChange = e => {
		if (e != null) {
			this.state.postStartHour = e;
			this.setState(this.state);
		}
	};

	monthStartChange = e => {
		if (e != null) {
			this.state.postStartMonth = e;
			this.setState(this.state);
		}
	};

	dayStartChange = e => {
		if (e != null) {
			this.state.postStartDay = e;
			this.setState(this.state);
		}
	};

	yearStartChange = e => {
		if (e != null) {
			this.state.postStartYear = e;
			this.setState(this.state);
		}
	};

	minuteStopChange = e => {
		if (e != null) {
			this.state.postEndMinute = e;
			this.setState(this.state);
		}
	};

	hourStopChange = e => {
		if (e != null) {
			this.state.postEndHour = e;
			this.setState(this.state);
		}
	};

	monthStopChange = e => {
		if (e != null) {
			this.state.postEndMonth = e;
			this.setState(this.state);
		}
	};

	dayStopChange = e => {
		if (e != null) {
			this.state.postEndDay = e;
			this.setState(this.state);
		}
	};

	yearEndChange = e => {
		if (e != null) {
			this.state.postEndYear = e;
			this.setState(this.state);
		}
	};

	render() {
	    let { handleSubmit, submitting } = this.props;

		return (
            <form name='posting' onSubmit={handleSubmit(form => this.onSubmit(form))}>
				<label> Start Sitting </label>
				<div className="form-row">
					<div className="form-group col-sm-2">
						<label> Year </label>
						<Bessemer.Select style={{backgroundColor:'black'}} name="startYear"
										 className='col-8'
										 friendlyName="Post Start Year" placeholder="2019"
										 validators={[Validation.requiredValidator]}
										 options={yearOptions} value={this.state.postStartYear}
										 onChange={opt => this.yearStartChange(opt)}/>
					</div>
					<div className="form-group col-sm-2">
						<label> Day </label>
						<Bessemer.Select style={{backgroundColor:'black'}} name="startDay"
										 className='col-8'
										 friendlyName="Post Start Day" placeholder="1"
										 validators={[Validation.requiredValidator]}
										 options={dayOptions} value={this.state.postStartDay}
										 onChange={opt => this.dayStartChange(opt)}/>
					</div>
					<div className="form-group col-sm-3">
						<label> Month </label>
						<Bessemer.Select style={{backgroundColor:'black'}} name="startMonth"
										 className='col-8'
										 friendlyName="Post Start Month" placeholder="1"
										 validators={[Validation.requiredValidator]}
										 options={monthOptions} value={this.state.postStartMonth}
										 onChange={opt => this.monthStartChange(opt)}/>

					</div>
					<div className="form-group col-sm-2">
						<label> Hour </label>
						<Bessemer.Select style={{backgroundColor:'black'}} name="startHour"
										 className='col-8'
										 friendlyName="Post Start Hour" placeholder="1"
										 validators={[Validation.requiredValidator]}
										 options={hourOptions} value={this.state.postStartHour}
										 onChange={opt => this.hourStartChange(opt)}/>
					</div>
					<div className="form-group col-sm-2">
						<label> Minute </label>
						<Bessemer.Select style={{backgroundColor:'black'}} name="startMinute"
										 className='col-8'
										 friendlyName="Post Start Minute" placeholder="00"
										 validators={[Validation.requiredValidator]}
										 options={minuteOptions} value={this.state.postStartMinute}
										 onChange={opt => this.minuteStartChange(opt)}/>
					</div>
				</div>

				<label> End Sitting </label>
				<div className="form-row">
					<div className="form-group col-sm-2">
						<label> Year </label>
						<Bessemer.Select style={{backgroundColor:'black'}} name="endYear"
										 className='col-8'
										 friendlyName="Post End Year" placeholder="2019"
										 validators={[Validation.requiredValidator]}
										 options={yearOptions} value={this.state.postEndYear}
										 onChange={opt => this.yearEndChange(opt)}/>
					</div>
					<div className="form-group col-sm-2">
						<label> Day </label>
						<Bessemer.Select style={{backgroundColor:'black'}} name="endDay"
										 className='col-8'
										 friendlyName="Post End Day" placeholder="1"
										 validators={[Validation.requiredValidator]}
										 options={dayOptions} value={this.state.postEndDay}
										 onChange={opt => this.dayStopChange(opt)}/>
					</div>
					<div className="form-group col-sm-3">
						<label> Month </label>
						<Bessemer.Select style={{backgroundColor:'black'}} name="endMonth"
										 className='col-8'
										 friendlyName="Post End Month" placeholder="1"
										 validators={[Validation.requiredValidator]}
										 options={monthOptions} value={this.state.postEndMonth}
										 onChange={opt => this.monthStopChange(opt)}/>

					</div>
					<div className="form-group col-sm-2">
						<label> Hour </label>
						<Bessemer.Select style={{backgroundColor:'black'}} name="stopHour"
										 className='col-8'
										 friendlyName="Post End Hour" placeholder="1"
										 validators={[Validation.requiredValidator]}
										 options={hourOptions} value={this.state.postEndHour}
										 onChange={opt => this.hourStopChange(opt)}/>
					</div>
					<div className="form-group col-sm-2">
						<label> Minute </label>
						<Bessemer.Select style={{backgroundColor:'black'}} name="endMinute"
										 className='col-8'
										 friendlyName="Post End Minute" placeholder="00"
										 validators={[Validation.requiredValidator]}
										 options={minuteOptions} value={this.state.postEndMinute}
										 onChange={opt => this.minuteStopChange(opt)}/>
					</div>
				</div>

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

// Year options
export const yearOptions = [
	{label: '2018', value: 2018},
	{label: '2019', value: 2019},
	{label: '2020', value: 2020},
	{label: '2021', value: 2021},
	{label: '2022', value: 2022},
	{label: '2023', value: 2023},
];

// Hour options
export const hourOptions = [
	{label: '1', value: 1},
	{label: '2', value: 2},
	{label: '3', value: 3},
	{label: '4', value: 4},
	{label: '5', value: 5},
	{label: '6', value: 6},
	{label: '7', value: 7},
	{label: '8', value: 8},
	{label: '9', value: 9},
	{label: '10', value: 10},
	{label: '11', value: 11},
	{label: '12', value: 12},
];

// Minute options
export const minuteOptions = [
	{label: '00', value: 0},
	{label: '15', value: 15},
	{label: '30', value: 30},
	{label: '45', value: 45},
];

// AM or PM options
export const ampmOptions = [
	{label: 'AM', value: 'AM'},
	{label: 'PM', value: 'PM'},
];

// Month options
export const monthOptions = [
	{label: 'January', value: 1},
	{label: 'February', value: 2},
	{label: 'March', value: 3},
	{label: 'April', value: 4},
	{label: 'May', value: 5},
	{label: 'June', value: 6},
	{label: 'July', value: 7},
	{label: 'August', value: 8},
	{label: 'September', value: 9},
	{label: 'October', value: 10},
	{label: 'November', value: 11},
	{label: 'December', value: 12},
];

// Day options
export const dayOptions = [
	{label: '1', value: 1},
	{label: '2', value: 2},
	{label: '3', value: 3},
	{label: '4', value: 4},
	{label: '5', value: 5},
	{label: '6', value: 6},
	{label: '7', value: 7},
	{label: '8', value: 8},
	{label: '9', value: 9},
	{label: '10', value: 10},
	{label: '11', value: 11},
	{label: '12', value: 12},
	{label: '13', value: 13},
	{label: '14', value: 14},
	{label: '15', value: 15},
	{label: '16', value: 16},
	{label: '17', value: 17},
	{label: '18', value: 18},
	{label: '19', value: 19},
	{label: '20', value: 20},
	{label: '21', value: 21},
	{label: '22', value: 22},
	{label: '23', value: 23},
	{label: '24', value: 24},
	{label: '25', value: 25},
	{label: '26', value: 26},
	{label: '27', value: 27},
	{label: '28', value: 28},
	{label: '29', value: 29},
	{label: '30', value: 30},
	{label: '31', value: 31},
];

export { Request };