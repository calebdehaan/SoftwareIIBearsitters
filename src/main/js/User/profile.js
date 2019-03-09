import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import * as Users from './users';
import * as Pet from 'js/Pet/addPets';

class Profile extends React.Component {
    intervalID = 0;

    constructor(props){
        super(props);
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
        this.intervalID = setInterval(() => this.fPets(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    fPets = () => {
        this.props.fPets().then(() => {
            this.state.toggle = !this.state.toggle;
            this.setState(this.state);
        });
    };

    render() {

        return (
            <div className="container padded">
                This is your profile page
                { !_.isNil(this.props.user) &&
                    <div> You're a
                        { (this.props.user.roles.length === 2) &&
                        <span> Petsitter and Petowner! Congratulations!! </span>
                        }
                        {(this.props.user.roles.length === 1) && this.props.user.roles.includes('OWNER') &&
                        <span> Petowner! Congratulations!! </span>
                        }
                        {(this.props.user.roles.length === 1) && this.props.user.roles.includes('SITTER') &&
                        <span> Petsitter! Congratulations!! </span>
                        }
                    <br/></div>
                }

                { !_.isNil(this.props.user) &&
                    <div>
                        Welcome , {this.props.user.attributes['firstName']}! <br/> <br/>
                        <div className="profileHeader">Full Name: <br/></div>
                        {this.props.user.attributes['firstName']} {this.props.user.attributes['lastName']} <br/><br/>
                        <div className="profileHeader">Street Address: <br/></div>
                            {this.props.user.address['street']}, {this.props.user.address['city']} {this.props.user.address['zip']} <br/><br/>
                        <div className="profileHeader">Phone Number: <br/></div>
                        {this.props.user.attributes['phone']} <br/><br/>
                        <div className="profileHeader">Email: <br/></div>
                        {this.props.user.principal} <br/><br/>
                    </div>
                }

                {/* This displays a user's pets */}
                {_.isDefined(this.props.pets) && this.props.pets.length !== 0 &&
                <div className="d-md-flex flex-md-wrap justify-content-md-start">
                    {this.props.pets.map(pet => (
                        _.isDefined(pet) && _.isDefined(pet.petName) &&
                        <div key={pet.petName + '_' + pet.id} className="card m-md-3" style={{backgroundColor:'black'}}>
                            <div className="card-header">
                                <div>
                                    <span className="text-muted">Pet Name: </span>{pet.petName}
                                </div>
                            </div>
                            <ul className="list-group list-group-flush" >
                                <li className="list-group-item" style={{backgroundColor:'black'}}>
                                    <div>
                                        <span className="text-muted">Species: </span>{pet.petSpecies}
                                    </div>

                                </li>
                                <li className="list-group-item" style={{backgroundColor:'black'}}>
                                    <div>
                                        <span className="text-muted">Sex: </span>{pet.petSex}
                                    </div>
                                </li>
                                <li className="list-group-item" style={{backgroundColor:'black'}}>
                                    <div>
                                        <span className="text-muted">Age: </span>{pet.petAge}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    ))
                    }
                </div>
                }
                {!_.isDefined(this.props.pets) &&
                    <span> No pets yet. Add some !! </span>

                }

                {/* This is where you add pets  */}
                <Pet.Pets/>

            </div>
        );
    }
}

Profile = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state),
        pets: Users.State.getPets(state),
    }),
    dispatch => ({
        fPets: () => dispatch(Users.Actions.fetchPets()),
    })
)(Profile);

export { Profile };