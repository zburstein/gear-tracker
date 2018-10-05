import axios from 'axios';

export function setUser(user){
  return{
    type: "SET_USER",
    user
  }
}

export function setNewAuth(accessToken){
  return{
    type: "SET_UPDATED_AUTH",
    "access-token": accessToken
  }
}

export function updateAuth(response){
  return function(dispatch, getState){
    const state = getState();

    console.log("update auth ");
    console.log(response);
    if(response.headers["access-token"] === undefined || state.client != response.headers["client"]){
      alert("no action call");
      return;
    }
    else{
      dispatch(setNewAuth(response.headers["access-token"]));
    }
    //debugger;
    //axios.defaults.headers.common["access-token"] = response.headers["access-token"];
    //axios.defaults.headers.common["token-type"] = response.headers["token-type"];
  }
}

export function testValidate(user){
  return function(dispatch){

    axios.get("/auth/validate_token")
    .then((response) => {
      //add pack to state, set it as current, and set its associated
      debugger;
      dispatch(updateAuth(response))

    })
    .catch((err) => {
      debugger;
    })
  }
}
