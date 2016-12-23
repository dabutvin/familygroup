import React from 'react';
import {render} from 'react-dom';

class Book extends React.Component {
  render () {
    return <p> Book !</p>;
  }
}

render(<Book/>, document.getElementById('book'));