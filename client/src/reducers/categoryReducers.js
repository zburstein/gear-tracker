function categories(state = [], action){
  switch(action.type){
    case 'SET_CATEGORIES':
      return action.categories
    case "ADD_CATEGORY":
      return [...state, action.category];
    default:
      return state
  }
}

export {categories}