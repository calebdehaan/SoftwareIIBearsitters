import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import * as Users from './users';
import * as Owner from 'js/User/owner';
import * as Sitter from 'js/User/sitter';
import * as Bessemer from '../alloy/bessemer/components';
import * as Editor from 'js/User/editProfile';

class Profile extends React.Component {
	constructor(props){
		super(props);
		this.editAttr1 = this.editAttr1.bind(this);
		this.editAttr2 = this.editAttr2.bind(this);
		this.editAttr3 = this.editAttr3.bind(this);
		this.editAttr4 = this.editAttr4.bind(this);

		this.state = {
			petName: '',
			petSex: 'Male',
			petSpecies: 'Dog',
			petAge: 0,
			edit1:false,
			edit2:false,
			edit3:false,
			edit4:false
		};
	}

	editAttr1(){
		this.state.edit1 = !this.state.edit1;
		this.setState(this.state);
		return console.log('editing name now ' + this.state.edit1);
	}
	editAttr2(){
		this.state.edit2 = !this.state.edit2;
		this.setState(this.state);
		return console.log('editing address now ' + this.state.edit2);
	}
	editAttr3(){
		this.state.edit3 = !this.state.edit3;
		this.setState(this.state);
		return console.log('editing phone number now ' + this.state.edit3);
	}
	editAttr4(){
		this.state.edit4 = !this.state.edit4;
		this.setState(this.state);
		return console.log('editing email now ' + this.state.edit4);
	}

	componentDidMount() {
		this.props.fetchUser().then(() => {
			this.setState(this.state);
		});
	}


	render() {
		return (
			<div className="container padded">
				This is your profile page
				{ !_.isNil(this.props.user) && !_.isNil(this.props.user.roles) &&
					<div> You're a
						{ (this.props.user.roles.length === 2) &&
						<span> Petsitter and Petowner! Congratulations!! </span>
						}
						{(this.props.user.roles.length === 1) && this.props.user.roles.includes('OWNER') &&
						<span> Petowner! Congratulations!! </span>
						}
						{(this.props.user.roles.length === 1) && this.props.user.roles.includes('SITTER') &&
						<span> Petsitter! Congratulations!! </span>
						}
					<br/></div>
				}

				{ !_.isNil(this.props.user) &&
					<div>
						Welcome , {this.props.user.attributes['firstName']}! <br/> <br/>
						<div className="profileHeader">Full Name: <br/></div>
							<Bessemer.Button onClick={this.editAttr1} style={{backgroundColor:'black', borderColor:'black', float:'right'}}><i className='fa fa-edit'></i></Bessemer.Button>
							{!this.state.edit1 ?
								<p>{this.props.user.attributes['firstName']} {this.props.user.attributes['lastName']} </p>
								:
								<Editor.EditProfile1/>
							}
							<br/>
						<div className="profileHeader">Street Address: <br/></div>
							<Bessemer.Button onClick={this.editAttr2} style={{backgroundColor:'black', borderColor:'black', float:'right'}}><i className='fa fa-edit'></i></Bessemer.Button>
							{!this.state.edit2 ?
								<p>{this.props.user.address['street']} , {this.props.user.address['city']} {this.props.user.address['zip']}</p>
								:
								<Editor.EditProfile2/>
							}
							<br/>
						<div className="profileHeader">Phone Number: <br/></div>
							<Bessemer.Button onClick={this.editAttr3} style={{backgroundColor:'black', borderColor:'black', float:'right'}}><i className='fa fa-edit'></i></Bessemer.Button>
							{!this.state.edit3 ?
								<p>{this.props.user.attributes['phone']}</p>
								:
								<Editor.EditProfile3/>
							}
							<br/>
						<div className="profileHeader">Email: <br/></div>
							<Bessemer.Button onClick={this.editAttr4} style={{backgroundColor:'black', borderColor:'black', float:'right'}}><i className='fa fa-edit'></i></Bessemer.Button>
							{!this.state.edit4 ?
								<p>{this.props.user.principal}</p>
								:
								<Editor.EditProfile4/>
							}
							<br/>
					</div>
				}

				{/* Owner profile settings */}
				{this.props.user.roles.includes('OWNER') && <Owner.Owner/> }

				{/* Sitter profile settings */}
				{this.props.user.roles.includes('SITTER') && <Sitter.Sitter/> }

			</div>
		);
	}
}

Profile = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state),
		pets: Users.State.getPets(state),
	}),
	dispatch => ({
		fetchUser: () => dispatch(Users.Actions.fetchUser())
	})
)(Profile);

export { Profile };