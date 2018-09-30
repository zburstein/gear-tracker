import {setPacks, selectPack} from "./packActions"
import {initiated} from "./isInitiatedActions"
import axios from 'axios';
import {addAlert} from "./alertActions"



//initializer. gets all packs, current pack, categories, and gear items, and set all appropriate data
export function initializeAppData(){
  return function(dispatch){
    axios.get(`/packs`)
    .then((response) =>{
      //dispatch recieve packs and set current pack 
      dispatch(setPacks(response.data));
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

    axios.get(`/packs`)
    .then((response) =>{

      var newCurrentPack;

      //if null either keep null or pull first pack in list if one may have been added in another context
      if(state.currentPackID === null){
        newCurrentPack = (response.data.length > 0) ? response.data[0].id : null;
      }
      //if existing one first check that it is present and then either get it or first in list
      else{
        newCurrentPack = response.data.filter(pack => (pack.id === state.currentPackID)).length > 0 ? state.currentPackID : response.data[0].id;
      }
      dispatch(selectPack(newCurrentPack));
      dispatch(setPacks(response.data));

    })
   .catch((err) => {
      dispatch(addAlert(err));
    })


  }
}