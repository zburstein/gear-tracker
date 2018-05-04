import update from 'immutability-helper';

export function gearItems(state = [], action){
  switch(action.type){
    case 'SET_GEAR_ITEMS':
      return action.gearItems
    case "ADD_GEAR_ITEM":
      return [...state, action.gearItem];
    case "EDIT_GEAR_ITEM":
      const index = state.map(x => x.id).indexOf(action.id); //get index for immutability helper
      return update(state, {
        [index]: {
          [action.targetName]: {
            $set: action.value
          },

          weight_in_grams: {
            $set: action.weight_in_grams
          }
        }
      });
    default:
      return state
  }
}

