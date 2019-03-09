import React from 'react';
import {connect} from 'react-redux';
import * as Users from 'js/User/users';
import * as Bessemer from '../alloy/bessemer/components';
import * as ReduxForm from 'redux-form';
import * as Validation from 'js/alloy/utils/validation';

class Pets extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            petName: '',
            petSex: 'Male',
            petSpecies: 'Dog',
            petAge: 0,
        };
    }

    onSubmit = pet => {
        pet.id = Math.round(Date.now() + Math.random() + Math.random()).toString();
        pet.petSex = this.state.petSex;
        pet.petSpecies = this.state.petSpecies;
        pet.petAge = this.state.petAge;

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