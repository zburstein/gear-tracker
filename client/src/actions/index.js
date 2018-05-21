import {receivePacks, selectPack} from "./packActions"
import {initiated} from "./isInitiatedActions"
import axios from 'axios';
import {addAlert} from "./alertActions"



//initializer. gets all packs, current pack, categories, and gear items, and set all appropriate data
export function initializeAppData(){
  return function(dispatch){
    axios.get("http://localhost:3001/packs")
    .then((response) =>{
      //dispatch recieve packs and set current pack 
      dispatch(receivePacks(response.data));
      dispatch(selectPack(response.data.length > 0 ? response.data[0].id : null));
      dispatch(initiated());
    })
   .catch((err) => {
      dispatch(addAlert(err));
    })

    document.addEventListener('visibilitychange', function(){
      if(!document.hidden){
        dispatch(syncToServer());
      }
    })
  }
}

function syncToServer(){
  return function(dispatch, getState){
    //getpacks
    const state = getState();

    axios.get("http://localhost:3001/packs")
    .then((response) =>{
      //dispatch recieve packs and set current pack 
      dispatch(receivePacks(response.data));
      dispatch(selectPack(state.currentPackID || (response.data.length > 0) ? response.data[0].id : null));
    })
   .catch((err) => {
      dispatch(addAlert(err));
    })


  }
}