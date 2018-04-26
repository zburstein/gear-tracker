import Pack from "../components/Pack"
function packs(state = [], action){
  switch(action.type){
    case "ADD_PACK": 
      return [...state, action.pack];
    default: 
      return state.length ? [...state] : [new Pack(1, "PCT")]
  }
}

function currentPack(state = null, action){
  switch(action.type){
    case "SELECT_CURRENT_PACK": 
      return action.id;//copy of pack index, index, or id? I think index or id
    default:
      return["PCT"]
  }
}


export {packs, currentPack}





