import { CREATE} from './actions';

const defaultState = [];

export function reducers(state = defaultState, action) {
  switch (action.type) {
    case CREATE:
      state.push(action.project);
      return Array.from(state);
    default :
      return state;
  }
}
