export function gearItems(state = [], action){
  switch(action.type){
    case 'SET_GEAR_ITEMS':
      return gearItems
    case "ADD_GEAR_ITEM":
      return [...state, action.gearItem];
    default:
      return state
  }
}

