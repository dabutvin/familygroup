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
	    					{Data.balances[page.date] &&
	    						<div>
		    						<div className="row column">
		    							<p className="text-right">{Data.balances[page.date].title}</p>
		    						</div>
		    						<div className="row">
		    							<div className="column medium-9">
			    							{Data.balances[page.date].records.map(function (record) {
			    								return (
			    									<div>
				    									<p className="record-title">{record.title}</p>
					    								<ul className="dues">
					    									{Object.keys(record.data).map(function(recordkey) {
					    										return (
						    										<li>
						    											<span>{recordkey}</span>
						    											<span>{record.data[recordkey]}</span>
						    										</li>
						    									)
						    								})}
						    							</ul>
						    							<p className="record-total">Total <span className="float-right">{record.total}</span></p>
					    								<hr />
					    							</div>
				    							)
			    							})}
			    						</div>
			    					</div>
		    					</div>
	    					}
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