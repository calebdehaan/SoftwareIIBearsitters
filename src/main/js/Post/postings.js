import React from 'react';
import {connect} from 'react-redux';
import * as Users from '../User/users';
import _ from 'lodash';
import * as Bessemer from 'js/alloy/bessemer/components';

class MyPostings extends React.Component {
	constructor(props) {
		super(props);
		this.displayDate = this.displayDate.bind(this);
		this.state = {
			toggle: false,
			hasLoaded:false,
			pets:[],
		};
	}

	componentDidMount() {
		this.props.fUsersPosts().then(() => {
			this.state.hasLoaded = true;
			this.setState(this.state);
		}).then(() => {
				if (this.props.post != null) {
					this.props.post.map((post) => {
							post.pets.map((petID) => {
									this.pets[petID] = this.props.getPet(petID);
								}
							);
						}
					);
				}
			}
		);
	}

	displayDate = date =>{
		let newDate = new Date(date);
		if(newDate != null && _.isFunction(newDate.getMonth)) {
			if(newDate.getMinutes() !== 0)
				return months[newDate.getMonth()] + ' ' + newDate.getDate() + ' ' + newDate.getFullYear().toString() + ' \@ ' + newDate.getHours() + ':' + newDate.getMinutes();
			else
				return months[newDate.getMonth()] + ' ' + newDate.getDate() + ' ' + newDate.getFullYear().toString() + ' \@ ' + newDate.getHours() + ':00';
		}
		else {
			return ' No date object';
		}
	};

	deletePost = (e, id) => {
		this.props.dUsersPosts(id).then(() => {
			this.props.fUsersPosts().then(() => {
				this.state.toggle = !this.state.toggle;
				this.setState(this.state);
			});
		});
	};

	displayName = pet =>{
		let rv = 'No pet';
		return rv;
	};

	displaySpecies = pet =>{

	};

	render() {
		return (
			<div>
				{_.isDefined(this.props.posts) && this.props.posts.length !== 0 &&
				<div className="d-md-flex flex-md-wrap justify-content-md-start">
					{this.props.posts.map(post => (_.isDefined(post) && _.isDefined(post.id) &&
						<div key={post.id} className="card m-sm-0" style={{backgroundColor: 'black'}}>
							<ul className="list-group list-group-flush">
								<li className="list-group-item" style={{backgroundColor: 'black'}}>
									<div>
										<span
											className="text-muted">Start </span>{this.displayDate(post.startDate)}
									</div>
								</li>
								<li className="list-group-item" style={{backgroundColor: 'black'}}>
									<div>
										<span className="text-muted">End </span>{this.displayDate(post.endDate)}
									</div>
								</li>
								<li>
									{_.isDefined(post.pets) && post.pets.length !== 0 &&
									<div>
										{post.pets.map((petID) => (
												<div key={petID} className="card m-sm-0"
													 style={{backgroundColor: 'black'}}>
													<ul className="list-group list-group-flush">
														<li className="list-group-item"
															style={{backgroundColor: 'black'}}>
															<div>
													<span
														className="text-muted">Name </span>{this.displayName(petID)}
															</div>
														</li>
														<li className="list-group-item"
															style={{backgroundColor: 'black'}}>
															<div>
													<span
														className="text-muted">Species </span>
															</div>
														</li>
													</ul>
												</div>
											))}
									</div>
									}
								</li>
							</ul>
							<Bessemer.Button
								style={{backgroundColor: 'black', borderColor: 'black', float: 'right'}}> Choose
								Sitter <i className='fa fa-paper-plane '></i></Bessemer.Button>
							<Bessemer.Button onClick={(e) => {
								this.deletePost(e, post.id);
							}}
											 style={{
												 backgroundColor: 'black',
												 borderColor: 'black',
												 float: 'right'
											 }}> Delete Post <i
								className='fa fa-paper-plane '></i></Bessemer.Button>
						</div>
					))}
				</div>
				}
			</div>
		);
	}
}

MyPostings = connect(
	state => ({
		user: Users.State.getUser(state),
		posts: Users.State.getPosts(state)
	}),
	dispatch => ({
		fUsersPosts: () => dispatch(Users.Actions.fetchUsersPosts()),
		dUsersPosts: post => dispatch(Users.Actions.deletePost(post)),
		getPet: pet => dispatch(Users.Actions.getPetDetails(pet)),
	})
)(MyPostings);


export { MyPostings };


class Posting extends React.Component {
	constructor(props) {
		super(props);
		this.displayDate = this.displayDate.bind(this);
		this.state = {
			toggle: false,
		};
	}

	componentDidMount() {
		//TODO change to recommended
		this.props.fRecommendedPosts(this.props.user.principal).then(() => {
			this.state.toggle = !this.state.toggle;
			this.setState(this.state);
		});

		if(this.props.posts != null) {
			this.props.posts.map(post => {
				if (_.isDefined(post) && _.isDefined(post.id)) {
					console.log(post.startDate.getMonth);
				}
			});
		}
	}

	displayDate = date =>{
		let newDate = new Date(date);
		if(newDate != null && _.isFunction(newDate.getMonth)) {
			if(newDate.getMinutes() !== 0)
				return months[newDate.getMonth()] + ' ' + newDate.getDay() + ' ' + newDate.getFullYear().toString() + ' \@ ' + newDate.getHours() + ':' + newDate.getMinutes();
			else
				return months[newDate.getMonth()] + ' ' + newDate.getDay() + ' ' + newDate.getFullYear().toString() + ' \@ ' + newDate.getHours() + ':00';
		}
		else {
			return ' No date object';
		}
	};

    addSitter = (e, sitterPrincipal, post) =>{
        post.addSitter(sitterPrincipal);
        post.update();
    }

	render() {
		return (
			<div>
				{/* This displays all the posts unless a query is produced */}
				{_.isDefined(this.props.posts) && this.props.posts.length !== 0 &&
				<div className="d-md-flex flex-md-wrap justify-content-md-start">
					{this.props.posts.map(post => ( _.isDefined(post) && _.isDefined(post.id) &&
						<div key={post.id} className="card m-sm-0" style={{backgroundColor: 'black'}}>
							<ul className="list-group list-group-flush">
								<li className="list-group-item" style={{backgroundColor: 'black'}}>
									<div>
										<span className="text-muted">Start </span>{this.displayDate(post.startDate)}
									</div>
								</li>
								<li className="list-group-item" style={{backgroundColor: 'black'}}>
									<div>
										<span className="text-muted">End </span>{this.displayDate(post.endDate)}
									</div>
								</li>
								<li className="list-group-item" style={{backgroundColor: 'black'}}>
									<div>
										<span className="text-muted">Submitted By  </span>{post.ownerPrincipal}
									</div>
								</li>
								<li>
								{this.props.posts.petSpecies != null && this.props.posts.petSpecies.map(pet => ( _.isDefined(pet) && _.isDefined(pet.id) &&
									<div key={pet.id} className="card m-sm-0" style={{backgroundColor: 'black'}}>
										<ul className="list-group list-group-flush">
											<li className="list-group-item" style={{backgroundColor: 'black'}}>
												<div>
													<span className="text-muted">Name </span>{pet.petName}
												</div>
											</li>
											<li className="list-group-item" style={{backgroundColor: 'black'}}>
												<div>
													<span className="text-muted">Species </span>{pet.petSpecies}
												</div>
											</li>
										</ul>
									</div>
								))}
								</li>
							</ul>
							<Bessemer.Button onClick={(e) => {this.addSitter(e, this.props.user.principal, post);}} style={{backgroundColor: 'black', borderColor: 'black', float: 'right'}}>Sign up <i className='fa fa-paper-plane '></i></Bessemer.Button>
						</div>
					))}
				</div>
				}
				{ !_.isDefined(this.props.posts) &&
				<div >
					No posts available! Check back later!!
				</div>
				}
			</div>
		);
	}
}

Posting = connect(
	state => ({
		user: Users.State.getUser(state),
		posts: Users.State.getPosts(state)
	}),
	dispatch => ({
		fPosts: () => dispatch(Users.Actions.fetchPosts()),
		fRecommendedPosts: userName => dispatch(Users.Actions.fetchRecommendedPosts(userName)),
	})
)(Posting);

// Day options
export const days = ['Mon','Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

// Month options
export const months = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export { Posting };