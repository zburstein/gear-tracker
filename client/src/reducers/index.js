import { combineReducers } from 'redux'
import {packs, currentPackID} from "./packReducers"
import {categories} from "./categoryReducers"
import {gearItems} from "./gearItemReducers"
import {isInitiated} from "./isInitiatedReducer"
import {alert} from "./alertReducers"
import {modal} from "./modalReducers"
import {user} from "./userReducers"
import {sessionForm} from "./sessionFormReducers"


const rootReducer = combineReducers({
  packs,
  currentPackID,
  categories,
  gearItems,
  isInitiated,
  alert,
  modal,
  sessionForm,
  user
});

export default rootReducer