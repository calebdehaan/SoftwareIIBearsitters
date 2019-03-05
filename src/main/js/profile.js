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