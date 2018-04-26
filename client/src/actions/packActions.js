import Pack from "../components/Pack"
import axios from 'axios';

export function addPack(pack){
  return{
    type: 'ADD_PACK',
    pack: new Pack()
  }
}

export function selectPack(id){
  return{
    type: 'SELECT_CURRENT_PACK',
    id
  }
}

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

export function receivePacks(packs){
  return{
    type: "RECEIVE_PACKS",
    packs
  }
}









function addCategory(category){
  return{
    type: 'ADD_CATEGORY',
    category
  }
}

function addGearItem(gearItem){
  return{
    type: 'ADD_GEAR_ITEM',
    gearItem
  }
}

