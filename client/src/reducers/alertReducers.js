export function alert(state=null, action){
  switch(action.type){
    case 'ADD_ALERT':
      return action.alert;
    default:
      return state
  }


}