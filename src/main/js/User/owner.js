import React from 'react';
import {connect} from 'react-redux';
import * as Users from './users';
import * as Pet from 'js/Pet/addPets';

class Owner extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				<span> Owner settings </span>
				<Pet.PetList/>
				<Pet.Pets/>
			</div>
		);
	}
}

Owner = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state),
	}),
)(Owner);

export { Owner };