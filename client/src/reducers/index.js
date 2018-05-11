import { combineReducers } from 'redux'
import {packs, currentPackID} from "./packReducers"
import {categories} from "./categoryReducers"
import {gearItems} from "./gearItemReducers"
import {isInitiated} from "./isInitiatedReducer"
import {alert} from "./alertreducers.js"

const rootReducer = combineReducers({
  packs,
  currentPackID,
  categories,
  gearItems,
  isInitiated,
  alert
});

export default rootReducer