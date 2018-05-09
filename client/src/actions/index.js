import {receivePacks, selectPack} from "./packActions"
import axios from 'axios';



//initializer. gets all packs, current pack, categories, and gear items, and set all appropriate data
export function initializeAppData(){
  return function(dispatch){
    axios.get("https://fathomless-headland-84060.herokuapp.com/packs")
    .then((response) =>{
      //dispatch recieve packs and set current pack 
      dispatch(receivePacks(response.data));
      dispatch(selectPack(response.data[0].id));
    })
   .catch((err) => {
      console.log(err);
    })
  }
}