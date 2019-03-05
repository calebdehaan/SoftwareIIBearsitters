import React from 'react';
import * as NavBarr from 'js/gen';
import _ from 'lodash';
import {connect} from 'react-redux';
import * as Users from 'js/users';

class Profile extends React.Component {
    render() {
        return (
            <div className="container padded">
                This is your profile page

                { _.isDefined(this.props.user) &&
                <div>Welcome, {this.props.user.attributes['firstName']}!</div>
                }

            </div>
        );
    }
}

Profile = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state)
    })
)(Profile);

export { Profile };