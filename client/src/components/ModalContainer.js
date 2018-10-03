import { connect } from 'react-redux';
import {setVisibility, editModal, login} from "../actions/modalActions"
import Modal from "./Modal";


const mapStateToProps = state => {
  return{
    modal: state.modal
  }
}

const mapDispatchToProps = dispatch => {
  return{
    setVisibility: (visibility) => dispatch(setVisibility(visibility)),
    editModal: (event) => dispatch(editModal(event)),
    login: (modal) => dispatch(login(modal))
  }
}

const ModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal)

export default ModalContainer