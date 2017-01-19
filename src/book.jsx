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
    			return(
    				<div>
    					<p>{Moment(page.date).format('dddd - MMMM DD, YYYY,').toString()}</p>
    					<div dangerouslySetInnerHTML={{__html: page.text}} />
    					<hr />
    				</div>
    			)
    		 })}
    	</div>
    );
  }
}

export default Book;