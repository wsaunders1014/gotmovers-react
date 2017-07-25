import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
//import Datepicker from 'Datepicker';
class Calendar extends Component {
	constructor(props) {
		super(props);
		this.handleDayClick = this.handleDayClick.bind(this);
	}
	handleDayClick(day){
		var date = ((day.getMonth()+1 < 10) ? '0'+(day.getMonth()+1):day.getMonth()+1)+'/'+day.getDate()+'/'+day.getFullYear();
		
		fetch('/validate/validate/movedate', 
      	{
	        method: 'POST',
	        credentials:'include',
	        headers: new Headers({
	          'Accept': 'application/json, text/javascript, */*',
	          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
	          'X-Requested-With': 'XMLHttpRequest'
	        }),
	        body:'move_date='+date
        }).then((res)=>{
        	return res.text();
  		}).then((res)=>{
	        if(res==="true")
	           this.props.chooseDate(date);
	        else
	          this.setState({error:'block'})
      	});

		//this.props.chooseDate(date);
	}
	render() {
		var future = new Date();
		future.setDate(future.getDate() + 180);
		return(
			<div className="calendar-wrapper">
				<h3>Approximate Move Date:</h3>
				<DayPicker onDayClick={this.handleDayClick} disabledDays={{before: new Date(),after: future }} fromMonth={new Date()} toMonth={future} />
			</div>
		)
	}
}
export default Calendar;