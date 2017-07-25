import React, { Component } from 'react';
class Overlay extends Component {
	render(){
		const isOn = this.props.isOn;
		if(isOn){
			return(
				<div id="overlay">
					{this.props.children}
				</div>
			)
		}else{
			return(null)
		}
	}
}
export default Overlay;