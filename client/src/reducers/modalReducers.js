import update from 'immutability-helper';

const initialState = {
  visibility: false,
};

function modal(state = initialState, action){
  switch(action.type){
    case 'SET_VISIBILITY':
      return update(state, {visibility: {$set: action.visibility}})
    default:
      return state
  }
}
export {modal}