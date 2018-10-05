import update from 'immutability-helper';

const initialState = {
    "access-token": "",
    "token-type": "",
    client: "",
    uid: "",
    loggedIn: false
}

function user(state = initialState, action){
  switch(action.type){
    case "SET_USER":
      return action.user
    default:
      return state
  }
}
export {user}