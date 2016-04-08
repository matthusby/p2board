import { ADD_POST } from '../constants'

function updateLocalStorage(post){
	//if (! localStorage.getItem(post.ID)){
		localStorage.setItem(post.ID, JSON.stringify(post));
	//}
}

export default function update(state = [], action) {
  if (action.type === ADD_POST) {
		updateLocalStorage(action.post);
    return state.concat(action.post);
  } else if (action.type === 'UPDATE_POST') {
		console.log('updating post');
		state = state.map(function(card){
			if(card.ID !== action.post.ID){
				return card;
			}
		});
	}
  return state
}
