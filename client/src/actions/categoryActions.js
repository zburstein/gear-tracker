import axios from 'axios';
import {createGearItem} from "./gearItemActions"

//TODO merge addCategory and setCategories? 
export function addCategory(category){
  return{
    type: 'ADD_CATEGORY',
    category
  }
}
export function setCategories(categories){
  return{
    type: 'SET_CATEGORIES',
    categories
  }
}

export function editCategory(id, event){
  return{
    type: 'EDIT_CATEGORY',
    id: id,
    targetName: event.target.name,
    value: event.target.value
  }
}

export function adjustCategoryWeight(id, weightChange){
  return{
    type: 'ADJUST_CATEGORY_WEIGHT',
    id,
    weightChange
  }
}

function removeCategory(id){
  return{
    type: 'REMOVE_CATEGORY',
    id
  }
}

export function createCategory(packID){
  return function(dispatch){
    axios.post("http://localhost:3001/categories", {
      category: {name: "New Category", pack_id: packID}
    })
    .then((response) => {
      dispatch(addCategory(response.data));
      dispatch(createGearItem(response.data.id))
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

export function updateCategory(category){
  return function(dispatch){
    axios.put(`http://localhost:3001/categories/${category.id}`, {
      category: category
    })
    .then((response) => {
      //do nothing?
    })
    .catch((err) => {
      console.log(err);
    })
  }
}


export function deleteCategory(id){
  return function(dispatch){
    axios.delete(`http://localhost:3001/categories/${id}`)
    .then((response) => {
      dispatch(removeCategory(id));
    })
    .catch((err) => {
      console.log(err);
    })
  }
}