import update from 'immutability-helper';

function user(state = {}, action){
  switch(action.type){
    case "SET_USER":
      return action.user
    case "UPDATE_AUTH":
      return (update(state, {
        client: {$set: action.client},
        "access-token": {$set: action["access-token"]}
      }))
    default:
      return state
  }
}
export {user}