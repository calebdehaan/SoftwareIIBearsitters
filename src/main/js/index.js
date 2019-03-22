import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import * as Pages from 'js/pages';

export default class Index extends React.Component {
	render() {
		return (
			<HashRouter>
				<div>
					<Route exact path="/" component={Pages.Home} />
					<Route exact path="/register" component={Pages.RegisterPage} />
					<Route exact path="/login" component={Pages.LoginPage} />
					<Route exact path="/request" component={Pages.RequestSitting} />
					<Route exact path="/posting" component={Pages.Postings} />
					<Route exact path="/sittersPosts" component={Pages.SitterPosts} />
					<Route exact path="/profile" component={Pages.Profile} />
				</div>
			</HashRouter>
		);
	}
}