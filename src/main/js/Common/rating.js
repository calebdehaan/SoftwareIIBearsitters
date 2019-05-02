import Ratings from 'react-ratings-declarative';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/User/users';
import * as Bessemer from 'js/alloy/bessemer/components';

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.changeRating = this.changeRating.bind(this);
        this.state={
            rating:2.5,
        };
    }

    changeRating(newRating) {
        this.setState({
            rating: newRating
        });
    }

    addRating = (post) => {
        post.postingRating = this.state.rating;
        console.log(post.postingRating);
        this.props.updatePost(post).then(() => {
            this.props.addRating(post.sitterPrincipal, post.postingRating);
        });
    };

    render(){
        return(
            <div>
                <li>
                <Bessemer.Button onClick={(e) => {this.addRating(this.props.postToRate);
                }} style={{backgroundColor: 'black', borderColor: 'black'}}> Rate the sitter {this.props.postToRate.sitterPrincipal} <i
                    className='fa fa-paper-plane '></i></Bessemer.Button>
                </li>
                <li>
                <Ratings rating={this.state.rating} changeRating={this.changeRating} widgetRatedColors="gold">
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                </Ratings>
                </li>
            </div>
        );
    }
}

Rating = connect(
    state => ({
        user: Users.State.getUser(state),
    }),
    dispatch => ({
        updatePost: post => dispatch(Users.Actions.updatePost(post)),
        addRating: (userName,num) => dispatch(Users.addRating(userName,num)),

    })
)(Rating);

export {Rating};