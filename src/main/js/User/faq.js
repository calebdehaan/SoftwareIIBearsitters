import React from 'react';
import {connect} from 'react-redux';
import * as Users from './users';

class FAQ extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				This is the FAQ page!!!
			</div>
		);
	}
}

FAQ = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state),
	}),
)(FAQ);

export { FAQ };