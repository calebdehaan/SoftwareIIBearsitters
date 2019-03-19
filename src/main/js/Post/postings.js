import React from 'react';
import { connect } from 'react-redux';
import * as Users from '../User/users';

class Posting extends React.Component {
	render() {
		return (
            <div >
                shows all postings here
            </div>
		);
	}
}

Posting = connect(
	state => ({
		user: Users.State.getUser(state)
	}),
)(Posting);

export { Posting };