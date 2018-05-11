import React  from 'react';


const Alert = (props) => {
  return(
    <div class={"alert alert-" + props.alert.type} role="alert">
      {props.alert.message}
    </div>

  );
}

export default Alert