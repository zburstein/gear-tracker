import update from 'immutability-helper';

function categories(state = [], action){
  switch(action.type){
    case 'SET_CATEGORIES':
      return action.categories
    case "ADD_CATEGORY":
      return [...state, action.category];
    case "EDIT_CATEGORY":
      const index = state.map(x => x.id).indexOf(action.id); //get index for immutability helper
      return update(state, {
        [index]: {[action.targetName]: {$set: action.value}}
      });
    default:
      return state
  }
}

export {categories}