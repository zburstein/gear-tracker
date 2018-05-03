import { connect } from 'react-redux';
import GearItemList from "./GearItemList"

const mapStateToProps = (state, ownProps) => {
  const gearItems = state.gearItems.filter(gearItem => gearItem.category_id === ownProps.categoryID)
  return{
    gearItems: gearItems,
  }
}

const mapDispatchToProps = dispatch => {
  return{
  
  }
}


const GearItemListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GearItemList)

export default GearItemListContainer
