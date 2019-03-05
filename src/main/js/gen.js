import React from 'react';
import _ from 'lodash';
import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Users from 'js/users';
import {connect} from 'react-redux';


class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    LogoutClick = () => {
        return this.props.logout();
    };

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">BearSitters</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            { (_.isUndefined(this.props.user) || _.isNil(this.props.user) ) &&
                                <li className="nav-item">
                                    <a className="nav-link" href="#/register">Register</a>
                                </li>
                            }

                            { (_.isUndefined(this.props.user) || _.isNil(this.props.user) ) &&
                                <li className="nav-item">
                                    <a className="nav-link" href="#/login">Login</a>
                                </li>
                            }
                            <li className="nav-item">
                                <a className="nav-link" href="#/page-1">Page1</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/page-2">Page2</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/availability">Schedule Availability</a>
                            </li>

                            {_.isDefined(this.props.user) &&
                            <li className="nav-item" style={{float:'right'}}>
                                <a className="nav-link" href="#/profile" > Profile </a>
                            </li>
                            }

                        </ul>

                        <ul className="navbar-nav" style={{float:'right'}}>

                            {_.isDefined(this.props.user) &&
                                <li className="nav-item">
                                    <a className="nav-link" href="#/" onClick={this.LogoutClick}> Log Out</a>
                                </li>
                            }

                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

NavBar = connect(
    state => ({
        user: Users.State.getUser(state),
    }),
    dispatch => ({
        logout: () => dispatch(Users.Actions.logout())
    })
)(NavBar);

export { NavBar };