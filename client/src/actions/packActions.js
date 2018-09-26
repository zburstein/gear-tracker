import axios from 'axios';
import {setCategories, createCategory} from "./categoryActions"
import {setGearItems} from "./gearItemActions"
import {addAlert} from "./alertActions"

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

export function editPack(id, event){
  return{
    type: 'EDIT_PACK',
    id: id,
    targetName: event.target.name,
    value: event.target.value
  }
}

export function adjustPackWeight(id, weightChange){
  return{
    type: 'ADJUST_PACK_WEIGHT',
    id,
    weightChange
  }
}


//get oack and associated objects
export function getPack(id){
  return function(dispatch){
    //if null, no pack selected so pass empty categories and gear items
    if(id === null){
      dispatch(setCategories([]));
      dispatch(setGearItems([]));
    }
    else{
      axios.get(`/packs/${id}`)
      .then((response) => {
        dispatch(setCategories(response.data.categories));
        dispatch(setGearItems(response.data.gear_items));
      })
      .catch((err) => {
        dispatch(addAlert(err));
      })
    }

  }
}

//makes api call to create on server then dispatches addPack with the response
export function createPack(){
  return function(dispatch){
    axios.post(`/packs`)
    .then((response) => {
      //add pack to state and then select it
      dispatch(addPack(response.data));
      dispatch(selectPack(response.data.id));

      //create category
      dispatch(createCategory(response.data.id));
    })
    .catch((err) => {
      dispatch(addAlert(err));
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
      dispatch(addAlert(err));
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
      dispatch(addAlert(err));
    })
  }
}

//set current pack and pull it and associated objects from db
export function selectPack(id){
  return function(dispatch){
    dispatch(setCurrentPack(id));
    dispatch(getPack(id));
  }
}