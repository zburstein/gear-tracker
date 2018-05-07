import { combineReducers } from 'redux'
import {packs, currentPackID} from "./packReducers"
import {categories} from "./categoryReducers"
import {gearItems} from "./gearItemReducers"

const rootReducer = combineReducers({
  packs,
  currentPackID,
  categories,
  gearItems
});

export default rootReducer