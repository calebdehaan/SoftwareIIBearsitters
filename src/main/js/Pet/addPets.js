import React from 'react';
import {connect} from 'react-redux';
import * as Users from 'js/User/users';
import * as Bessemer from '../alloy/bessemer/components';
import * as ReduxForm from 'redux-form';
import * as Validation from 'js/alloy/utils/validation';
import _ from 'lodash';

class PetList extends React.Component {
	seconds = 0;

	constructor(props) {
		super(props);
		this.updatePets = this.updatePets.bind(this);
		this.state = {
			petName: '',
			petSex: 'Male',
			petSpecies: 'Dog',
			petAge: 0,
			toggle: false,
		};
	}

	componentDidMount() {
		this.props.fPets().then(() => {
			this.state.toggle = !this.state.toggle;
			this.setState(this.state);
		});
		this.seconds = setInterval(() => this.updatePets(), 1000);
	}


	componentWillUnmount() {
		clearInterval(this.seconds);
	}

	updatePets = () => {
		this.props.fPets().then(() => {
			this.state.toggle = !this.state.toggle;
			this.setState(this.state);
		});
	};

	sexChange = e => {
		if (e != null) {
			this.state.petSex = e;
			this.setState(this.state);
		}
	};

	speciesChange = e => {
		if (e != null) {
			this.state.petSpecies = e;
			this.setState(this.state);
		}
	};

	ageChange = e => {
		if (e != null) {
			this.state.petAge = e;
			this.setState(this.state);
		}
	};

	toggleAll = () => {
		if (_.isDefined(this.props.pets) && _.isArray(this.props.pets) && this.props.pets.length !== 0) {
			this.props.pets.forEach(pet => {
				if (pet != null && pet.editing === true) {
					pet.editing = false;
				}
			});
		}

		this.state.toggle = !this.state.toggle;
		this.setState(this.state);
	};

	updatePet = (form, pet) => {
		let petToUpdate = JSON.parse(JSON.stringify(form));
		this.toggleAll();

			petToUpdate.id = pet.id;
			if (petToUpdate.petName == null) petToUpdate.petName = pet.petName;
			if (petToUpdate.petSpecies == null) petToUpdate.petSpecies = this.state.petSpecies;
			if (petToUpdate.petSex == null) petToUpdate.petSex = this.state.petSex;
			if (petToUpdate.petAge == null) petToUpdate.petAge = this.state.petAge;

			Users.updatePet(petToUpdate).then(() => {
				this.props.fPets().then(() => {
					this.state.toggle = !this.state.toggle;
					this.setState(this.state);
				});
			});

			console.log('updated pet now\n\n\n\n');
	};

	editPet = (e, pet) => {
		this.toggleAll();
			pet.editing = true;
			this.state.toggle = !this.state.toggle;
			this.setState(this.state);
	};

	render() {
		let { handleSubmit, submitting } = this.props;

		return (
			<div>
				{/* This displays a user's pets */}
				{_.isDefined(this.props.pets) && this.props.pets.length !== 0 &&
				<div className="d-md-flex flex-md-wrap justify-content-md-start">
					{this.props.pets.map(pet => (
						_.isDefined(pet) && _.isDefined(pet.petName) &&
						<div key={pet.petName + '_' + pet.id} className="card m-md-3" style={{backgroundColor: 'black'}}>
							<form name={'PetList'} onSubmit={handleSubmit(form => this.updatePet(form, pet))}>
								<ul className="list-group list-group-flush">
									<li className="list-group-item" style={{backgroundColor: 'black'}}>
										<div>
											<span className="text-muted">Pet Name: </span>{pet.petName}
										</div>
									</li>
									<li className="list-group-item" style={{backgroundColor: 'black'}}>
										{pet.editing === false &&
										<div>
											<span className="text-muted">Species: </span>{pet.petSpecies}
										</div>
										}
										{pet.editing === true &&
										<Bessemer.Select style={{backgroundColor: 'black'}} name="petSpecies"
														 className='col-8'
														 friendlyName="Pet Species" placeholder={pet.petSpecies}
														 validators={[Validation.requiredValidator]}
														 options={speciesOptions} value={this.state.petSpecies}
														 onChange={opt => this.speciesChange(opt)}/>
										}
									</li>
									<li className="list-group-item" style={{backgroundColor: 'black'}}>
										{pet.editing === false &&
										<div>
											<span className="text-muted">Sex: </span>{pet.petSex}
										</div>
										}
										{pet.editing === true &&
										<Bessemer.Select style={{backgroundColor: 'black'}} name="petSex"
														 className='col-8'
														 friendlyName="Pet Sex" placeholder={pet.petSex}
														 validators={[Validation.requiredValidator]}
														 options={sexOptions} value={this.state.petSex}
														 onChange={opt => this.sexChange(opt)}/>
										}
									</li>
									<li className="list-group-item" style={{backgroundColor: 'black'}}>
										{pet.editing === false &&
										<div>
											<span className="text-muted">Age: </span>{pet.petAge}
										</div>
										}
										{pet.editing === true &&
										<Bessemer.Select style={{backgroundColor: 'black'}} name="petAge"
														 className='col-8'
														 friendlyName="Pet Age" placeholder={pet.petAge}
														 validators={[Validation.requiredValidator]}
														 options={ageOptions} value={this.state.petAge}
														 onChange={opt => this.ageChange(opt)}/>
										}
									</li>
								</ul>
								{pet.editing === false &&
									<Bessemer.Button onClick={(e) => {this.editPet(e, pet);}} style={{backgroundColor: 'black', borderColor: 'black', float: 'right'}}><i className='fa fa-edit'></i></Bessemer.Button>
								}
								{pet.editing === true &&
									<Bessemer.Button  loading={submitting}> Update </Bessemer.Button>
								}
							</form>
						</div>
					))}
					{/* This displays if a user has no pets */}
					{!_.isDefined(this.props.pets) &&
					<span> No pets yet. Add some !! </span>
					}
				</div>
				}
			</div>
		);
	}
}
PetList = ReduxForm.reduxForm({form: 'PetList'})(PetList);

PetList = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state),
		pets: Users.State.getPets(state)
	}),
	dispatch => ({
		fPets: () => dispatch(Users.Actions.fetchPets()),
	})
)(PetList);

export { PetList };

class Pets extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			petName: '',
			petSex: 'Male',
			petSpecies: 'Dog',
			petAge: 0,
			seconds: 0
		};
	}

	onSubmit = pet => {
		pet.id = Math.round(Date.now() + Math.random() + Math.random()).toString();
		pet.petSex = this.state.petSex;
		pet.petSpecies = this.state.petSpecies;
		pet.petAge = this.state.petAge;
		this.props.dispatch(ReduxForm.reset('addPet'));
		this.setState(this.state);

		this.props.addPet(pet);

	};

	sexChange = e => {
		if (e != null) {
			this.state.petSex = e;
			this.setState(this.state);
		}
	};

	speciesChange = e => {
		if (e != null) {
			this.state.petSpecies = e;
			this.setState(this.state);
		}
	};

	ageChange = e => {
		if (e != null) {
			this.state.petAge = e;
			this.setState(this.state);
		}
	};

	render() {
		let {handleSubmit, submitting} = this.props;

		return (
			<form name="name" onSubmit={handleSubmit(form => this.onSubmit(form))} className={'form-group'}>
				<Bessemer.Field name="petName" friendlyName="Pet Name" placeholder="Jake"
								validators={[Validation.requiredValidator]}/>

				<span className="row align-content-center mb-3">
					<label className={'col-4 d-inline-block'}>Pet Species</label>
					<Bessemer.Select style={{backgroundColor:'black'}} name="petSpecies"
									 className='col-8'
									 friendlyName="Pet Species" placeholder="Dog"
									 validators={[Validation.requiredValidator]}
									 options={speciesOptions} value={this.state.petSpecies}
									 onChange={opt => this.speciesChange(opt)}/>
				</span>

				<span className="row align-content-center mb-3">
					<label className={'col-4 d-inline-block'}>Pet Sex</label>
					<Bessemer.Select style={{backgroundColor:'black'}} name="petSex"
									 className='col-8'
									 friendlyName="Pet Sex" placeholder="Male"
									 validators={[Validation.requiredValidator]}
									 options={sexOptions} value={this.state.petSex}
									 onChange={opt => this.sexChange(opt)}/>
				</span>

				<span className="row align-content-center mb-3">
					<label className={'col-4 d-inline-block'}>Pet Age</label>
					<Bessemer.Select style={{backgroundColor:'black'}} name="petAge"
									 className='col-8'
									 friendlyName="Pet Age" placeholder="0"
									 validators={[Validation.requiredValidator]}
									 options={ageOptions} value={this.state.petAge}
									 onChange={opt => this.ageChange(opt)}/>
				</span>

				<Bessemer.Button loading={submitting}>Add a Pet</Bessemer.Button>

			</form>
		);
	}
}

Pets = ReduxForm.reduxForm({form: 'addPets'})(Pets);

Pets = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state),
		pets: Users.State.getPets(state)
	}),
	dispatch => ({
		addPet: (pet) => dispatch(Users.Actions.addPet(pet)),
		fPets: () => dispatch(Users.Actions.fetchPets()),
	})
)(Pets);
// Age options for each pet
export const ageOptions = [
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
	{label: '32', value: 32},
	{label: '33', value: 33},
	{label: '34', value: 34},
	{label: '35', value: 35},
	{label: '36', value: 36},
	{label: '37', value: 37},
	{label: '38', value: 38},
	{label: '39', value: 39},
	{label: '40', value: 40},
	{label: '41', value: 41},
	{label: '42', value: 42},
	{label: '43', value: 43},
	{label: '44', value: 44},
	{label: '45', value: 45},
	{label: '46', value: 46},
	{label: '47', value: 47},
	{label: '48', value: 48},
	{label: '49', value: 49},
	{label: '50', value: 50},
];
// Sex options for each pet
export const sexOptions = [
	{label: 'Male', value: 'Male'},
	{label: 'Female', value: 'Female'},
	{label: 'N/A', value: 'N/A'}
];
// Species options for each pet
export const speciesOptions = [
	{label: 'Dog', value: 'Dog'},
	{label: 'Cat', value: 'Cat'},
	{label: 'Bird', value: 'Bird'},
	{label: 'Fish', value: 'Fish'},
	{label: 'Mouse', value: 'Mouse'},
	{label: 'Squirrel', value: 'Squirrel'},
];
export { Pets };