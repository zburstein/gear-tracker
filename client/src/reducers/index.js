import { combineReducers } from 'redux'
import {packs, currentPack} from "./packReducers"
import {categories} from "./categoryReducers"

const rootReducer = combineReducers({
  packs,
  currentPack,
  categories
});

export default rootReducer