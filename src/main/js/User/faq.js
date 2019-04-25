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
				<br/>
				<h1>BearSitters FAQ</h1>
				<br/>
				<h2>Tempetūrs</h2>
				<div className="panel">
					<p>Tempetūrs is our sponsor
					</p>
				</div>

				<h2>Can I register as both a sitter and an owner?</h2>
				<div className="panel">
					<p>We encourage it! When you register with BearSitters, you will be asked for the following:
						<ul>
							<li>Email address (which will serve as your login username)</li>
							<li>A password</li>
							<li>First Name</li>
							<li>Last name</li>
							<li>Phone number (so sitters or owners can contact you)</li>
							<li>Address (so you can view listings near you)</li>
						</ul>
						You will then be presented with check boxes asking if you would like to be a sitter or an owner.
						You can definitely select both boxes!
					</p>
				</div>

				<h2>How do I get someone banned from this website?</h2>
				<div className="panel">
					<p>Should you encounter someone behaving inappropriately through BearSitters,
						please notify our development team immediately.
						We will take further action to ensure it doesn't happen again.
						<dl>
							<dt>What constitutes inappropriate behavior?</dt>
							<li>Threats of violence</li>
							<li>Hate-speech</li>
							<li>Nudity</li>
						</dl>
					</p>
				</div>

				<h2>Is there a limit to how many pets I can have?</h2>
                <div className="panel">
                    <p>No, there is no limit! You can add as many pets as you would like.  You can also delete pet
                    entries if you need to.
                    </p>
                </div>

                <h2>What if there are no pet sitters near me?</h2>
                <div className="panel">
                    <p>We find pet-sitters for you within a set range; you cannot manually change it.  If there are no
                    pet sitters near you, we recommend changing your address to be in the nearest urban area to you so that you can
                    find sitters, and communicate your rural address to them after you contact them.
                    </p>
                </div>

                <h2>Can all pet owners on this site see my pet-sitter rating?</h2>
                <div className="panel">
                    <p>Yes!
                    </p>
                </div>

                <h4>Do you have a question you'd like to ask us? Click the link for our contact info</h4>

                <div className="registerButton">
                    <br/>
                    <a href="#/AboutUs">
                        <Bessemer.Button> Ask the developers a question! </Bessemer.Button>
                    </a>
                </div>
                <br/>
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