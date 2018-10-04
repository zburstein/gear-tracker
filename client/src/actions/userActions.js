export function setUser(user){
  return{
    type: "SET_USER",
    user
  }
}

export function updateAuth(response){
  return{
    type: "UPDATE_AUTH",
    client: response.headers["client"],
    "access-token": response.headers["access-token"]
  }
}