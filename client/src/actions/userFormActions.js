import axios from 'axios';
import {setUser} from "./userActions"
import {getPacks} from "./packActions"
import {errorMessages} from "../errorMessages"
import {addAlert} from "./alertActions"




//edit modal
export function editForm(event){
  return{
    type: 'EDIT_FORM',
    targetName: event.target.name,
    value: event.target.value
  }
}

export function clearForm(){
  return{
    type: "CLEAR_FORM"
  }
}

export function toggleFormMode(){
  return{
    type: "TOGGLE_FORM_MODE"
  }
}

//submit for login
export function login(form){
  return function(dispatch){
    axios.post(`/auth/sign_in`, {
        email: form.email,
        password: form.password
      
    })
    .then((response) => {
      dispatch(setUser({
        "access-token": response.headers["access-token"],
        "token-type": response.headers["token-type"],
        client: response.headers["client"],
        uid: response.headers["uid"],
        loggedIn: true
      }));
      dispatch(getPacks());
      dispatch(clearForm());
    })
    .catch((err) => {
      dispatch(addAlert(err.response.data.errors));
    })
  }
}

export function register(form){
  return function(dispatch){
    axios.post('/auth', {
      email: form.email,
      password: form.password,
      password_confitmation: form.passwordConfitmation
    })
    .then((response) => {
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

      dispatch(addAlert(err.response.data.errors.full_messages));
    })
  }
}

export function logout(){
  return function(dispatch){
    axios.delete('/auth/sign_out')
    .then((response) => {
      //set user to initial state which is empty and logged out
      dispatch(setUser());

      //clear user from local storage
      localStorage.removeItem("user");
    })
    .catch((err) => {
      dispatch(addAlert(err.response.data.errors));
    })
  }
}