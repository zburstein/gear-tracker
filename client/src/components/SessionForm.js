import React  from 'react';

function handleSubmit(event, login, sessionForm){
  event.preventDefault();
  login(sessionForm);
}

const SessionForm = ({login, editForm, sessionForm}) => {
  return(
    <form onSubmit={(event) => handleSubmit(event, login, sessionForm)}>
      <input name="email" placeholder="email" value={sessionForm.email} onChange={(event) => editForm(event)}/>
      <input name="password" type="password" placeholder="password" value={sessionForm.password} onChange={(event) => editForm(event)}/>
      <input class="btn btn-primary" type="submit" value="Submit"/>
    </form>
  )
}

export default SessionForm
