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
            petSex: null,
            petSpecies: null,
            petAge: 0,
        };
    }

    onSubmit = pet => {
        pet.petSex = this.state.petSex;
        pet.petSpecies = this.state.petSpecies;
        pet.petAge = this.state.petAge;
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
                <Bessemer.Field name="pet_name" friendlyName="Pet Name" placeholder="Jake"
                                validators={[Validation.requiredValidator]}/>

                <span className="row align-content-center mb-3">
                    <label className={'col-4 d-inline-block'}>Pet Species</label>
                    <Bessemer.Select style={{backgroundColor:'black'}} name="pet_species"
                                     className='col-8'
                                     friendlyName="Pet Species" placeholder="Dog"
                                     validators={[Validation.requiredValidator]}
                                     options={speciesOptions} value={this.state.petSpecies}
                                     onChange={opt => this.speciesChange(opt)}/>
                </span>

                <span className="row align-content-center mb-3">
                    <label className={'col-4 d-inline-block'}>Pet Sex</label>
                    <Bessemer.Select style={{backgroundColor:'black'}} name="pet_sex"
                                     className='col-8'
                                     friendlyName="Pet Sex" placeholder="Male"
                                     validators={[Validation.requiredValidator]}
                                     options={sexOptions} value={this.state.petSex}
                                     onChange={opt => this.sexChange(opt)}/>
                </span>

                <span className="row align-content-center mb-3">
                    <label className={'col-4 d-inline-block'}>Pet Age</label>
                    <Bessemer.Select style={{backgroundColor:'black'}} name="pet_age"
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
        user: Users.State.getUser(state)
    }),
    dispatch => ({

    })
)(Pets);
// Age options for each pet
export const ageOptions = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    {label: '9', value: '9'},
    {label: '10', value: '10'},
    {label: '11', value: '12'},
    {label: '13', value: '13'},
    {label: '14', value: '14'},
    {label: '15', value: '15'},
    {label: '16', value: '16'},
    {label: '17', value: '17'},
    {label: '18', value: '18'},
    {label: '19', value: '19'},
    {label: '20', value: '20'},
    {label: '21', value: '21'},
    {label: '22', value: '22'},
    {label: '23', value: '23'},
    {label: '24', value: '24'},
    {label: '25', value: '25'},
    {label: '26', value: '26'},
    {label: '27', value: '27'},
    {label: '28', value: '28'},
    {label: '29', value: '29'},
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
    {label: 'Mouse', value: 'Mouse'},
    {label: 'Squirrel', value: 'Squirrel'},
];
export { Pets };