import React from 'react';
import {connect} from 'react-redux';
import * as Users from './users';

class AboutUsPage extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div> hi
			</div>
		);
	}
}

AboutUsPage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state),
	}),
)(AboutUsPage);

export { AboutUsPage };