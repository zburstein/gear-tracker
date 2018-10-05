import axios from 'axios';
import {setUser} from "./userActions"

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

export function clearForm(){
  return{
    type: "CLEAR_FORM"
  }
}

//submit for login
export function login(modal){
  return function(dispatch){
    axios.post(`/auth/sign_in`, {
        email: modal.email,
        password: modal.password
      
    })
    .then((response) => {
      console.log("successful login " + response);
      //set global header for axios
      //axios.defaults.headers.common["access-token"] = response.headers["access-token"];
      //axios.defaults.headers.common["token-type"] = response.headers["token-type"];
      //axios.defaults.headers.common["client"] =   response.headers["client"];
      //axios.defaults.headers.common["uid"] =   response.headers["uid"];
      dispatch(setUser({
        "access-token": response.headers["access-token"],
        "token-type": response.headers["token-type"],
        client: response.headers["client"],
        uid: response.headers["uid"],
        loggedIn: true
      }));
      dispatch(clearForm());
    })
    .catch((err) => {
    })
  }
}