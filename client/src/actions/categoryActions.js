import axios from 'axios';


export function addCategory(category){
  return{
    type: 'ADD_CATEGORY',
    category
  }
}

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