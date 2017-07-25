import React, { Component } from 'react';
class MoveSize extends Component {
	constructor(props) {
		super(props);
		this.onClickHandler = this.onClickHandler.bind(this);
	}
	onClickHandler(e){
		var moveSize = e.target.getAttribute('data-id');
		fetch('http://gotmovers.eqm.bz/validate/validate/rooms', 
      	{
	        method: 'POST',
	        credentials:'include',
	        headers: new Headers({
	          'Accept': 'application/json, text/javascript, */*',
	          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
	          'X-Requested-With': 'XMLHttpRequest'
	        }),
	        body:'number_of_rooms='+moveSize
	    }).then((res)=>{
        	return res.text();
      	}).then((res)=>{
        	if(res==="true")
           		this.props.chooseMoveSize(moveSize);
    		else
          		this.setState({error:'block'});
      	});
      	//this.props.chooseMoveSize(e.target.getAttribute('data-id'))
	}
	render() {
		return(
			<div className="move-size-wrapper">
				<h3>Select Your Move Size</h3>
				<div className="menu_move_size">
					<button type="button" data-id="studio" className={(this.props.moveSize==='studio') ? 'selected':''} onClick={this.onClickHandler}>Studio</button>
					<button type="button" data-id="one bedroom apartment" className={(this.props.moveSize==='one bedroom apartment') ? 'selected':''} onClick={this.onClickHandler}>1 Bedroom</button>
					<button type="button" data-id="two bedroom apartment" className={(this.props.moveSize==='two bedroom apartment') ? 'selected':''} onClick={this.onClickHandler}>2 Bedroom</button>
					<button type="button" data-id="three bedroom apartment" className={(this.props.moveSize==='three bedroom apartment') ? 'selected':''} onClick={this.onClickHandler}>3 Bedroom</button>
					<button type="button" data-id="four bedroom apartment" className={(this.props.moveSize==='four bedroom apartment') ? 'selected':''} onClick={this.onClickHandler}>4+ Bedroom</button>
					<button type="button" data-id="office" className={(this.props.moveSize==='office') ? 'selected':''} onClick={this.onClickHandler}>Office/Commercial</button>
					<button type="button" data-id="other" className={(this.props.moveSize==='other') ? 'selected':''} onClick={this.onClickHandler}>Other</button>
				</div>
			</div>
		)
	}
}
export default MoveSize;