import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';


class PackListNav extends Component {

	render() {
		return(
      <div className="card text-white bg-secondary pack-lists-card">
        <div className="card-body">
          <ul className="pack-lists-nav">
      			{this.props.packLists.map((packList, index) => {
      				return(
                <div className="pack-row" key={index}>
        					<li className="pack-list-link" onClick={() => this.props.setCurrentPackList(packList.id)}>
        						{packList.name}
        					</li>
                  <FontAwesome name='times-circle' className="delete pack-delete" size="1x" onClick={() => { if (window.confirm('Are you sure you want to delete packList?')) this.props.deletePackList(index) }}/>
                </div>
      				);
      			})}
          </ul>
        </div>
      </div>
		)
	}
}

export default PackListNav