import React  from 'react';


const Alert = (props) => {
  return(
    <div className={"alert alert-" + props.alert.type} role="alert">
      {props.alert.messages.shift()}
    <button type="button" className="close" aria-label="Close" onClick={() => props.removeAlert()}>
      <span aria-hidden="true">&times;</span>
    </button>
    <ul>
      {props.alert.messages.map((message, index) => (
        <li key={index}>{message}</li>
      ))}
    </ul>
    </div>

  );
}

export default Alert