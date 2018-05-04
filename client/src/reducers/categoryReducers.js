import update from 'immutability-helper';

function categories(state = [], action){
  switch(action.type){
    case 'SET_CATEGORIES':
      return action.categories
    case "ADD_CATEGORY":
      return [...state, action.category];
    case "EDIT_CATEGORY":
      var index = state.map(x => x.id).indexOf(action.id); //get index for immutability helper
      return update(state, {
        [index]: {[action.targetName]: {$set: action.value}}
      });
    case "REMOVE_CATEGORY":
      return state.filter(category => category.id !== action.id)
    case "ADJUST_CATEGORY_WEIGHT":
      var index = state.map(x => x.id).indexOf(action.id); //get index for immutability helper
      return update(state, {[index]: {weight_in_grams: {$apply: function(x) {return parseFloat(x) + action.weightChange}}}});
    default:
      return state
  }
}

export {categories}