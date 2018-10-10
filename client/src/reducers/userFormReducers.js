import update from 'immutability-helper';

const initialState = {
  email: "",
  password: "",
  name: "",
  session: true,
  passwordConfirmation: ""
};

function userForm(state = initialState, action){
  switch(action.type){
    case "EDIT_FORM":
      return update(state, {[action.targetName]: {$set: action.value}})
    case "CLEAR_FORM":
      return initialState
    case "TOGGLE_FORM_MODE":
      return update(state, {session: {$apply: function(x) {return !x;}}})
    default:
      return state
  }
}
export {userForm}