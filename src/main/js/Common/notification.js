//Caleb DeHaan

import React, { Component } from 'react';
import { toast } from 'react-toastify';

const newSitterNotif = () => toast.success('A sitter has applied to your listing');
const acceptSitterNotif = () => toast.success('You have accepted the new sitter');
const cancelPostNotif = () => toast.error('You have cancelled the post');
const addPetNotif = () => toast.success('You have added the new pet to your pets');
const updateProfileNotif = () => toast.success('You have updated your profile');
const newPostNotif = () => toast.success('You have created your listing');
const sittingRatingNotif = () => toast.info('You have received a new rating');
const removePetNotif = () => toast.done('You have removed the pet from your pets');
const createAccountNotif = () => toast.success('Your account has been created');
const deleteAccountNotif = () => toast.error('Your account has been deleted');
export { newSitterNotif,
    acceptSitterNotif,
    cancelPostNotif,
    addPetNotif,
    updateProfileNotif,
    newPostNotif,
    sittingRatingNotif,
    removePetNotif,
    createAccountNotif,
    deleteAccountNotif };

/*
owner gets a new sitter
owner accepts a sitter for a post
sitter or owner cancels a post
a new pet is added to an owner
an update is made to the users profile
a user makes a post
a sitter gets a rating
a user deletes a pet
an account is created
an account is deleted
 */

/*
class Notify extends Component {
    constructor(props) {
        super(props);
    }

    notify = (type) => {

        toast("Default Notification !");

        toast.success("Success Notification !", {
            position: toast.POSITION.TOP_CENTER
        });

        toast.error("Error Notification !", {
            position: toast.POSITION.TOP_LEFT
        });

        toast.warn("Warning Notification !", {
            position: toast.POSITION.BOTTOM_LEFT
        });

        toast.info("Info Notification !", {
            position: toast.POSITION.BOTTOM_CENTER
        });

        toast("Custom Style Notification with css class!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'foo-bar'
        });
        if(type === 'success'){
            toast.success("Success!!!!",{
                position:toast.POSITION.TOP_RIGHT
            });
        }
    };

    render(){
        return <button onClick={this.notify{type='success'}}>Notify</button>;
    }
}

export { Notify };*/