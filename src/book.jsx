import React from 'react';
import Moment from 'moment';

import Data from './data.jsx';

class Book extends React.Component {
  render () {
    return (
    	<div>
    		<p> Book !</p>
    		<hr />
    		 {Data.pages.map(function (page) {
    			return (
    				<div className="row page">
	    				<div className="column medium-6">
	    					<p className="page-date">{Moment(page.date).format('dddd - MMMM DD, YYYY').toString()}</p>
	    					<div className="page-text" dangerouslySetInnerHTML={{__html: page.text}} />
	    					<hr />
	    				</div>
	    				<div className="column medium-6">
	    					{page.images.map(function(image) {
	    						return (
	    							<img src={image} />
	    						)
	    					})}
	    				</div>
	    			</div>
    			)
    		 })}
    	</div>
    );
  }
}

export default Book;