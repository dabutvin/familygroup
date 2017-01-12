import React from 'react';
import Data from './data.jsx';


class Page extends React.Component {
	constructor(props) {
		super(props);
		this.pageData = Data.pages[props.num];
	}

	render() {
		return (
			<div>
				{this.pageData.thing}
			</div>
		);
	}

}

export default Page;