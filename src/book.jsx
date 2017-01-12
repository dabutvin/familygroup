import React from 'react';

import Page from './page.jsx';

class Book extends React.Component {
  render () {
    return (
    	<div>
    		<p> Book !</p>
    		<Page num="0" />
    		<Page num="1" />
    	</div>
    );
  }
}

export default Book;