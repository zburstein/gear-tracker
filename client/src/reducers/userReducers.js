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
    case "SET_UPDATED_AUTH":
      return (update(state, {"access-token": {$set: action["access-token"]}}))
    default:
      return state
  }
}
export {user}