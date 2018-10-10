import React from 'react';
import PackTotalsContainer from "./PackTotalsContainer"
import CategoryListContainer from "./CategoryListContainer"
import ModalContainer from "./ModalContainer"
import LogoutButton from "./LogoutButton"


const Editor = (props) => {
  if(props.currentPackID){
    return (
      <div>
        <ModalContainer/>
        <LogoutButton/>
        <PackTotalsContainer/>
        <CategoryListContainer/>
      </div>
    );
  }
  else{
  //if logged in
    return(
      <h1 className="text-center">No Packs Exist!<br/>Add one to continue</h1>
    );
  }

}

export default Editor

