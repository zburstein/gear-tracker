import convert from 'convert-units';
import {adjustPackWeight} from "./packActions";
import {adjustCategoryWeight} from "./categoryActions";


export function setGearItems(gearItems){
  return{
    type: 'SET_GEAR_ITEMS',
    gearItems
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

export function editGearItem(gearItem, event){
  return function(dispatch, getState){
    var newWeightInGrams, diff;


     //if it is display weight I need to change the weight in grams and parents
    if(event.target.name === "display_weight"){
      newWeightInGrams = gearItem.display_metric === "g" ? (event.target.value || 0) : (convert(event.target.value).from(gearItem.display_metric).to("g") || 0);
    }

    //if it is the display metric I need to change weight in grams and parents
    if(event.target.name === "display_metric"){
      newWeightInGrams = convert(gearItem.display_weight).from(event.target.value).to("g");
    }

    //if it is quantity I need to change parents weights 
    if(event.target.name === "quantity"){
      var quantDiff = event.target.value - gearItem.quantity;
      diff = quantDiff * gearItem.weight_in_grams;
    }

    if(newWeightInGrams === null) newWeightInGrams = gearItem.weight_in_grams; //set it if it has not changed to what it was before
    diff = diff || (newWeightInGrams - gearItem.weight_in_grams); //get the diff

    //dispatch gear item changes
    dispatch(recieveEditedGearItem(gearItem.id, event, newWeightInGrams));

    if(diff !== 0){
      dispatch(adjustPackWeight(getState().currentPack, diff)); //problem here with the id
      dispatch(adjustCategoryWeight(gearItem.category_id, diff));
    }


    //see if you can combine calls. Need some changes to things but I think you can synchronously call dispatches here
    //first distpatch should be the item edit.
    //then do the conditionals to update parents
    //do i want to seperate the weight edit with standard gear item edit? maybe dispatch different actions depending on whether it needs to change or noot?

    //change the value itself
  }
}