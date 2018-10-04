import axios from 'axios';
import {setCategories} from "./categoryActions"
import {setGearItems} from "./gearItemActions"
import {addAlert} from "./alertActions"
import {errorMessages} from "../errorMessages"
import {updateAuth} from "./userActions"

//add packs to store
export function addPack(pack){
  return{
    type: 'ADD_PACK',
    pack
  }
}

//sets current pack in store
export function setCurrentPack(id){
  return{
    type: 'SELECT_CURRENT_PACK',
    id
  }
}

//sets packs in store
export function setPacks(packs){
  return{
    type: "SET_PACKS",
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

//edits pack on local 
export function editPack(id, event){
  return{
    type: 'EDIT_PACK',
    id: id,
    targetName: event.target.name,
    value: event.target.value
  }
}

//adjusts pack weight on local state by given amount
export function adjustPackWeight(id, weightChange){
  return{
    type: 'ADJUST_PACK_WEIGHT',
    id,
    weightChange
  }
}


//get pack and associated objects from server and set it locally
export function getPack(id){
  return function(dispatch){
    axios.get(`/packs/${id}`)
    .then((response) => {
      dispatch(setCategories(response.data.categories));
      dispatch(setGearItems(response.data.gear_items));
      dispatch(updateAuth(response));
    })
    .catch((err) => {
      dispatch(addAlert(errorMessages(err)));
    })
  }
}

//makes api call to create on server then dispatches addPack with the response
export function createPack(){
  return function(dispatch){
    axios.post(`/packs`)
    .then((response) => {
      //add pack to state, set it as current, and set its associated
      dispatch(addPack(response.data.pack));
      dispatch(setCurrentPack(response.data.pack.id));
      dispatch(setCategories(response.data.categories));
      dispatch(setGearItems(response.data.gear_items));
    })
    .catch((err) => {
      dispatch(addAlert(errorMessages(err)));
    })
  }
}

export function updatePack(pack){
  console.log("submitted");
  return function(dispatch){
    axios.put(`/packs/${pack.id}`, {
      pack: pack
    })
    .then((response) => {
      //do anything to update?
    })
    .catch((err) => {
      dispatch(addAlert(errorMessages(err)));
    })
  }
}

//makes api call to destroy on server and then dispatches removePack
export function deletePack(id){
  return function(dispatch, getState){
    axios.delete(`/packs/${id}`)
    .then((response) => {
      //get state
      const state = getState();

      //if current pack being deleted, then need to select new pack
      if(state.currentPackID === id){
        var newPackID;

        //if it is the last in the list, then select the previous one, else select the next
        const deleteIndex = state.packs.map(x => x.id).indexOf(id); //get index

        //////this block is new
        if(deleteIndex === 0 && state.packs.length === 1){
          newPackID = null;
        }
        else{
          newPackID = (deleteIndex === state.packs.length - 1) ? state.packs[deleteIndex - 1].id : state.packs[deleteIndex + 1].id;
        }

        dispatch(selectPack(newPackID));
      }
      //and remove the old one
      dispatch(removePack(id));


    })
    .catch((err) => {
      dispatch(addAlert([err.message]));
    })
  }
}

//set current pack and pull it and associated objects from db
export function selectPack(id){
  return function(dispatch){
    dispatch(setCurrentPack(id));

    //if no packs then id will be null and need to set empy categories and gear items
    if(id === null){
      dispatch(setCategories([]));
      dispatch(setGearItems([]));
    }
    else{
      dispatch(getPack(id));
    }
    
  }
}