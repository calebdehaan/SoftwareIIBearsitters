import Ratings from 'react-ratings-declarative';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import * as Users from 'js/User/users';

class Rating extends React.Component {
    /*
    changeRating(newRating) {
        this.setState({
            rating: newRating
        });
    }*/

    // code from https://github.com/ekeric13/react-ratings-declarative
    render(){
        return(
            <div className="container padded">
                <Ratings
                    rating={0}
                    widgetRatedColors="gold"
                >
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                </Ratings>
            </div>
        );
    }
}
/*
Rating = connect(
    state => ({
        user: Users.State.getUser(state),
    })
)(Rating);
*/
export {Rating};