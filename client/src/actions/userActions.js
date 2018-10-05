import axios from 'axios';

export function setUser(user){
  return{
    type: "SET_USER",
    user
  }
}

export function updateAuth(response){
  console.log(response);
  axios.defaults.headers.common["access-token"] = response.headers["access-token"];
  axios.defaults.headers.common["token-type"] = response.headers["token-type"];
  return{
    type: "SET_UPDATED_AUTH",
    "access-token": response.headers["access-token"]
  }
}
