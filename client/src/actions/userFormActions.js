import axios from 'axios';
import {setUser} from "./userActions"
import {setVisibility} from "./modalActions"



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

      dispatch(clearForm());
    })
    .catch((err) => {
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
      debugger;
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
      debugger
    })
  }
}