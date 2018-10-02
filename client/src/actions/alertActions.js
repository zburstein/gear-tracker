export function addAlert(errors){
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