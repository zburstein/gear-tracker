import axios from 'axios';


export function setUser(user){
  alert("setting user");
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
  return function(dispatch){
    axios.get("/auth/validate_token", 
      {
        params: {
          "access-token": user["access-token"],
          uid: user["uid"],
          client: user["client"]
        }
      }
    )
    .then((response) => {
      return true;
    })
    .catch((err) => {
      return false;
    })
    var x = 0;
    while(x < 1000){
      x++;
    }
    alert("finished validation");
  }
}
