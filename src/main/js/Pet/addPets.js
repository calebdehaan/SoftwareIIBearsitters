import React from 'react';
import {connect} from 'react-redux';
import * as Users from 'js/User/users';

class Pets extends React.Component {
    render() {
        return (
            <div className="container padded">
                This is your Pets page

            </div>
        );
    }
}

Pets = connect(
    state => ({
        authentication: Users.State.getAuthentication(state),
        user: Users.State.getUser(state)
    })
)(Pets);

export { Pets };