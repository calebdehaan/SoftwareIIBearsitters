import React from 'react';
import {connect} from 'react-redux';
import * as Users from './users';
import * as Bessemer from 'js/alloy/bessemer/components';

class FAQPage extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				<h4>Do you have a question you'd like to ask us? Click the link for our contact info</h4>

				<div className="registerButton">
					<a href="#/AboutUs">
						<Bessemer.Button> Ask the Developers a Question! </Bessemer.Button>
					</a>
				</div>

				<h2>What does Tempetūrs mean?</h2>
				<div className="panel">
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
						nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</p>
				</div>

				<h2>Can I register as both a sitter and an owner?</h2>
				<div className="panel">
					<p>Yes! When you register with BearSitters, you will be asked for the following:
						<li>Email address (which will serve as your username)</li>
						<li>Create a password</li>
						<li>First and Last name</li>
						<li>Phone number: so that potential sitters/owners can get in touch with you</li>
						<li>Address: so that you can set a range</li>
						You will then be presented with check boxes asking if you would like to be a sitter or an owner.
						You can select both boxes! You are now registered as both a sitter and an owner.
					</p>
				</div>

				<h2>Is this website safe?</h2>
				<div className="panel">

					<dl>
						<dt>What if something happens to my pet?</dt>
						<li>We are not legally responsible for the safely of your pets.</li>
						<li>Sitters are not required to sign any legal paperword. Honors System everyone!!! :)</li>
						<dt>How well is my information protected?</dt>
						<li>Your information is not protected very well.</li>
						<li>All passwords are stored in plain text in a database which we have never cleaned.</li>
						<dt>Outside the scope of this project.</dt>
					</dl>
				</div>

				<h2>How do I get someone banned from this website?</h2>
				<div className="panel">
					<p>We do not have an easy way that you can report someone for inappropriate content, it was outside
						the scope of this project. You will have
						to shoot one of the developers an email explaining the situation and we can take the person out
						of
						the database manually!
						<dl>
							<dt>What constitutes inappropriate behavior?</dt>
							<li>Threats of violence</li>
							<li>Hate-speech</li>
							<li>Nudity</li>
							<dt>Not on my Christian Website!!!</dt>


						</dl>
					</p>
				</div>

				<h2>How do I get un-banned from this website?</h2>
				<div className="panel">
					<p>We do not have an easy way that to un-ban yourself from this website, it was outside the scope of
						this project. You will have
						to shoot one of the developers an email explaining the situation and we can let you off the
						short leash (pun intended)!
						<dl>
							<dt>What constitutes a reinstatement?</dt>
							<li>A display of sincere remorse for what you did >:(</li>

						</dl>
					</p>
				</div>

				<h2>Additional Resources</h2>

				<ul>
					<li>resource 1</li>
					<li>resource 2</li>
					<li>resource 3</li>
				</ul>

				<span> Our FAQ page </span>
			</div>
		);
	}
}

FAQPage = connect(
	state => ({
		authentication: Users.State.getAuthentication(state),
		user: Users.State.getUser(state),
	}),
)(FAQPage);

export { FAQPage };