import axios from 'axios';


export function addCategory(category){
  return{
    type: 'ADD_CATEGORY',
    category
  }
}

/*
export function getCategories(packID){
  return function(dispatch){
    axios.get(`http://localhost:3001/pack/${packID}/categories`, {
      id: packID
    })
    .then((response) => {
      dispatch
    })
  }
}
*/


export function createCategory(packID){
  return function(dispatch){
    axios.post("http://localhost:3001/categories", {
      category: {name: "New Category", pack_id: packID}
    })
    .then((response) => {
      dispatch(addCategory(response.data))
    })
    .catch((err) => {
      console.log(err);
    })
  }
}