import { connect } from 'react-redux';
import {editForm, login} from "../actions/sessionFormActions"
import SessionForm from "./SessionForm"


const mapStateToProps = state => {
  return{
    sessionForm: state.sessionForm
  }
}

const mapDispatchToProps = dispatch => {
  return{
    editForm: (event) => dispatch(editForm(event)),
    login: (form) => dispatch(login(form))
  }
}

const UserFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm)

export default UserFormContainer