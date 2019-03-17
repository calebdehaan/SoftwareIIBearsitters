import axios from 'axios';
import Cookies from 'universal-cookie';

export function register(user) {
	return axios.post('/api/user/register', user);
}

export function addPet(pet) {
	console.log(JSON.stringify(pet));
	return axios.post('/api/pets', pet).then(() => {
		// Add the pet ID to the users pet list
		return axios.post('/api/user/pet/' + pet.id);
	});
}

export function authenticate(username, password) {
	return axios(
		{
			method: 'post',
			url: '/oauth/token',
			params: {
				'grant_type': 'password',
				username,
				password
			},
			auth: {
				username: 'petfinder-app',
				password: 'petfinder-app-secret'
			}
		}
	);
}

export function getUserDetails() {
	return axios.get('/api/user');
}

export function getPetDetails(pet) {
	return axios.get('/api/pets/' + pet.id);
}


export function getPets() {
	return axios.get('/api/user/pet');
}


export function updateUser(user) {
	return axios.post('/api/user/update', user);
}

export function updatePet(pet) {
	console.log('Updating pet in elastic search\n\n\n');
	return axios.post('/api/pets/update/', pet);
}

let State = {};

State.getAuthentication = state => {
	return state.authentication;
};

State.getUser = state => {
	return state.user;
};

State.getPets = state => {
	return state.pets;
};

export { State };

let Actions = {};

Actions.Types = {
	SET_AUTHENTICATION: 'SET_AUTHENTICATION',
	SET_USER: 'SET_USER',
	SET_PETS: 'SET_PETS'
};

Actions.register = user => {
	return (dispatch) => {
		return register(user).then(() => {
			return dispatch(Actions.authenticate(user.principal, user.password));
		});
	};
};

Actions.authenticate = (username, password) => {
	return (dispatch) => {
		return authenticate(username, password).then(
			authentication => {
				dispatch(Actions.setAuthentication(authentication));

				return getUserDetails().then(user => {
					dispatch(Actions.setUser(user));
				});
			}
		);
	};
};

Actions.logout = () => {
	return (dispatch) => {
		const cookies = new Cookies();
		cookies.remove('authentication');
		cookies.remove('user');

		dispatch(Actions.setPets(null));
		dispatch(Actions.setAuthentication(null));
		dispatch(Actions.setUser(null));
	};
};

Actions.setAuthentication = authentication => {
	const cookies = new Cookies();
	cookies.set('authentication', authentication, {path: '/'});

	return {type: Actions.Types.SET_AUTHENTICATION, authentication};
};

Actions.setUser = user => {
	const cookies = new Cookies();
	cookies.set('user', user, {path: '/'});

	return {type: Actions.Types.SET_USER, user};
};

/* Fetchers that will get some user objects and set them accordingly */
Actions.fetchUser = () => {
	return (dispatch) => {
		return getUserDetails().then(user => {
			return dispatch(Actions.setUser(user));
		});
	};
};

Actions.fetchPets = () => {
	return (dispatch) => {
		return getPets().then(pets => {
			return dispatch(Actions.setPets(pets));
		});
	};
};

Actions.setPets = pets => {
	if (pets != null) {
		for (let pet = 0; pet < pets.length; pet++) {
			if (pets[pet] != null) pets[pet].editing = false;
		}
	}
	return {type: Actions.Types.SET_PETS, pets};
};

Actions.addPet = pet => {
	return (dispatch) => {
		return addPet(pet).then(() => {
			return dispatch(Actions.fetchPets());
		});
	};
};

export { Actions };

let Reducers = {};

Reducers.authentication = (authentication = null, action) => {
	switch (action.type) {
		case Actions.Types.SET_AUTHENTICATION: {
			return action.authentication;
		}
		default: {
			return authentication;
		}
	}
};

Reducers.user = (user = null, action) => {
	switch (action.type) {
		case Actions.Types.SET_USER: {
			return action.user;
		}
		default: {
			return user;
		}
	}
};

Reducers.pets = (pets = [], action) => {
	switch (action.type) {
		case Actions.Types.SET_PETS: {
			return action.pets;
		}
		default: {
			return pets;
		}
	}
};

export { Reducers };