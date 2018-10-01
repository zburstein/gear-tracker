export function addAlert(errors){
  //var message = err.response.code === 404 ? "Resource does not exist" : err.message;
  return{
    type: "ADD_ALERT",
    alert: {type: "danger", messages: errors}
  }
}

export function removeAlert(){
  return{
    type: "REMOVE_ALERT",
  }
}