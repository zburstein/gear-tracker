import axios from 'axios';
import {addGearItem} from "./gearItemActions"
import {addAlert} from "./alertActions"
import {adjustPackWeight} from "./packActions";


//TODO merge addCategory and setCategories? 
export function addCategory(category){
  return{
    type: 'ADD_CATEGORY',
    category
  }
}

//sets the categories
export function setCategories(categories){
  return{
    type: 'SET_CATEGORIES',
    categories
  }
}

//edit local category
export function editCategory(id, event){
  return{
    type: 'EDIT_CATEGORY',
    id: id,
    targetName: event.target.name,
    value: event.target.value
  }
}

//adjust category weight in grams by given amount
export function adjustCategoryWeight(id, weightChange){
  return{
    type: 'ADJUST_CATEGORY_WEIGHT',
    id,
    weightChange
  }
}

//remove category from state
function removeCategory(id){
  return{
    type: 'REMOVE_CATEGORY',
    id
  }
}


//create a category, add to state, and create a gear_item so user already has one available
export function createCategory(packID){
  return function(dispatch){
    axios.post(`/categories`, {
      category: {pack_id: packID}
    })
    .then((response) => {
      dispatch(addCategory(response.data.category));
      dispatch(addGearItem(response.data.gear_item));
    })
    .catch((err) => {
      dispatch(addAlert(err.response.data));
    })
  }
}

//call api to update category on server
export function updateCategory(category){
  return function(dispatch){
    axios.put(`/categories/${category.id}`, {
      category: category
    })
    .then((response) => {
      //do nothing?
    })
    .catch((err) => {
      dispatch(addAlert(err.response.data));

    })
  }
}

//call api to delete category on server. Dsipatch action to remove category from state and update weights
export function deleteCategory(category){
  return function(dispatch, getState){
    axios.delete(`/categories/${category.id}`)
    .then((response) => {
      dispatch(removeCategory(category.id));
      dispatch(adjustPackWeight(getState().currentPackID, -category.weight_in_grams));
    })
    .catch((err) => {
      dispatch(addAlert(err));
    })
  }
}