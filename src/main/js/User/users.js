import axios from 'axios';
import Cookies from 'universal-cookie';
import {
	addPetNotif,
	createAccountNotif,
	loginNotif,
	newPostNotif,
	deleteAccountNotif,
	cancelPostNotif,
	removePetNotif,
	updatePostNotif,
	logoutNotif
} from '../Common/notification';

export function register(user) {
	return axios.post('/api/user/register', user);
}

export function addPet(pet) {
	return axios.post('/api/pets', pet).then(() => {
		return axios.post('/api/user/pet/' + pet.id);
	});
}

export function addPost(post){
	return axios.post('/api/posts', post).then(() => {
		return axios.post('/api/user/posts/' + post.id);
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

export function getPublicUser(principal) {
	return axios.get('/api/user/public/' + principal);
}

export function sendEmailRegister() {
	return axios.post('/api/user/sendEmailRegister');
}

export function getPetDetails(pet) {
	return axios.get('/api/pets/' + pet);
}

export function getPets() {
	return axios.get('/api/user/pet');
}

export function getRecommendedPosts(userName) {
	let name = encodeURI('api/posts/recommended/'+userName);
	return axios.get(name);
}

export function getPosts() {
	return axios.get('/api/posts/all');
}

export function getPostsUser() {
	return axios.get('/api/user/posts');
}

export function updateUser(user) {
	return axios.post('/api/user/update', user);
}

export function updatePet(pet) {
	return axios.post('/api/pets/update/', pet);
}

export function updatePost(post) {
	return axios.post('/api/posts/update/', post);
}

export function deleteAccount() {
	return axios.post('/api/user/delete');
}

export function deletePet(id) {
	return axios.post('/api/pets/delete/' + id).then(() => {
		return axios.post('/api/user/pet/delete/' + id);
	});

}

export function deletePost(id) {
	return axios.post('/api/posts/delete/' + id).then(() => {
		return axios.post('/api/user/posts/delete/' + id);
	});
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

State.getPosts = state => {
	return state.posts;
};

export { State };

let Actions = {};

Actions.Types = {
	SET_AUTHENTICATION: 'SET_AUTHENTICATION',
	SET_USER: 'SET_USER',
	SET_PETS: 'SET_PETS',
	SET_POSTS: 'SET_POSTS',
};

Actions.register = user => {
	return (dispatch) => {
		return register(user).then(() => {
			createAccountNotif();
			return dispatch(Actions.authenticate(user.principal, user.password)).then(() => {
				getUserDetails().then((user) => {
					if(user.attributes['email'] === true)
						return sendEmailRegister();
				});
			});
		});
	};
};

Actions.getPetDetails = pet =>{
	return getPetDetails(pet);
};


Actions.authenticate = (username, password) => {
	return (dispatch) => {
		return authenticate(username, password).then(
			authentication => {
				dispatch(Actions.setAuthentication(authentication));
				return getUserDetails().then(user => {
					loginNotif(user.attributes['firstName']);
					dispatch(Actions.setUser(user));
				});
			}
		);
	};
};

Actions.deleteAccount = user => {
	return (dispatch) => {
		return deleteAccount(user).then(() => {
			deleteAccountNotif(user.attributes['firstName']);
			const cookies = new Cookies();
			cookies.remove('authentication');
			cookies.remove('user');

			dispatch(Actions.setPets(null));
			dispatch(Actions.setAuthentication(null));
			dispatch(Actions.setUser(null));
		});
	};
};


Actions.logout = () => {
	return (dispatch) => {
		logoutNotif();
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

Actions.fetchUsersPosts = () => {
	return (dispatch) => {
		return getPostsUser().then(posts => {
			return dispatch(Actions.setPosts(posts));
		});
	};
};

Actions.fetchPosts = () => {
	return (dispatch) => {
		return getPosts().then(posts => {
			return dispatch(Actions.setPosts(posts));
		});
	};
};

Actions.fetchRecommendedPosts = (userName) => {
	return (dispatch) => {
		return getRecommendedPosts(userName).then(posts => {
			return dispatch(Actions.setPosts(posts));
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
			addPetNotif(pet);
			return dispatch(Actions.fetchPets());
		});
	};
};

Actions.addPost = post => {
	newPostNotif();
	return addPost(post);
};

Actions.setPosts = posts => {
	return {type: Actions.Types.SET_POSTS, posts};
};

Actions.deletePost = (id) => {
	return (dispatch) => {
		return deletePost(id).then(() => {
			return getPosts().then(posts => {
				cancelPostNotif();
				return dispatch(Actions.setPosts(posts));
			});
		});
	};
};

Actions.deletePet = (id) => {
	return (dispatch) => {
		return deletePet(id).then(() => {
			return getPets().then(pets => {
				removePetNotif();
				return dispatch(Actions.setPets(pets));
			});
		});
	};
};

Actions.updatePost = (post) => {
	return (dispatch) => {
		return updatePost(post).then(() => {
			return getPosts().then(posts => {
				updatePostNotif();
				return dispatch(Actions.setPosts(posts));
			});
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

Reducers.posts = (posts = [], action) => {
	switch (action.type) {
		case Actions.Types.SET_POSTS: {
			return action.posts;
		}
		default: {
			return posts;
		}
	}
};

export { Reducers };