import React, { Component } from 'react';
import PackTotalsContainer from "./PackTotalsContainer"

const Editor = () => {
  return (
    <div>
      <PackTotalsContainer/>
      CateogryList 
    </div>
  );

}

export default Editor


/*
class Editor extends Component {

  render() {
    if(this.props.currentPackList){
      return(
        <div>
          <PackTotals packList={this.props.currentPackList} editPackList={this.props.editPackList} updatePackList={this.props.updatePackList}/>

          {this.props.currentPackList.categories.map((category, index)=> {
            return( 
              <Category 
              key={index} 
              metric={this.props.currentPackList.display_metric} 
              categoryIndex={index} 
              category={category} 
              updateCategory={this.props.updateCategory} 
              editCategoryName={this.props.editCategoryName} 
              deleteCategory={this.props.deleteCategory} 
              editGearItem={this.props.editGearItem} 
              updateGearItem={this.props.updateGearItem} 
              newGearItem={this.props.newGearItem} 
              createGearItem={this.props.createGearItem} 
              deleteGearItem={this.props.deleteGearItem}
              />
            )
          })}
          <button className="add-button" onClick={this.props.createCategory}> 
            <FontAwesome name='plus' size="1x" className="button-icon"/>
            Add category
          </button>

        </div>
      )

    }
    else{
      //can move this up
      //empty lists
      if(this.props.currentPackList === null){
        return(
          <div>
            <h1>Add Pack List to Continue</h1>
          </div>
        );
      }

      //udefined which means not loaded so render loader
      else{
        return(
          <div>
            <h1>Welcome</h1>
            <div className="loader"></div>
            <h3>Add pack list to begin</h3>
          </div>
        )
      }
    }

  }
}
*/

