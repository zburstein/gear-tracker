import axios from 'axios';

export function setUser(user){
  localStorage.setItem("user", JSON.stringify(user)); //set locally for return
  //set global header for axios
  axios.defaults.headers.common["access-token"] = user["access-token"];
  axios.defaults.headers.common["token-type"] = user["token-type"];
  axios.defaults.headers.common["client"] =   user["client"];
  axios.defaults.headers.common["uid"] = user["uid"];
  return{
    type: "SET_USER",
    user
  }
}


export function validate(user){
  return function(dispatch){
    //return promise to control logic flow within the initator
    return new Promise(function(resolve, reject) {  
      //make api call to test validity of user 
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
        //if valid then set user. resolve does not finish until dispatch returns
        //kind of confused why initate action needs promise but this one does not
        dispatch(setUser(user));
        resolve(true);
      })
      .catch((err) => {
        //else do nothing and use deault user value
        resolve(false);
      })
    });
  }
}
