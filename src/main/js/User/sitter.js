import React from 'react';
import {connect} from 'react-redux';
import * as Users from './users';

class Sitter extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				This is for sitters
			</div>
		);
	}
}

Sitter = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state),
	}),
)(Sitter);

export { Sitter };