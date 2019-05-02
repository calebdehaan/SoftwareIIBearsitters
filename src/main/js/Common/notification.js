//Caleb DeHaan 14 april 2019
import { toast} from 'react-toastify';

const applyNotif = () => toast.success('You have applied to the listing.');
const updatePostNotif = () => toast.success('The post has been updated.');
const cancelPostNotif = () => toast.error('You have canceled the listing.');
const addPetNotif = (pet) => toast.success('You have added ' + pet.petName + ' to your pets.');
const updateProfileNotif = () => toast.success('You have updated your profile.');
const newPostNotif = () => toast.success('You have created your listing.');
const sittingRatingNotif = () => toast.info('You have received a new rating.');
const removePetNotif = () => toast.done('You have removed the pet from your account.');
const createAccountNotif = () => toast.success('Glad to have you on board!');
const deleteAccountNotif = () => toast.error('We\'re sorry to see you go. Hope to see you rejoin us in the future!');
const loginNotif = (user) => toast.success('Welcome back, ' + user + '!');
const logoutNotif = () => toast.success('Hope you see you soon!');
const wrongDate = () => toast.error('Make sure the start and end times are at least an hour away from now!');
const noPets = () => toast.error('Add at least one pet to the listing!');
const incorrectLogin = () => toast.error('Bad credentials! Try again');
export {
    applyNotif,
    logoutNotif,
    updatePostNotif,
    cancelPostNotif,
    addPetNotif,
    updateProfileNotif,
    newPostNotif,
    sittingRatingNotif,
    removePetNotif,
    createAccountNotif,
    deleteAccountNotif,
    loginNotif,
    wrongDate,
    noPets,
    incorrectLogin,
};

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