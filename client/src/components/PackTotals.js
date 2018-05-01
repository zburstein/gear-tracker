import React, { Component } from 'react';
import convert from 'convert-units';



const PackTotals = ({pack}) => {
  if(pack){
    return(
      <form>
        <input className="pack-name" name="name" value={pack.name}/>
        {"Total: " + Math.round( convert(pack.weight_in_grams).from("g").to(pack.display_metric) * 100) / 100}
        <select name="display_metric" value={pack.display_metric}>
          <option value="g">g</option>
          <option value="oz">oz</option>
          <option value="lb">lb(s)</option>
          <option value="kg">kg</option>
        </select>
      </form>
    )
  }
  else{
    return(
      <div>
        Not loaded
      </div>
    )
  }
}
  /*
class PackTotals extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    if(event.type === "submit"){
      event.preventDefault();
      document.activeElement.blur();
    }
    else{
      this.props.updatePackList(this.props.packList);
    }
  }

	render() {
		return(
			<div>
        <form onSubmit={this.handleSubmit} onBlur={this.handleSubmit}>
          <input className="pack-name" name="name" value={this.props.packList.name} onChange={this.props.editPackList}/>
            {"Total: " + Math.round( convert(this.props.packList.weight_in_grams).from("g").to(this.props.packList.display_metric) * 100) / 100}
            <select name="display_metric" value={this.props.packList.display_metric || undefined} onChange={this.props.editPackList}>
              <option value="g">g</option>
              <option value="oz">oz</option>
              <option value="lb">lb(s)</option>
              <option value="kg">kg</option>
            </select>
        </form>
			</div>
		)
	}
}
*/
export default PackTotals