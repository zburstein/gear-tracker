import Pack from "../components/Pack"
import axios from 'axios';

//add packs to store
export function addPack(pack){
  return{
    type: 'ADD_PACK',
    pack
  }
}

//sets current pack in store
export function selectPack(id){
  return{
    type: 'SELECT_CURRENT_PACK',
    id
  }
}

//sets packs in store
export function receivePacks(packs){
  return{
    type: "RECEIVE_PACKS",
    packs
  }
}

//removes pack from store
function removePack(id){
  return{
    type: "REMOVE_PACK",
    id
  }

}

//initializer. gets all packs from server
export function getPacks(){
  return function(dispatch){
    axios.get("http://localhost:3001/packs")
    .then((response) =>{
      //dispatch load packs
      dispatch(receivePacks(response.data));
    })
   .catch((err) => {
      console.log(err);
    })
  }
}

//makes api call to create on server then dispatches addPack with the response
export function createPack(){
  return function(dispatch){
    axios.post("http://localhost:3001/packs", {
      pack: {name: "New Pack"}
    })
    .then((response) => {
      dispatch(addPack(response.data));
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

//makes api call to destroy on server and then dispatches removePack
export function deletePack(id){
  return function(dispatch){
    axios.delete(`http://localhost:3001/packs/${id}`)
    .then((response) => {
      dispatch(removePack(id));
    })
    .catch((err) => {
      console.log(err);
    })
  }
}