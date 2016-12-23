import React from 'react';

import Page from './page.jsx';

class Book extends React.Component {
  render () {
    return (
    	<div>
    		<p> Book !</p>
    		<Page />
    		<Page />
    		<Page />
    		<Page />
    	</div>
    );
  }
}

export default Book;