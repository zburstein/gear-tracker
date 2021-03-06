import { connect } from 'react-redux';
import { createPack, selectPack, deletePack } from "../actions/packActions"
import PacksNav from "./PacksNav"


const mapStateToProps = state =>{
  return{
    packs: state.packs
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onAddPackClick: () => dispatch(createPack()),
    onPackSelect: (id) => dispatch(selectPack(id)),
    onPackDelete: (id) => dispatch(deletePack(id))
  }
}


const PackList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PacksNav)

export default PackList