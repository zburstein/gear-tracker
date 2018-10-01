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
    const state = getState();

    //get packs
    axios.get(`/packs`)
    .then((response) =>{

      var newCurrentPack;

      //if all the packs have been deleted then set it to null
      if(response.data.length == 0){
        newCurrentPack = null;
      }
      else{
        //checks presence of current id in packs. keeps it as current if present else uses first pack
        newCurrentPack = response.data.filter(pack => (pack.id === state.currentPackID)).length > 0 ?
          state.currentPackID : 
          response.data[0].id;
      }

      //select the pack which will update its data and then set packs
      //set packs must come after in event id is null or else causes errors
      dispatch(selectPack(newCurrentPack));
      dispatch(setPacks(response.data));

    })
   .catch((err) => {
      dispatch(addAlert(err));
    })
  }
}