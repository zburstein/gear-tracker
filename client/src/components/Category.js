import React, { Component } from 'react';
import GearItem from './GearItem';
import FontAwesome from 'react-fontawesome';
import convert from 'convert-units';

class Category extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    if(event.type === "submit"){
      event.preventDefault(); //prevent rerender
      document.activeElement.blur();
    }
    else{
      this.props.updateCategory(this.props.category);
    }
  }


  render() {
    return(
      <div>
        <div className="row">
          <div className="col-11">
            <form onSubmit={this.handleSubmit}>
              <input className="category-name" name="name" placeholder="name" type="text" value={this.props.category.name} onBlur={this.handleSubmit} onChange={(event) => this.props.editCategoryName(this.props.categoryIndex, event)}/>
            </form>
          </div>
          <div className="col">
            <FontAwesome name='times-circle' className="delete" size="2x" onClick={() => { if (window.confirm('Are you sure you wantt o delete category')) this.props.deleteCategory(this.props.categoryIndex) }}/>
          </div>
        </div>

        <div className="table">
          <div className="row category-header">
            <div className="col-3 ">Name</div>
            <div className="col-5">Description</div>
            <div className="col-2">Weight</div>
            <div className="col-1">Qty</div>
            <div className="col-1"></div>
          </div>

          {this.props.category.gear_items.map((gearItem, index) => {
            return(
              <GearItem 
                key={index} 
                categoryIndex={this.props.categoryIndex} 
                gearItemIndex={index} 
                gearItem={gearItem} 
                editGearItem={this.props.editGearItem} 
                updateGearItem={this.props.updateGearItem} 
                createGearItem={this.props.createGearItem} 
                deleteGearItem={this.props.deleteGearItem}
              />
            )
          })}
          
          <div className="row category-total">
            <div className="col-9">
              <button className="add-button" onClick={() => this.props.newGearItem(this.props.categoryIndex)}>
                 <FontAwesome name='plus' size="1x" className="button-icon"/>
                Add new item
              </button>
            </div>
            <div className="col-2">
              {Math.round(convert(this.props.category.weight_in_grams).from("g").to(this.props.metric) * 100) / 100 + this.props.metric}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Category