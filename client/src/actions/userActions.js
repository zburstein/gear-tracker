import axios from 'axios';


export function setUser(user){
  localStorage.setItem("user", JSON.stringify(user)); //set locally for return
  //set global header for axios
  axios.defaults.headers.common["access-token"] = user["access-token"];
  axios.defaults.headers.common["token-type"] = user["token-type"];
  axios.defaults.headers.common["client"] =   user["client"];
  axios.defaults.headers.common["uid"] =   user["uid"];
  return{
    type: "SET_USER",
    user
  }
}

export function validate(user){
  debugger
  return function(dispatch){
    axios.get("/auth/validate_token", {params: {user}})
    .then((response) => {
      debugger;

    })
    .catch((err) => {
      debugger;

    })
  }
}
