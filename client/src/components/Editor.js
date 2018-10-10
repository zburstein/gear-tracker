import React from 'react';
import PackTotalsContainer from "./PackTotalsContainer"
import CategoryListContainer from "./CategoryListContainer"
import LogoutButton from "./LogoutButton"


const Editor = (props) => {
  if(props.currentPackID){
    return (
      <div>
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

