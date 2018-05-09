import { connect } from 'react-redux';
import PackTotals from './PackTotals';
import {editPack, updatePack} from "../actions/packActions";

const mapStateToProps = state => {
  const pack = state.packs.find(pack => pack.id === state.currentPackID);
  return{
    pack: pack
  }
}


const mapDispatchToProps = dispatch => {
  return{
    editPack: (packID, event) => dispatch(editPack(packID, event)),
    updatePack: (pack) => dispatch(updatePack(pack))
  }
}


const PackTotalsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PackTotals)

export default PackTotalsContainer