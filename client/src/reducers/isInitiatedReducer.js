function isInitiated(state = false, action){
  switch(action.type){
    case 'INITIATED':
      return action.isInitiated;
    default:
      return state
  }
}

export {isInitiated}