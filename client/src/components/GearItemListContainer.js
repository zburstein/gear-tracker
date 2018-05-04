import { connect } from 'react-redux';
import GearItemList from "./GearItemList";
import {editGearItem} from "../actions/gearItemActions"

const mapStateToProps = (state, ownProps) => {
  const gearItems = state.gearItems.filter(gearItem => gearItem.category_id === ownProps.categoryID)
  return{
    gearItems: gearItems,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    editGearItem: (gearItem, event) => dispatch(editGearItem(gearItem, event))

  }
}


const GearItemListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GearItemList)

export default GearItemListContainer
