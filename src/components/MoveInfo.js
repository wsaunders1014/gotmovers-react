import React, { Component } from 'react';
import blueRightArrow from '../img/arrow-right-blue.svg';
class MoveInfo extends Component {
	formatDate(date){
		var extDate = date.split('/');
		var monthArry = ['','Jan', 'Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
		var month = monthArry[parseInt(extDate[0],10)];
		return month +' '+extDate[1]+', '+extDate[2];
	}
	formatSize(size){
		var x = {
			"studio":'Studio',
			"one bedroom apartment":"1 Bedroom",
			"two bedroom apartment":"2 Bedrooms",
			"three bedroom apartment":"3 Bedrooms",
			"four bedroom apartment":'4+ Bedrooms',
			"office":'Office',
			'other':'other'
		}
		return x[size];
	}
	render() {
		return(
			<div className="move-info">
	            <span className="bedrooms">{this.formatSize(this.props.moveSize)}</span>, 
	            &nbsp;<span className="move-date">{this.formatDate(this.props.moveDate)}</span><br/>
	            <span className="from-city">{this.props.fromCity+', '+this.props.fromState} &nbsp;</span>
	            <img src={blueRightArrow} alt=""/>&nbsp;
	            {this.props.toCity !=='' && <span className="toCity">{this.props.toCity +', '+this.props.toState}</span>}
	        </div>
		)
	}
}
export default MoveInfo;