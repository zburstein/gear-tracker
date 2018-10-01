import convert from 'convert-units';
import {adjustPackWeight} from "./packActions";
import {adjustCategoryWeight} from "./categoryActions";
import axios from 'axios';
import {addAlert} from "./alertActions";


//sets gear items in state
export function setGearItems(gearItems){
  return{
    type: 'SET_GEAR_ITEMS',
    gearItems
  }
}

//add gear item to local state. called after create
export function addGearItem(gearItem){
  return{
    type: 'ADD_GEAR_ITEM',
    gearItem
  }
}

//remove gear item from local state
function removeGearItem(id){
  return{
    type: "REMOVE_GEAR_ITEM",
    id
  }
}

//change edited gear item in local state
function recieveEditedGearItem(id, event, newWeight){
  return{
    type: 'EDIT_GEAR_ITEM',
    id,
    targetName: event.target.name,
    value: event.target.value,
    weight_in_grams: newWeight
  }
}

//create gear item on server and dispatch add action
export function createGearItem(categoryID){
  return function(dispatch){
    axios.post(`/gear_items`,{
      gear_item: {category_id: categoryID}
    })
    .then((response) => {
      dispatch(addGearItem(response.data));
    })
     .catch((err) => {
      dispatch(addAlert(err));
    });
  }
}

//update gear item on server. Called on blur event
export function updateGearItem(gearItem){
  return function(dispatch){
    axios.put(`/gear_items/${gearItem.id}`,{
      gear_item: gearItem
    })
     .then((response) => {
      //do nothing?
     })
     .catch((err) => {
      dispatch(addAlert(err));
    });
  }
}

//delete gear item from server, then dispatch actions to remove from state and adjust pack and category weights
export function deleteGearItem(gearItem){
  return function(dispatch, getState){
    axios.delete(`/gear_items/${gearItem.id}`)
    .then((response) => {
      dispatch(removeGearItem(gearItem.id));

      var diff = -(gearItem.weight_in_grams * gearItem.quantity);

      dispatch(adjustCategoryWeight(gearItem.category_id, diff));
      dispatch(adjustPackWeight(getState().currentPackID, diff));
    })
     .catch((err) => {
      dispatch(addAlert(err));
    });
  }
}


//edit gear item on local state that also reflect weight changes in category and pack with respective actions
//***does not update server values*** that is done on blur actions in update gear item//
//has some redundancy with server in terms of calculating changes on associated object but makes things more immediate and smoother on client
export function editGearItem(gearItem, event){
  return function(dispatch, getState){
    var newWeightInGrams, diff;


     //if it is display weight change the weight in grams 
    if(event.target.name === "display_weight"){
      //reject negative values
      if(parseFloat(event.target.value) < 0){
        alert("Invalid: weight can not be negative");
        return;
      }
      newWeightInGrams = gearItem.display_metric === "g" ? (event.target.value || 0) : (convert(event.target.value).from(gearItem.display_metric).to("g") || 0);
    }

    //if it is the display metric need to change weight in grams
    if(event.target.name === "display_metric"){
      newWeightInGrams = convert(gearItem.display_weight).from(event.target.value).to("g"); 
    }

    //if it is quantity I need to change parents weights 
    if(event.target.name === "quantity"){
      if(event.target.value % 1 !== 0 || parseFloat(event.target.value) < 0){
        alert("Invalid: quantity can not be negative or decimal");
        return;
      }
      var quantDiff = event.target.value - gearItem.quantity;
      diff = quantDiff * gearItem.weight_in_grams;
    }

    if(newWeightInGrams === null || newWeightInGrams === undefined) newWeightInGrams = gearItem.weight_in_grams; //set it if it has not changed to what it was before
    diff = diff || (newWeightInGrams - gearItem.weight_in_grams) * gearItem.quantity; //get the diff

    //dispatch gear item changes on local state
    dispatch(recieveEditedGearItem(gearItem.id, event, newWeightInGrams));

    //if the weight has changed then update the parents' weight
    if(diff !== 0){
      dispatch(adjustPackWeight(getState().currentPackID, diff)); //problem here with the id
      dispatch(adjustCategoryWeight(gearItem.category_id, diff));
    }
  }
}