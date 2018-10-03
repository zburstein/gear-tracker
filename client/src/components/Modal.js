import React  from 'react';


const Modal = ({modal, setVisibility, editModal, login}) => {

  return(
    <div>
      <button type="button" className="btn btn-primary" onClick={() => setVisibility(true)}>Open modal</button>

      {modal.visibility &&  
        <form onSubmit={() => login(modal)}>
          <div className="devise-modal">
            <div className="devise-modal-content">
              <span className="close" onClick={() => setVisibility(false)}>&times;</span>
              <p>Some text in the Modal..</p>
              <input name="email" placeholder="email" value={modal.email} onChange={(event) => editModal(event)}/>
              <input name="password" type="password" placeholder="password" value={modal.password} onChange={(event) => editModal(event)}/>
              <input class="btn btn-primary" type="submit" value="Submit"/>
            </div>
          </div>
        </form>
      }
    </div>
  );
}

export default Modal