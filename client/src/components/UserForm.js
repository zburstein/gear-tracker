import React  from 'react';

function handleSubmit(event, login, userForm, register){
  event.preventDefault();
  userForm.session ? login(userForm) : register(userForm);
}

const UserForm = ({login, editForm, userForm, register, toggleFormMode}) => {
  return(
    <form onSubmit={(event) => handleSubmit(event, login, userForm, register)}>
      
      {!userForm.session && 
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input name="name" className="form-control" value={userForm.name} onChange={(event) => editForm(event)}/>
        </div>
      }

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input name="email" className="form-control" value={userForm.email} onChange={(event) => editForm(event)}/>
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input name="password" type="password" className="form-control" value={userForm.password} onChange={(event) => editForm(event)}/>
      </div>

      {!userForm.session && 
        <div className="form-group">   
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <input name="passwordConfirmation" type="password" className="form-control" value={userForm.passwordConfirmation} onChange={(event) => editForm(event)}/>
        </div>
      }
      <button className="btn btn-primary" type="submit">{userForm.session ? "Login" : "Sign Up"}</button>
      <div>
        <span className="clickable" onClick={() => toggleFormMode()}>{userForm.session ? "Signup here" : "Log in"}</span> 
      </div>
    </form>
  )
}

export default UserForm
