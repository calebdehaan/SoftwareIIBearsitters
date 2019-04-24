import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from '../User/users';

class NotificationCenter extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{ (this.props.user != null) && (this.props.user.roles != null) &&
					<div>

					</div>
				}
			</div>
		);
	}
}

NotificationCenter = connect(
	state => ({
		user: Users.State.getUser(state),
	})
)(NotificationCenter);

export { NotificationCenter };