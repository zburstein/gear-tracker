function packs(state = [], action){
  switch(action.type){
    case "ADD_PACK": 
      return [...state, action.pack];
    default: 
      return ["PCT"]
  }
}


export {packs}





