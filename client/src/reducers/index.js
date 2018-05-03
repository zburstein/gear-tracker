import { combineReducers } from 'redux'
import {packs, currentPack} from "./packReducers"
import {categories} from "./categoryReducers"
import {gearItems} from "./gearItemReducers"

const rootReducer = combineReducers({
  packs,
  currentPack,
  categories,
  gearItems
});

export default rootReducer