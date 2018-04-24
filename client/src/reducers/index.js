import { combineReducers } from 'redux'
import {packs} from "./packReducers"
import {categories} from "./categoryReducers"

const rootReducer = combineReducers({
  packs,
  categories
});

export default rootReducer