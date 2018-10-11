import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions/userFormActions'


let LogoutButton = ({ dispatch }) => {
  return (
    <button type="button" onClick={() => dispatch(logout())} className="btn btn-primary">
      Logout
    </button>
  );

}

LogoutButton = connect()(LogoutButton)
export default LogoutButton