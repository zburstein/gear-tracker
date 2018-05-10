import React from 'react';
import PackTotalsContainer from "./PackTotalsContainer"
import CategoryListContainer from "./CategoryListContainer"

const Editor = (props) => {
  if(props.currentPackID){
    return (
      <div>
        <PackTotalsContainer/>
        <CategoryListContainer/>
      </div>
    );
  }
  else{
    return(
      <h1 className="text-center">No Packs Exist!<br/>Add one to continue</h1>
    );
  }

}

export default Editor

