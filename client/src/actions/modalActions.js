import axios from 'axios';

//set whether the modal is visible or not
export function setVisibility(visibility){
  return{
    type: 'SET_VISIBILITY',
    visibility
  }
}
//edit modal
export function editModal(event){
  return{
    type: 'EDIT_MODAL',
    targetName: event.target.name,
    value: event.target.value
  }
}
//submit for login
export function login(modal){
  return function(dispatch){
    debugger;
    axios.post(`/users/sign_in`, {
      user: {
        email: modal.email,
        password: modal.password
      }
    })
    .then((response) => {
      debugger;
    })
    .catch((err) => {
      debugger;
    })
  }
}