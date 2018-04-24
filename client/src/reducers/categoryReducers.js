function categories(state = [], action){
  switch(action.type){
    case "ADD_CATEGORY":
      return [...state, action.category];
    default:
      return ["cat test"]
  }
}

export {categories}