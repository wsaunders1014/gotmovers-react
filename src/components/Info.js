import React, { Component } from 'react';
class Info extends Component {
	constructor(props) {
		super(props);
		this.curr = 0;
		this.rightArrow = this.rightArrow.bind(this);
		this.leftArrow = this.leftArrow.bind(this);
	}
	rightArrow(e){
		e.preventDefault();
		this.curr++;
		if(this.curr >3)
			this.curr =0;
		document.getElementsByClassName('active')[0].className= "info_main_step";
		document.getElementsByClassName('info_main_step')[this.curr].className="info_main_step active";
	}
	leftArrow(e){
		e.preventDefault();
		this.curr--;
		if(this.curr <0)
			this.curr = 3;
		document.getElementsByClassName('active')[0].className= "info_main_step";
		document.getElementsByClassName('info_main_step')[this.curr].className="info_main_step active";
	}
	render(){
		return(
		<div className="info-wrapper">
			<div>
				<div className="close-btn" onClick={this.props.closeOverlay}>
					+
				</div>
				<div className="info info_main">
					<button id="info-left" onClick={this.leftArrow}>
						{'<'}
					</button>
					<button id="info-right" onClick={this.rightArrow}>
						{'>'}
					</button>
					<div>
						<div className="info_main_step active">
							<h5>ENTER INFO</h5>
							<p>Take a few moments and tell us about your move.</p>
							<h5>FIND MOVERS</h5>
							<p>We'll find you movers from a network of licensed carriers.</p>
							<h5>VIEW QUOTES</h5>
							<p>Review quotes, compare movers and save big.</p>
						</div>
						<div className="info_main_step">
							<h5>How is the pricing for my moving quote calculated?</h5>
							<p>The pricing for your quote takes into account various details of your move. The most important criteria affecting price are the weight of your inventory, the distance you're moving, the popularity of your route, the season of your move, and any extra services that are provided for you. Your moving quote will fluctuate based on these factors.</p>
						</div>
						<div className="info_main_step">
							<h5>When can I expect my quote to be as low as $499?</h5>
							<p>The pricing of your quote depends on weight, distance, and timing. Based on these variables, your quote can come out to $499. For example, a studio apartment with a light shipment moving a short distance during an off peak season can cost as low as $499.</p>
						</div>
						<div className="info_main_step">
							<h5>Who will contact me?</h5>
							<p>You will be contacted directly by the moving companies that can service your route via email and phone. Got Movers ensures you are contacted by licensed and professional movers, but remember, it's best to do your own research when finally hiring a company to move you.</p>
						</div>
					</div>
				</div>
			</div>
			<div className="info info_disclaimer">
				<p>*Disclaimer: GotMovers.com is not a moving company or moving broker and will not be performing your move.  GotMovers is a matching service that will put you in touch with movers that can help you.  Some movers may be self-service, some may be full-service, and in some cases we might put you in touch with other companies that match you with movers outside of our network.  In all cases, please make sure you research any movers that call you to verify their license, availability, and pricing.  Once you submit your information, you will be contacted by phone or email with quotes.</p>
			</div>
			<div className="info info_copyright">
				<p>Copyright 2016 &copy; www.GotMovers.com</p>
				<p>7945 W Sahara Ave, Ste 205, Las Vegas, NV 89117</p>
			</div>
		</div>
		)
	}
}
export default Info;