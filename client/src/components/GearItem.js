import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

function handleSubmit(event){
  //if submit, prevent reload and blur, which will trigger submit below
  if(event.type === "submit"){
    event.preventDefault();
    document.activeElement.blur();
  }
}

const GearItem = (props) => {
  return(
    <form onSubmit={(event) => handleSubmit(event)} onBlur={() => props.updateGearItem(props.gearItem)}>
      <div className={"row " + (props.index === 0 ? "" : "top-dotted")}>
        <div className="col-3"><input name="name" placeholder="name" value={props.gearItem.name} onChange={(event) => props.editGearItem(props.gearItem, event)}/></div>
        <div className="col-5"><input name="description" placeholder="description" value={props.gearItem.description || ""} onChange={(event) => props.editGearItem(props.gearItem, event)}/></div>
        <div className="col-2">
          <input className="weight-input" name="display_weight" type="number" min="0" placeholder="0" step=".01" value={props.gearItem.display_weight || ""} onChange={(event) => props.editGearItem(props.gearItem, event)}/>           
          <select name="display_metric" value={props.gearItem.display_metric} onChange={(event) => props.editGearItem(props.gearItem, event)}>
            <option value="g">g</option>
            <option value="oz">oz</option>
            <option value="lb">lb(s)</option>
            <option value="kg">kg</option>
          </select>
        </div>
        <div className="col-1"><input name="quantity" placeholder="qty" type="number" min="0" step="1" value={props.gearItem.quantity} onChange={(event) => props.editGearItem(props.gearItem, event)}/></div>   
        <div className="col-1"><FontAwesome name='times-circle' className="delete" size="1x" onClick={() => { if (window.confirm('Are you sure you want to delete item?')) props.deleteGearItem(props.gearItem.id) }}/></div>
      </div>
      <input className="hidden-submit" type="submit" value="Submit" />
    </form> 
  )
}

export default GearItem