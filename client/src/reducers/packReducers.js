import update from 'immutability-helper';

function packs(state = [], action){
  var index;
  switch(action.type){
    case "ADD_PACK": 
      return [...state, action.pack];
    case "RECEIVE_PACKS":
      return action.packs;
    case "REMOVE_PACK": 
      return state.filter(pack => pack.id !== action.id);
    case "EDIT_PACK":
      index = state.map(x => x.id).indexOf(action.id); //get index for immutability helper
      return update(state, {[index]: {[action.targetName]: {$set: action.value}}});
    case "ADJUST_PACK_WEIGHT":
      index = state.map(x => x.id).indexOf(action.id); //get index for immutability helper
      return update(state, {[index]: {weight_in_grams: {$apply: function(x) {return parseFloat(x) + action.weightChange}}}});
    default: 
      return state;
  }
}

function currentPackID(state = null, action){
  switch(action.type){
    case "SELECT_CURRENT_PACK": 
      return action.id;
    default:
      return state;
  }
}


export {packs, currentPackID}





