import React from 'react';
import _ from 'lodash';
import * as ReduxForm from 'redux-form';
import { connect } from 'react-redux';
import * as Users from '../User/users';
import * as Bessemer from '../alloy/bessemer/components';
import * as Validation from 'js/alloy/utils/validation';
import {noPets, wrongDate} from 'js/Common/notification';


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
			postStartMonth: 0,
			postEndMonth: 0,
			postStartDay: 1,
			postEndDay: 1,
			postStartYear: 2019,
			postEndYear: 2019,
			postStartAMPM: 'AM',
			postEndAMPM: 'AM',
			unselectedPets: [],
			selectedPets: [],
		};
	}

	componentDidMount() {
		this.props.fPets().then(() => {
			if (_.isDefined(this.props.pets) && !_.isEmpty(this.props.pets)) {
				this.props.pets.map(pet => {
					this.state.unselectedPets.push(pet);
				});
				this.setState(this.state);
			}
		});
	}


	onSubmit = posting => {
		let today = new Date;
		let newPosting = JSON.parse(JSON.stringify(posting));
		let postStartHour = this.state.postStartHour;
		let postEndHour = this.state.postEndHour;
		let listOfPets = [];
		this.state.selectedPets.map(pet => {
			if(pet != null && pet.id != null){
				let newPet = 'PetName:'+ pet.petName + ' '
					   + '\tPetSpecies:' + pet.petSpecies + ' '
					   + '\tPetAge:' + pet.petAge + ' '
					   + '\tPetSex:' + pet.petSex;
				listOfPets.push(newPet);
			}
		});

		if(!_.isEmpty(this.props.selectedPets) ) {
			this.props.pets.map(pet => {
				this.state.unselectedPets.push(pet);
			});
			this.state.selectedPets = [];
			this.setState(this.state);
		}

		if(this.state.postStartAMPM === 'PM')
			postStartHour += 12;
		if(this.state.postEndAMPM === 'PM')
			postEndHour += 12;

		let startDate = new Date(this.state.postStartYear, this.state.postStartMonth,this.state.postStartDay, postStartHour, this.state.postStartMinute,0, 0);
		let endDate = new Date(this.state.postEndYear, this.state.postEndMonth,this.state.postEndDay, postEndHour, this.state.postEndMinute,0,0);

		newPosting.id = Math.round(Date.now() + Math.random() + Math.random()).toString();
		newPosting.ownerPrincipal = this.props.user.principal;
		newPosting.sitterPrincipal = '';
		newPosting.startDate = startDate;
		newPosting.endDate = endDate;
		newPosting.isComplete = false;
		newPosting.isCancelled = false;
		newPosting.pets = listOfPets;

		this.props.dispatch(ReduxForm.reset('posting'));

		if(!_.isEmpty(newPosting.pets)) {
				this.props.addPost(newPosting);
		}
		else
			noPets();
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

	ampmStartChange = e => {
		if (e != null) {
			this.state.postStartAMPM = e;
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

	ampmStopChange = e => {
		if (e != null) {
			this.state.postEndAMPM = e;
			this.setState(this.state);
		}
	};


	selectPet = (e, pet) => {
		this.state.selectedPets.push(pet);
		let index = this.state.unselectedPets.indexOf(pet);
		if (index > -1) {
			this.state.unselectedPets.splice(index, 1);
		}
		this.setState(this.state);
	};


	unselectPet = (e, pet) => {
		this.state.unselectedPets.push(pet);
		let index = this.state.selectedPets.indexOf(pet);
		if (index > -1) {
			this.state.selectedPets.splice(index, 1);
		}
		this.setState(this.state);
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
					<div className="form-group col-sm-1">
						<label> Hour </label>
						<Bessemer.Select style={{backgroundColor:'black'}} name="startHour"
										 className='col-8'
										 friendlyName="Post Start Hour" placeholder="1"
										 validators={[Validation.requiredValidator]}
										 options={hourOptions} value={this.state.postStartHour}
										 onChange={opt => this.hourStartChange(opt)}/>
					</div>
					<div className="form-group col-sm-1">
						<label> Minute </label>
						<Bessemer.Select style={{backgroundColor:'black'}} name="startMinute"
										 className='col-8'
										 friendlyName="Post Start Minute" placeholder="00"
										 validators={[Validation.requiredValidator]}
										 options={minuteOptions} value={this.state.postStartMinute}
										 onChange={opt => this.minuteStartChange(opt)}/>
					</div>
					<div className="form-group col-sm-2">
						<label> AM/PM </label>
						<Bessemer.Select style={{backgroundColor:'black'}} name="startAMPM"
										 className='col-8'
										 friendlyName="Post Start AMPM" placeholder="AM"
										 validators={[Validation.requiredValidator]}
										 options={ampmOptions} value={this.state.postStartAMPM}
										 onChange={opt => this.ampmStartChange(opt)}/>
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
					<div className="form-group col-sm-1">
						<label> Hour </label>
						<Bessemer.Select style={{backgroundColor:'black'}} name="stopHour"
										 className='col-8'
										 friendlyName="Post End Hour" placeholder="1"
										 validators={[Validation.requiredValidator]}
										 options={hourOptions} value={this.state.postEndHour}
										 onChange={opt => this.hourStopChange(opt)}/>
					</div>
					<div className="form-group col-sm-1">
						<label> Minute </label>
						<Bessemer.Select style={{backgroundColor:'black'}} name="endMinute"
										 className='col-8'
										 friendlyName="Post End Minute" placeholder="00"
										 validators={[Validation.requiredValidator]}
										 options={minuteOptions} value={this.state.postEndMinute}
										 onChange={opt => this.minuteStopChange(opt)}/>
					</div>
					<div className="form-group col-sm-2">
						<label> AM/PM </label>
						<Bessemer.Select style={{backgroundColor:'black'}} name="endAMPM"
										 className='col-8'
										 friendlyName="Post End AMPM" placeholder="AM"
										 validators={[Validation.requiredValidator]}
										 options={ampmOptions} value={this.state.postEndAMPM}
										 onChange={opt => this.ampmStopChange(opt)}/>
					</div>
				</div>
				<br/>

				<h5>Select Pets for this Session</h5>
				<h6>Available Pets</h6>
				<div>
					<div>
						{_.isEmpty(this.state.unselectedPets) &&
						<p>No pets available! </p>

						}

						{this.state.unselectedPets !== null && this.state.unselectedPets.map(pet => (
							_.isDefined(pet) && _.isDefined(pet.petName) &&
							<div key={pet.petName + '_' + pet.id}
								 style={{width: '20rem', marginBottom: 20}}>
								<div style={{backgroundColor:'black'}}>
									<div className="d-inline ml-3">
										<span >Pet Name: </span>{pet.petName}
										<Bessemer.Button
												onClick={(e) => {
													this.selectPet(e, pet);
												}}>Select
										</Bessemer.Button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<h6>Currently Selected Pets</h6>
				{_.isEmpty(this.state.selectedPets) &&
				<p>No pets selected!</p>
				}
				{this.state.selectedPets != null &&
				<div>
					{this.state.selectedPets.map(pet => (
						_.isDefined(pet) && _.isDefined(pet.petName) &&
						<div key={pet.petName + '_' + pet.id}
							 style={{width: '20rem', marginBottom: 10}}>
							<div style={{backgroundColor:'black'}}>
								<div className="d-inline ml-3">
									<span >Pet Name: {pet.petName}</span>
									<Bessemer.Button
											onClick={(e) => {
												this.unselectPet(e, pet);
											}}>Unselect
									</Bessemer.Button>
								</div>
							</div>
						</div>
					))}
				</div>
				}

				<br/>

				<Bessemer.Button loading={submitting}>Add Sitting Request</Bessemer.Button>
			</form>
		);
	}
}


Request = ReduxForm.reduxForm({form: 'posting'})(Request);

Request = connect(
	state => ({
		pets: Users.State.getPets(state),
		user: Users.State.getUser(state),
	}),
	dispatch => ({
		fPets: () => dispatch(Users.Actions.fetchPets()),
		addPost: user => dispatch(Users.Actions.addPost(user)),
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
	{label: 'AM', value: 0},
	{label: 'PM', value: 12},
];

// Month options
export const monthOptions = [
	{label: 'January', value: 0},
	{label: 'February', value: 1},
	{label: 'March', value: 2},
	{label: 'April', value: 3},
	{label: 'May', value: 4},
	{label: 'June', value: 5},
	{label: 'July', value: 6},
	{label: 'August', value: 7},
	{label: 'September', value: 8},
	{label: 'October', value: 9},
	{label: 'November', value: 10},
	{label: 'December', value: 11},
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