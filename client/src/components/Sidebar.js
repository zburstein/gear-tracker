import React, { Component } from 'react';
import PackList from "./PackList"


class Sidebar extends Component {

	render() {
    //TODO create a list of existing gear items that can be placed into a category 
		return(
			<div>
				<PackList/>
			</div>
		)
	}
}

export default Sidebar