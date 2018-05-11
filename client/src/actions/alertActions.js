export function addAlert(err){
  //var message = err.response.code === 404 ? "Resource does not exist" : err.message;
  return{
    type: "ADD_ALERT",
    alert: {type: "danger", message: err.message}
  }
}

export function removeAlert(){
  return{
    type: "REMOVE_ALERT",
  }
}