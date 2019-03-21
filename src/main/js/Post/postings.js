import React from 'react';
import { connect } from 'react-redux';
import * as Users from '../User/users';
import _ from 'lodash';
import * as Bessemer from 'js/alloy/bessemer/components';

class Posting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toggle: false,
		};
	}

	componentDidMount() {
		this.props.fPosts().then(() => {
			this.state.toggle = !this.state.toggle;
			this.setState(this.state);
		});
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
										<span className="text-muted">Start-Date </span>{post.startDate}
									</div>
								</li>
								<li className="list-group-item" style={{backgroundColor: 'black'}}>
									<div>
										<span className="text-muted">End-Date </span>{post.endDate}
									</div>
								</li>
								<li className="list-group-item" style={{backgroundColor: 'black'}}>
									<div>
										<span className="text-muted">Start-Time </span>{post.startTime}
									</div>
								</li>
								<li className="list-group-item" style={{backgroundColor: 'black'}}>
									<div>
										<span className="text-muted">End-Time </span>{post.endTime}
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

export { Posting };