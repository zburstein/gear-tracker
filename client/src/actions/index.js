import {setPacks, selectPack, getPacks} from "./packActions"
import {initiated} from "./isInitiatedActions"
import axios from 'axios';
import {addAlert} from "./alertActions"
import {errorMessages} from "../errorMessages"
import {validate} from "./userActions"


//initializer. tests user and gets data
export function initializeAppData(){
  return function(dispatch, getState){
    //first pull user from local
    var user = JSON.parse(localStorage.getItem("user"));

    //if there is a user test to see if its valid
    if(user){
      //validate, which sets user if valid. uses promise to control logic flow
      dispatch(validate(user)).then((result) => {
        result && dispatch(getPacks()); //if valid then get packs, otherwise do not
        dispatch(initiated());
      });
    }
    else{
      dispatch(initiated());
    }

    //add event listener to sync to server on context change and return
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
      if(response.data.length === 0){
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
      dispatch(addAlert(errorMessages(err)));
    })
  }
}