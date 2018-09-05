import convert from 'convert-units';
import {adjustPackWeight} from "./packActions";
import {adjustCategoryWeight} from "./categoryActions";
import axios from 'axios';
import {addAlert} from "./alertActions";



export function setGearItems(gearItems){
  return{
    type: 'SET_GEAR_ITEMS',
    gearItems
  }
}

export function createGearItem(categoryID){
  return function(dispatch){
    axios.post(`${process.env.REACT_APP_API_ROOT}/gear_items`,{
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

export function addGearItem(gearItem){
  return{
    type: 'ADD_GEAR_ITEM',
    gearItem
  }
}

function recieveEditedGearItem(id, event, newWeight){
  return{
    type: 'EDIT_GEAR_ITEM',
    id,
    targetName: event.target.name,
    value: event.target.value,
    weight_in_grams: newWeight
  }
}

export function updateGearItem(gearItem){
  return function(dispatch){
    axios.put(`${process.env.REACT_APP_API_ROOT}/gear_items/${gearItem.id}`,{
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

export function deleteGearItem(id){
  return function(dispatch){
    axios.delete(`${process.env.REACT_APP_API_ROOT}/gear_items/${id}`)
    .then((response) => {
      dispatch(removeGearItem(id));
    })
     .catch((err) => {
      dispatch(addAlert(err));
    });
  }
}

function removeGearItem(id){
  return{
    type: "REMOVE_GEAR_ITEM",
    id
  }
}

export function editGearItem(gearItem, event){
  return function(dispatch, getState){
    var newWeightInGrams, diff;


     //if it is display weight change the weight in grams 
    if(event.target.name === "display_weight"){
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

    //dispatch gear item changes
    dispatch(recieveEditedGearItem(gearItem.id, event, newWeightInGrams));

    //if the weight has changed then update the parents' weight
    if(diff !== 0){
      dispatch(adjustPackWeight(getState().currentPackID, diff)); //problem here with the id
      dispatch(adjustCategoryWeight(gearItem.category_id, diff));
    }
  }
}