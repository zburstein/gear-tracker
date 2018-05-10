import { combineReducers } from 'redux'
import {packs, currentPackID} from "./packReducers"
import {categories} from "./categoryReducers"
import {gearItems} from "./gearItemReducers"
import {isInitiated} from "./isInitiatedReducer"

const rootReducer = combineReducers({
  packs,
  currentPackID,
  categories,
  gearItems,
  isInitiated
});

export default rootReducer