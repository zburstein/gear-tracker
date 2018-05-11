export function alert(state=null, action){
  switch(action.type){
    case 'ADD_ALERT':
      return action.alert;
    case "REMOVE_ALERT":
      return null;
    default:
      return state;
  }


}