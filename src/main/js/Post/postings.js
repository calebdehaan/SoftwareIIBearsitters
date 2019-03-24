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
		};
	}

	componentDidMount() {
		this.props.fUsersPosts().then(() => {
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

	deletePost = (e, id) => {
		this.props.dUsersPosts(id).then(() => {
			this.props.fUsersPosts().then(() => {
				this.state.toggle = !this.state.toggle;
				this.setState(this.state);
			});
		});
	};

	render() {
		return (
			<div>
				{/* This displays all the posts of a user */}
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
							</ul>
							<Bessemer.Button style={{backgroundColor: 'black', borderColor: 'black', float: 'right'}}> Choose Sitter <i className='fa fa-paper-plane '></i></Bessemer.Button>
							<Bessemer.Button onClick={(e) => {this.deletePost(e, post.id);}}
											 style={{backgroundColor: 'black', borderColor: 'black', float: 'right'}}> Delete Post <i className='fa fa-paper-plane '></i></Bessemer.Button>
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

MyPostings = connect(
	state => ({
		user: Users.State.getUser(state),
		posts: Users.State.getPosts(state)
	}),
	dispatch => ({
		fUsersPosts: () => dispatch(Users.Actions.fetchUsersPosts()),
		dUsersPosts: post => dispatch(Users.Actions.deletePost(post))
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
		this.props.fPosts().then(() => {
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
							</ul>
							<Bessemer.Button style={{backgroundColor: 'black', borderColor: 'black', float: 'right'}}>Sign up <i className='fa fa-paper-plane '></i></Bessemer.Button>
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
	})
)(Posting);

// Day options
export const days = ['Mon','Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

// Month options
export const months = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export { Posting };