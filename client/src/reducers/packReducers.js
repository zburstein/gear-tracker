import Pack from "../components/Pack"
function packs(state = [], action){
  switch(action.type){
    case "ADD_PACK": 
      return [...state, action.pack];
    case "RECEIVE_PACKS":
      return action.packs;
    case "REMOVE_PACK": 
      return state.filter(pack => pack.id !== action.id);
    default: 
      return state;
  }
}

function currentPack(state = null, action){
  switch(action.type){
    case "SELECT_CURRENT_PACK": 
      return action.id;
    default:
      return state;
  }
}


export {packs, currentPack}





