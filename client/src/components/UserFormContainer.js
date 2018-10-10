import { connect } from 'react-redux';
import {editForm, login, register, toggleFormMode} from "../actions/userFormActions"
import UserForm from "./UserForm"


const mapStateToProps = state => {
  return{
    userForm: state.userForm
  }
}

const mapDispatchToProps = dispatch => {
  return{
    editForm: (event) => dispatch(editForm(event)),
    login: (form) => dispatch(login(form)),
    register: (form) => dispatch(register(form)),
    toggleFormMode: () => dispatch(toggleFormMode())
  }
}

const UserFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm)

export default UserFormContainer