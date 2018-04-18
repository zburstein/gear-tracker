import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';



class GearItem extends Component {
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  //used only when user presses enter in order to prevent refresh
  handleSubmit(event){
    //if form being submitted by user pressing enter, just blur to prevent a double submit
    if(event.type === "submit"){
      event.preventDefault(); //prevent rerender
      document.activeElement.blur();
    }
    else{
      if(this.props.gearItem.id){
          this.props.updateGearItem(this.props.gearItem);
      }
      else{
          this.props.createGearItem(this.props.categoryIndex, this.props.gearItemIndex);
      }
    }
  }

  handleChange(event){
    this.props.editGearItem(this.props.categoryIndex, this.props.gearItemIndex, event);
  }

	render() {
    //returns a form of gear_item properties within a bootstrap grid pattern
    return(     
      <form onSubmit={this.handleSubmit} onBlur={this.handleSubmit} /*onBlur={() => this.props.updateGearItem(this.props.gearItem)}*/>
        <div className={"row " + (this.props.gearItemIndex === 0 ? "" : "top-dotted")}>
          <div className="col-3"><input name="name" placeholder="name" value={this.props.gearItem.name} onChange={this.handleChange}/></div>
          <div className="col-5"><input name="description" placeholder="description" value={this.props.gearItem.description || ""} onChange={this.handleChange}/></div>
          <div className="col-2">
            <input className="weight-input" name="display_weight" type="number" min="0" placeholder="0" step=".01" value={this.props.gearItem.display_weight || ""} onChange={this.handleChange}/>           
            <select name="display_metric" value={this.props.gearItem.display_metric || undefined} onChange={this.handleChange}>
              <option value="g">g</option>
              <option value="oz">oz</option>
              <option value="lb">lb(s)</option>
              <option value="kg">kg</option>
            </select>
          </div>
          <div className="col-1"><input name="quantity" placeholder="qty" type="number" min="0" step="1" value={this.props.gearItem.quantity || 1} onChange={this.handleChange}/></div>   
          <div className="col-1"><FontAwesome name='times-circle' className="delete" size="1x" onClick={() => { if (window.confirm('Are you sure you want to delete item?')) this.props.deleteGearItem(this.props.categoryIndex, this.props.gearItemIndex) }}/></div>
        </div>
        <input className="hidden-submit" type="submit" value="Submit" />
      </form>
       
    )
	}
}

export default GearItem