import count from './count'
import posts from './posts'

export function app(state = {}, action) {
  return {
    count: count(state.count, action), // only part of the state is passed
    posts: posts(state.posts, action), // only part of the state is passed
  };
}
