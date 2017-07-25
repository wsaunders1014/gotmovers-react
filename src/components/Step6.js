import React, {Component} from 'react';
import imover from '../img/imover-logo.svg';
class Step6 extends Component {
	componentDidMount() {
	 	fetch("/branch", {
            method:'POST', 
            credentials:'include',
            headers: new Headers({
              'Accept': 'application/json, text/javascript, */*',
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
              'X-Requested-With': 'XMLHttpRequest'
            }),
            body:'source='+window.location.pathname
		}).then((res) => {
			return res.text();
		}).then((res) => {
		   document.getElementById("imover-logo").children[0].setAttribute("href", res);
		   document.getElementById("get-imover").children[0].setAttribute("href", res);
		});
	}
	render(){
		return(
			<section id="step6">
				<div className="thank-you-heading">
					<h2>Thank You!</h2>
					<p>Professional movers will call you shortly.</p>
					<p>In the meantime, please see below for your approximate estimate:</p>
				</div>
				<div className="thank-you-quote">
					<h5>{this.props.quote}</h5>
				</div>
				<div className="thank-you-finish clearfix">
					<div id="imover-logo">
						<a href=".">
						<img src={imover} alt="iMover"/>
						</a>
					</div>
					<div className="flt-right">
						<h3>Want to Connect<br/>With Your Movers?</h3>
						Speak directly with your movers and share your home inventory with the iMover app.
					</div>
					<div id="get-imover"><a href=".">GET iMOVER</a></div>
				</div>
			</section>
		)
	}
}
export default Step6;