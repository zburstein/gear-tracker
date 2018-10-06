import {setPacks, selectPack, getPacks} from "./packActions"
import {initiated} from "./isInitiatedActions"
import axios from 'axios';
import {addAlert} from "./alertActions"
import {errorMessages} from "../errorMessages"
import {validate, setUser} from "./userActions"




//initializer. gets all packs, current pack, categories, and gear items, and set all appropriate data
export function initializeAppData(){
  return function(dispatch){
    //first pull user from local
    var user = JSON.parse(localStorage.getItem("user"));

    //what if null? 

    //then validate to ensure token has not expired
    //dispatch(validate(user)); //need a promise on this to know what to do if its wrong. wrapping in conditional does not work
    //if cant return value from the above set user logged in value based on the validate. need a promise to hold though
    dispatch(validate(user));
    Promise.all([
      dispatch(validate(user))
    ]).then(() => {
      //alert("done");
    })
    alert("after");


    dispatch(setUser(user));


    //then can get pack

    dispatch(getPacks());

    document.addEventListener('visibilitychange', function(){
      if(!document.hidden){
        dispatch(syncToServer());
      }
    })
    
    dispatch(initiated());

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
      dispatch(addAlert(errorMessages(err)));
    })
  }
}