import Constants from '../constants';
import { httpGet } from '../utils';
import cookie from 'react-cookie';

function setCurrentUser(dispatch, user) {
  dispatch({
    type: Constants.CURRENT_USER,
    currentUser: user,
  });
}

const Actions = {
  fetchSite: (id) => {
    return dispatch => {
      httpGet('https://public-api.wordpress.com/rest/v1/me/')
        .then((data) => {
          console.log(data)
        })
    }
  },

  signIn: (email, password) => {
    return dispatch => {
      const data = {
        session: {
          email: email,
          password: password,
        },
      };

      httpPost('/api/v1/sessions', data)
        .then((data) => {
          localStorage.setItem('phoenixAuthToken', data.jwt);
          setCurrentUser(dispatch, data.user);
          browserHistory.push('/');
        })
        .catch((error) => {
          console.log(error)
          error.response.json()
            .then((errorJSON) => {
              dispatch({
                type: Constants.SESSION_ERROR,
                error: errorJSON.error,
              });
            });
        });
    };
  },

  currentUser: () => {
    return dispatch => {
      httpGet('/api/v1/current_user')
        .then(function(data) {
          setCurrentUser(dispatch, data);
        })
        .catch(function(error) {
          localStorage.removeItem('phoenixAuthToken');
          browserHistory.push('/signin');
        });
    };
  },

  signOut: () => {
    return dispatch => {
      httpDelete('/api/v1/sessions')
        .then((data) => {
          localStorage.removeItem('phoenixAuthToken');

          dispatch({
            type: Constants.USER_SIGNED_OUT
          });

          browserHistory.push('/signin');
        })
        .catch(function(error) {
          console.log(error)
        });
    };
  }
};


export function add_post(post) {
  return {
    type: 'ADD_POST',
    post: post
  }
}

export function update_post(post, tag){
	console.log('update');
	return {
		type: 'UPDATE_POST',
		post: post,
		tag: tag
	}
}

export function fetchSite(id) {
  console.log(getAllPosts(id, {
    number: 2
  }, []));
}
