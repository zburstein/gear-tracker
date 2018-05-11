import React  from 'react';


const Alert = (props) => {
  return(
    <div class={"alert alert-" + props.alert.type} role="alert">
      {props.alert.message}
    <button type="button" class="close" aria-label="Close" onClick={() => props.removeAlert()}>
      <span aria-hidden="true">&times;</span>
    </button>
    </div>

  );
}

export default Alert