import { connect } from 'react-redux';
import GearItemList from "./GearItemList";
import {editGearItem, updateGearItem, deleteGearItem} from "../actions/gearItemActions"

const mapStateToProps = (state, ownProps) => {
  const gearItems = state.gearItems.filter(gearItem => gearItem.category_id === ownProps.categoryID)
  return{
    gearItems: gearItems,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    editGearItem: (gearItem, event) => dispatch(editGearItem(gearItem, event)),
    updateGearItem: (gearItem) => dispatch(updateGearItem(gearItem)),
    deleteGearItem: (id) => dispatch(deleteGearItem(id))
  }
}


const GearItemListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GearItemList)

export default GearItemListContainer
