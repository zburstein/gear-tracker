import React, { Component } from 'react';
import GearItem from './GearItem';
import FontAwesome from 'react-fontawesome';
import convert from 'convert-units';

function handleSubmit(event){
  //if submit, prevent reload and blur, which will trigger submit below
  if(event.type === "submit"){
    event.preventDefault();
    document.activeElement.blur();
  }
}

const Category = (props) => {
  return(
    <div>
      <div className="row">
        <div className="col-11">
          <form onSubmit={(event) => handleSubmit(event)} onBlur={() => props.updateCategory(props.category)}>
            <input className="category-name" name="name" placeholder="name" type="text" value={props.category.name} onChange={(event) => props.editCategory(props.category.id, event)}/>
          </form>
        </div>
        <div className="col">
          <FontAwesome name='times-circle' className="delete" size="2x" onClick={() => { if (window.confirm('Are you sure you wantt o delete category')) alert("deleting") }}/>
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

        //iterate gear gear_items

        <div className="row category-total">
          <div className="col-9">
            <button className="add-button" onClick={() => alert("add gear item")}>
               <FontAwesome name='plus' size="1x" className="button-icon"/>
              Add new item
            </button>
          </div>
          <div className="col-2">
            {/*Math.round(convert(props.category.weight_in_grams).from("g").to(props.metric) * 100) / 100 + props.metric*/}
          </div>
        </div>
      </div>
    </div>

  )
}
export default Category

