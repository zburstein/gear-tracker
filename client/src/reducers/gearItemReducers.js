export function gearItems(state = [], action){
  switch(action.type){
    case "ADD_GEAR_ITEM":
      return [...state, action.gearItem];
    default:
      return state
  }
}

