import React  from 'react';
import UserFormContainer from "./UserFormContainer"


const Modal = ({modal, setVisibility}) => {

  return(
    <div>
      <button type="button" className="btn btn-primary" onClick={() => setVisibility(true)}>Login</button>

      {modal.visibility &&  
        <div className="devise-modal">
          <div className="devise-modal-content">
            <span className="close" onClick={() => setVisibility(false)}>&times;</span>
            <UserFormContainer/>
          </div>
        </div>
      }
    </div>
  );
}

export default Modal