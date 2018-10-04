import { combineReducers } from 'redux'
import {packs, currentPackID} from "./packReducers"
import {categories} from "./categoryReducers"
import {gearItems} from "./gearItemReducers"
import {isInitiated} from "./isInitiatedReducer"
import {alert} from "./alertReducers"
import {modal} from "./modalReducers"
import {user} from "./userReducers"


const rootReducer = combineReducers({
  packs,
  currentPackID,
  categories,
  gearItems,
  isInitiated,
  alert,
  modal,
  user
});

export default rootReducer