import update from 'immutability-helper';

const initialState = {
  email: "",
  password: ""
};

function sessionForm(state = initialState, action){
  switch(action.type){
    case "EDIT_FORM":
      return update(state, {[action.targetName]: {$set: action.value}})
    case "CLEAR_FORM":
      return initialState
    default:
      return state
  }
}
export {sessionForm}