import React  from 'react';

function handleSubmit(event, login, userForm, register){
  event.preventDefault();
  userForm.session ? login(userForm) : register(userForm);
}

const UserForm = ({login, editForm, userForm, register, toggleFormMode}) => {
  return(
    <form onSubmit={(event) => handleSubmit(event, login, userForm, register)}>
      {!userForm.session && <input name="name" placeholder="name" value={userForm.name} onChange={(event) => editForm(event)}/>}
      <input name="email" placeholder="email" value={userForm.email} onChange={(event) => editForm(event)}/>
      <input name="password" type="password" placeholder="password" value={userForm.password} onChange={(event) => editForm(event)}/>
      {!userForm.session && <input name="password_confirmation" type="password" placeholder="password confirmation" value={userForm.password} onChange={(event) => editForm(event)}/>}
      <button className="btn btn-primary" type="submit">{userForm.session ? "Login" : "Sign Up"}</button>
      <div>
        <span onClick={() => toggleFormMode()}>{userForm.session ? "Signup here" : "Log in"}</span> 

      </div>
    </form>
  )
}

export default UserForm
