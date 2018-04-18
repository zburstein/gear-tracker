import React, { Component } from 'react';
import PackListNav from './PackListNav';
import FontAwesome from 'react-fontawesome';



class Sidebar extends Component {

	render() {
    //TODO create a list of existing gear items that can be placed into a category 
		return(
			<div>
        <h2 className="inline-title">Packs</h2>
        <button className="add-button add-category" onClick={this.props.createPackList}>
          <FontAwesome name='plus' size="1x" className="button-icon"/>
          Add new list
        </button>
				<PackListNav packLists={this.props.packLists} setCurrentPackList={this.props.setCurrentPackList} deletePackList={this.props.deletePackList} />
			</div>
		)
	}
}

export default Sidebar