import React from 'react';

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
    					<p>{page.date}</p>
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