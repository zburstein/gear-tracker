import update from 'immutability-helper';

const initialState = {
  visibility: false,
  email: "",
  password: ""
};

function modal(state = initialState, action){
  switch(action.type){
    case 'SET_VISIBILITY':
      return update(state, {visibility: {$set: action.visibility}})
    case "EDIT_MODAL":
      return update(state, {[action.targetName]: {$set: action.value}})
    default:
      return state
  }
}
export {modal}