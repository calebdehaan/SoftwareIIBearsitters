import React from 'react';
import {connect} from 'react-redux';
import * as Users from '../User/users';
import _ from 'lodash';
import * as Validation from 'js/alloy/utils/validation';
import * as Bessemer from 'js/alloy/bessemer/components';
import * as Ratings from 'js/Common/rating';
import {applyNotif} from '../Common/notification';

class MyPostings extends React.Component {
	constructor(props) {
		super(props);
		this.displayDate = this.displayDate.bind(this);
		this.state = {
			toggle: false,
			hasLoaded:false,
			choosingSitter:false,
			sitterChosen:'',
		};
	}

	 componentDidMount() {
		this.props.fUsersPosts().then(() => {
			this.state.hasLoaded = true;
			this.setState(this.state);
		});
	}

	displayDate = date =>{
		let newDate = new Date(date);
		if(newDate != null && _.isFunction(newDate.getMonth)) {
			if(newDate.getMinutes() !== 0)
				return days[newDate.getDay()-1] + ' ' + months[newDate.getMonth()] + ' ' + newDate.getDate() + ' ' + newDate.getFullYear().toString() + ' \@ ' + newDate.getHours() + ':' + newDate.getMinutes();
			else
				return days[newDate.getDay()-1] + ' ' + months[newDate.getMonth()] + ' ' + newDate.getDate() + ' ' + newDate.getFullYear().toString() + ' \@ ' + newDate.getHours() + ':00';
		}
		else {
			return ' No date object';
		}
	};

	checkIfTimeToRate(today,endDate){
		let endDatee = new Date(endDate);
		return today.getTime() > endDatee.getTime();

	}

	deletePost = (e, id) => {
		this.props.dUsersPosts(id).then(() => {
			this.props.fUsersPosts().then(() => {
				this.state.toggle = !this.state.toggle;
				this.setState(this.state);
			});
		});
	};

	cancelPosting = (e, post) => {
		console.log(post);
		if(post && post.id) {
			Users.deletePost(post.id).then(() => {
				this.props.fUsersPosts().then(() => {
					this.state.hasLoaded = true;
					this.setState(this.state);
				});
			});
		}
	};

	displayThePet = pet =>{
		return pet.split(/(\s+)/).filter(function (e) {
			return e.trim().length > 0;
		});
	};

	getPeople = (people) => {
		let list = [];
		let i;
		if(people !== null ) {
			for (i = 0; i < people.length; i++) {
				list.push({label: people[i], value: people[i]});
			}
		}

		return list;
	};

	choosingSitter = e => {
		if (e != null) {
			this.state.choosingSitter = e;
			this.setState(this.state);
		}
	};

	handleSitterChoice = e => {
		if (e != null) {
			this.state.sitterChosen = e;
			this.setState(this.state);
		}
	};

	chooseSitter = (post) => {
		post.sitterPrincipal = this.state.sitterChosen;
		post.possibleSitters.splice(post.possibleSitters.indexOf(this.state.sitterChosen), 1);
		console.log(post);
		this.props.updatePost(post);
	};

	checkPost = (post) =>{
		let endDatee = new Date(post.endDate);
		let today = new Date();
		let check = today.getTime() > endDatee.getTime();

		if(check && post.isComplete === false) {
			console.log(post);
			post.isComplete = true;
			this.props.updatePost(post);
		}

		return true;
	};

	render() {
		let today = new Date();
		return (
			<div>
				{_.isDefined(this.props.posts) && this.props.posts.length !== 0 &&
				<div className="d-md-flex flex-md-wrap justify-content-md-start">
					{this.props.posts.map(post => (_.isDefined(post) && _.isDefined(post.id) && _.isNull(post.postingRating) && this.checkPost(post) &&
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
												<ul className="list-group list-group-flush" style={{maxHeight:'140px'}}>
													{this.displayThePet(petID).map((pet) => (
														<li key={pet} className="list-group-item" style={{backgroundColor: 'black',textAlign:'center',maxHeight:'35px'}}>
															<span style={{fontSize:'13px'}} >{pet}</span>
														</li>
													))}
													<br/>
												</ul>
												<br/>
											</div>
										))}
									</div>
									}
								</li>
								{(post.sitterPrincipal === '') && !_.isEmpty(post.possibleSitters) &&
								<li className="list-group-item" style={{backgroundColor: 'black'}}>
									<div>
										<div>
											<span style={{backgroundColor: 'black'}}>
												<Bessemer.Select style={{backgroundColor: 'black'}}
																 name="sitter_choice"
																 className={'col-12 d-inline-block'}
																 friendlyName="Choose Sitter"
																 placeholder="Choose a Sitter"
																 validators={[Validation.requiredValidator]}
																 options={this.getPeople(post.possibleSitters)}
																 value={this.state.sitterChosen}
																 onChange={choice => this.handleSitterChoice(choice)}/>
											</span>
										</div>
										{!_.isBlank(this.state.sitterChosen) &&
										<div className={'container-fluid'}>
											<div style={{textAlign: 'center'}}
												 className={'row justify-content-center'}>
												<button className={'btn btn-danger '}
														onClick={() => this.chooseSitter(post)}>Confirm Sitter
													Choice
												</button>
											</div>
										</div>
										}
									</div>
								</li>
								}
								{!this.checkIfTimeToRate(today,post.endDate) && !_.isEmpty(post.sitterPrincipal) &&
								<li className="list-group-item" style={{backgroundColor: 'black'}} >
									<span> Sitter is {post.sitterPrincipal}</span>
								</li>
								}

								{!this.checkIfTimeToRate(today,post.endDate) && !_.isEmpty(post.sitterPrincipal) && post.isCancelled !== true &&
								<Bessemer.Button onClick={(e) => {
									this.cancelPosting(e, post);
								}}
												 style={{
													 backgroundColor: 'black',
													 borderColor: 'black',
													 float: 'right'
												 }}> Cancel Post <i
									className='fa fa-paper-plane '></i></Bessemer.Button>
								}

							</ul>
							{(!this.checkIfTimeToRate(today, post.endDate) && _.isEmpty(post.sitterPrincipal) &&
								<Bessemer.Button onClick={(e) => {
									this.deletePost(e, post.id);
								}}
												 style={{
													 backgroundColor: 'black',
													 borderColor: 'black',
													 float: 'right'
												 }}> Delete Post <i
									className='fa fa-paper-plane '></i></Bessemer.Button>
							)
							||(
							post.isCancelled === true &&
							<Bessemer.Button onClick={(e) => {
								this.deletePost(e, post.id);
							}}
											 style={{
												 backgroundColor: 'black',
												 borderColor: 'black',
												 float: 'right'
											 }}> Delete Post <i
								className='fa fa-paper-plane '></i></Bessemer.Button>
							)}

							{post.isComplete === true && !_.isEmpty(post.sitterPrincipal) &&
							<Ratings.Rating postToRate={post}/>
							}

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
		updatePost: post => dispatch(Users.Actions.updatePost(post)),

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
		this.props.fRecommendedPosts(this.props.user.principal).then(() => {
			this.state.toggle = !this.state.toggle;
			this.setState(this.state);
		});
	}

	displayDate = date =>{
		let newDate = new Date(date);
		if(newDate != null && _.isFunction(newDate.getMonth)) {
			if(newDate.getMinutes() !== 0)
				return days[newDate.getDay()-1] + ' ' + months[newDate.getMonth()] + ' ' + newDate.getDate() + ' ' + newDate.getFullYear().toString() + ' \@ ' + newDate.getHours() + ':' + newDate.getMinutes();
			else
				return days[newDate.getDay()-1] + ' ' + months[newDate.getMonth()] + ' ' + newDate.getDate() + ' ' + newDate.getFullYear().toString() + ' \@ ' + newDate.getHours() + ':00';
		}
		else {
			return ' No date object';
		}
	};

	displayThePet = pet =>{
		return pet.split(/(\s+)/).filter(function (e) {
			return e.trim().length > 0;
		});
	};

	checkIfUserAlreadySignedUp = (post,principal) => {
		let flag = false;
		if(post.possibleSitters !== null){
			post.possibleSitters.map(post =>{
				if(principal === post)
					flag = true;
			});
		}

		return flag;
	};


	addSitter = (form, post, sitterPrincipal) =>{
		let possSitter = post.possibleSitters;
		let postToUpdate = post;

		postToUpdate.chosen = true;

		if(possSitter == null){
			let list = [];
			list.push(sitterPrincipal);
			possSitter = list;
		}
		else {
			let flag = true;
			possSitter.map(post=>{
				if(post === sitterPrincipal)
					flag = false;
			});
			if(flag)
				possSitter.push(sitterPrincipal);
		}

		postToUpdate.possibleSitters = possSitter;

		Users.updatePost(postToUpdate).then(applyNotif());
	};

	render() {
		let today = new Date();
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
									{ _.isDefined(post.pets) && post.pets.map((petID) => (
										<div key={petID} className="card m-sm-0"
											 style={{backgroundColor: 'black'}}>
											<ul className="list-group list-group-flush" style={{maxHeight:'140px'}}>
												{this.displayThePet(petID).map((pet) => (
													<li key={pet} className="list-group-item" style={{backgroundColor: 'black',textAlign:'center',maxHeight:'35px'}}>
														<span style={{fontSize:'13px'}} >{pet}</span>
													</li>
												))}
												<br/>
											</ul>
											<br/>
										</div>
									))}
								</li>
							</ul>
							{_.isEmpty(post.sitterPrincipal) && !_.isNull(this.props.user) && !this.checkIfUserAlreadySignedUp(post,this.props.user.principal) &&
							<Bessemer.Button onClick={(e) => {
								this.addSitter(e, post, this.props.user.principal);
							}} style={{backgroundColor: 'black', borderColor: 'black', float: 'right'}}>Sign up <i
								className='fa fa-paper-plane '></i></Bessemer.Button>
							}
							{_.isEmpty(post.sitterPrincipal) && !_.isNull(this.props.user) && this.checkIfUserAlreadySignedUp(post,this.props.user.principal) &&
							<li className="list-group-item" style={{backgroundColor: 'black',textAlign:'center',maxHeight:'35px'}} >
								<div>
									<span className="text-muted" >You already signed up! </span>
								</div>
							</li>
							}
							{!_.isEmpty(post.sitterPrincipal) &&
							<li className="list-group-item" style={{backgroundColor: 'black',textAlign:'center',maxHeight:'15px'}}>
								<span> Sitter has been chosen </span>
							</li>
							}
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