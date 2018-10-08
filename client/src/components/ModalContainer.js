import { connect } from 'react-redux';
import {setVisibility} from "../actions/modalActions"
import Modal from "./Modal";


const mapStateToProps = state => {
  return{
    modal: state.modal,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    setVisibility: (visibility) => dispatch(setVisibility(visibility)),
  }
}

const ModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal)

export default ModalContainer