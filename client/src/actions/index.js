import {setPacks, selectPack, getPacks} from "./packActions"
import {initiated} from "./isInitiatedActions"
import axios from 'axios';
import {addAlert} from "./alertActions"
import {errorMessages} from "../errorMessages"
import {validate, setUser} from "./userActions"


//initializer. gets all packs, current pack, categories, and gear items, and set all appropriate data
export function initializeAppData(){
  return function(dispatch, getState){
    //first pull user from local
    var user = JSON.parse(localStorage.getItem("user"));

    //what if null? 

    //check validation
    //if valid set user
    //if valid and user set, getPacks
    //after packs recieved, set initiated
   
   //then validate the user
    dispatch(validate(user)).then(() => {
      alert("finished validation");
      const state = getState();
      console.log(state.user)
      dispatch(getPacks());
      dispatch(initiated());

    })
    alert("tset");
    //after validate and associated funciton completes then can get packs
    
    //alert("getting packs")
    //dispatch(getPacks());

    
    //then can get pack

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
      dispatch(addAlert(errorMessages(err)));
    })
  }
}