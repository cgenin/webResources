import {UPDATE} from './actions';

const defaultState = [];

export function treducers(state = defaultState, action) {
  switch (action.type) {
    // case ADD:
    //   const index = state.findIndex(p => p.id === action.project.id);
    //   if (index !== -1) {
    //     state.splice(index, 1);
    //   }
    //   state.push(action.project);
    //   return Array.from(state);
    case UPDATE:
      return action.tasks;
    default :
      return state;
  }
}
