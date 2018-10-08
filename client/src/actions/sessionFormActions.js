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