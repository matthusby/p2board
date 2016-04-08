import { INCREASE, DECREASE } from '../constants'

const initialState = 1;

export default function update(state = initialState, action) {
  if (action.type === INCREASE) {
    return state.number + action.amount;
  } else if (action.type === DECREASE) {
    return state.number - action.amount;
  }
  return state
}
