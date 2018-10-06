import axios from 'axios';


export function test(user){
  return function(dispatch){
    return new Promise(function(resolve, reject) {
      dispatch(setUser(user));
      resolve();
    })
  }
}


export function setUser(user){
  localStorage.setItem("user", JSON.stringify(user)); //set locally for return
  //set global header for axios
  axios.defaults.headers.common["access-token"] = user["access-token"];
  axios.defaults.headers.common["token-type"] = user["token-type"];
  axios.defaults.headers.common["client"] =   user["client"];
  axios.defaults.headers.common["uid"] =   user["uid"];
  alert("setting user");

  return{
    type: "SET_USER",
    user
  }
}


export function validate(user){
  return function(dispatch){
    return new Promise(function(resolve, reject) {
   
    
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
      //if valid then set user
      var x = 0;
      while(x < 5000){
        x++;
      }
      //alert("after loop");
      dispatch(test(user)).then(() => {
        alert("in set user resturn")
      });
    })
    .catch((err) => {
      //else do nothing and use deault user value
    })
    alert("end of validation");
    resolve();
    });
  }
}
