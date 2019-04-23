import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import * as Pages from 'js/pages';
import {ToastContainer} from 'react-toastify';

export default class Index extends React.Component {
	render() {
		return (
			<HashRouter>
				<div>
                    <ToastContainer/>
					<Route exact path="/" component={Pages.Home} />
					<Route exact path="/register" component={Pages.RegisterPage} />
					<Route exact path="/login" component={Pages.LoginPage} />
					<Route exact path="/request" component={Pages.RequestSitting} />
					<Route exact path="/posting" component={Pages.Postings} />
					<Route exact path="/sittersPosts" component={Pages.SitterPosts} />
					<Route exact path="/profile" component={Pages.Profile} />
					<Route exact path='/publicProfile/:id' component={Pages.PublProfile}/>
					<Route exact path="/faq" component={Pages.FAQ} />
					<Route exact path="/support" component={Pages.Support} />
					<Route exact path="/aboutUs" component={Pages.AboutUs} />
				</div>
			</HashRouter>
		);
	}
}