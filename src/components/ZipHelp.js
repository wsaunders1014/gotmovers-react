import React, { Component } from 'react';
class ZipHelp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stateChosen:false,
			state:'Select A State',
			city:null,
			zipcode:null
		}
		this.chooseState = this.chooseState.bind(this);
		this.backBtn = this.backBtn.bind(this);
		this.results = null;
	}
	chooseState(e){
		let stateAbbr = e.target.getAttribute('data-state');
		let state =  e.target.getAttribute('data-abbr');
		var that = this;
		fetch('http://gotmovers.eqm.bz/validate/city-state/zipcode-by-city-state',
			{
				method:'POST',
				mode:'cors',
				headers: {
					'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
 		 			'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
				},
				body:'state='+stateAbbr
			}
		).then(function(response){
			return response.json()
		}).then(function(response){
			that.results = response.result;
			that.setState({stateChosen:stateAbbr, state:state})
		})
	}
	scrollToLetter(e){
		var letter = e.target.innerHTML
		document.getElementsByClassName('selected')[0].className = 'scrollToSelected';
		e.target.className +=' selected';
		document.getElementsByClassName('letter-'+letter)[0].scrollIntoView();
	}
	backBtn(){
		this.setState({stateChosen:false,state:'Select A State'})
	}
	render(){
		return(
			<div className="zip-box">
			<div className="zip-header">
				<div id="back" className="arr-left" style={{display:(!this.state.stateChosen) ? 'none':'block'}} onClick={this.backBtn}></div>
				<div className="select-state">{this.state.state}</div>
				<div id="zip-close-btn" onClick={this.props.closeOverlay}>
					<div className="arr-left"></div>
					<div className="arr-right"></div>
				</div>
				{/*<div className="zip-alpha-mini inactive default">
					<ul>
					<li id="list-a" className="scrollToSelected selected">A</li>
					<li id="list-b" className="scrollToSelected">B</li>
					<li id="list-c" className="scrollToSelected">C</li>
					<li id="list-d" className="scrollToSelected">D</li>
					<li id="list-e" className="scrollToSelected">E</li>
					<li id="list-f" className="scrollToSelected">F</li>
					<li id="list-g" className="scrollToSelected">G</li>
					<li id="list-h" className="scrollToSelected">H</li>
					<li id="list-i" className="scrollToSelected">I</li>
					<li id="list-j" className="scrollToSelected">J</li>
					<li id="list-k" className="scrollToSelected">K</li>
					<li id="list-l" className="scrollToSelected">L</li>
					<li id="list-m" className="scrollToSelected">M</li>
					<li id="list-n" className="scrollToSelected">N</li>
					<li id="list-o" className="scrollToSelected">O</li>
					<li id="list-p" className="scrollToSelected">P</li>
					<li id="list-q" className="scrollToSelected">Q</li>
					<li id="list-r" className="scrollToSelected">R</li>
					<li id="list-s" className="scrollToSelected">S</li>
					<li id="list-t" className="scrollToSelected">T</li>
					<li id="list-u" className="scrollToSelected">U</li>
					<li id="list-v" className="scrollToSelected">V</li>
					<li id="list-w" className="scrollToSelected">W</li>
					<li id="list-x" className="scrollToSelected">X</li>
					<li id="list-y" className="scrollToSelected">Y</li>
					<li id="list-z" className="scrollToSelected">Z</li>
					</ul>
				</div> */}
			</div>

			<div className="zips-body">

				<div className="zip-holder">
					<div className={(this.state.stateChosen) ? 'zip-alpha':'zip-alpha inactive'} onClick={this.scrollToLetter}>
						<div id="list-a" className="scrollToSelected selected">A</div>
						<div id="list-b" className="scrollToSelected">B</div>
						<div id="list-c" className="scrollToSelected">C</div>
						<div id="list-d" className="scrollToSelected">D</div>
						<div id="list-e" className="scrollToSelected">E</div>
						<div id="list-f" className="scrollToSelected">F</div>
						<div id="list-g" className="scrollToSelected">G</div>
						<div id="list-h" className="scrollToSelected">H</div>
						<div id="list-i" className="scrollToSelected">I</div>
						<div id="list-j" className="scrollToSelected">J</div>
						<div id="list-k" className="scrollToSelected">K</div>
						<div id="list-l" className="scrollToSelected">L</div>
						<div id="list-m" className="scrollToSelected">M</div>
						<div id="list-n" className="scrollToSelected">N</div>
						<div id="list-o" className="scrollToSelected">O</div>
						<div id="list-p" className="scrollToSelected">P</div>
						<div id="list-q" className="scrollToSelected">Q</div>
						<div id="list-r" className="scrollToSelected">R</div>
						<div id="list-s" className="scrollToSelected">S</div>
						<div id="list-t" className="scrollToSelected">T</div>
						<div id="list-u" className="scrollToSelected">U</div>
						<div id="list-v" className="scrollToSelected">V</div>
						<div id="list-w" className="scrollToSelected">W</div>
						<div id="list-x" className="scrollToSelected">X</div>
						<div id="list-y" className="scrollToSelected">Y</div>
						<div id="list-z" className="scrollToSelected">Z</div>
					</div>
					{this.state.stateChosen === false &&
						<div className="zh-state default">
							<div className="zh-state-holder" onClick={this.chooseState}>
								<div className="state" data-state="AL" data-abbr="Alabama">Alabama</div>
								<div className="state" data-state="AK" data-abbr="Alaska">Alaska</div>
								<div className="state" data-state="AZ" data-abbr="Arizona">Arizona</div>
								<div className="state" data-state="AR" data-abbr="Arkansas">Arkansas</div>
								<div className="state" data-state="CA" data-abbr="California">California</div>
								<div className="state" data-state="CO" data-abbr="Colorado">Colorado</div>
								<div className="state" data-state="CT" data-abbr="Connecticut">Connecticut</div>
								<div className="state" data-state="DC" data-abbr="District of Columbia">District of Columbia</div>
								<div className="state" data-state="DE" data-abbr="Delaware">Delaware</div>
								<div className="state" data-state="FL" data-abbr="Florida">Florida</div>
								<div className="state" data-state="GA" data-abbr="Georgia">Georgia</div>
								<div className="state" data-state="HI" data-abbr="Hawaii">Hawaii</div>
								<div className="state" data-state="ID" data-abbr="Idaho">Idaho</div>
								<div className="state" data-state="IL" data-abbr="Illinois">Illinois</div>
								<div className="state" data-state="IN" data-abbr="Indiana">Indiana</div>
								<div className="state" data-state="IA" data-abbr="Iowa">Iowa</div>
								<div className="state" data-state="KS" data-abbr="Kansas">Kansas</div>
								<div className="state" data-state="KY" data-abbr="Kentucky">Kentucky</div>
								<div className="state" data-state="LA" data-abbr="Louisiana">Louisiana</div>
								<div className="state" data-state="ME" data-abbr="Maine">Maine</div>
								<div className="state" data-state="MD" data-abbr="Maryland">Maryland</div>
								<div className="state" data-state="MA" data-abbr="Massachusetts">Massachusetts</div>
								<div className="state" data-state="MI" data-abbr="Michigan">Michigan</div>
								<div className="state" data-state="MN" data-abbr="Minnesota">Minnesota</div>
								<div className="state" data-state="MS" data-abbr="Mississippi">Mississippi</div>
								<div className="state" data-state="MO" data-abbr="Missouri">Missouri</div>
								<div className="state" data-state="MT" data-abbr="Montana">Montana</div>
								<div className="state" data-state="NE" data-abbr="Nebraska">Nebraska</div>
								<div className="state" data-state="NV" data-abbr="Nevada">Nevada</div>
								<div className="state" data-state="NH" data-abbr="New Hampshire">New Hampshire</div>
								<div className="state" data-state="NJ" data-abbr="New Jersey">New Jersey</div>
								<div className="state" data-state="NM" data-abbr="New Mexico">New Mexico</div>
								<div className="state" data-state="NY" data-abbr="New York">New York</div>
								<div className="state" data-state="NC" data-abbr="North Carolina">North Carolina</div>
								<div className="state" data-state="ND" data-abbr="North Dakota">North Dakota</div>
								<div className="state" data-state="OH" data-abbr="Ohio">Ohio</div>
								<div className="state" data-state="OK" data-abbr="Oklahoma">Oklahoma</div>
								<div className="state" data-state="OR" data-abbr="Oregon">Oregon</div>
								<div className="state" data-state="PA" data-abbr="Pennsylvania">Pennsylvania</div>
								<div className="state" data-state="RI" data-abbr="Rhode Island">Rhode Island</div>
								<div className="state" data-state="SC" data-abbr="South Carolina">South Carolina</div>
								<div className="state" data-state="SD" data-abbr="South Dakota">South Dakota</div>
								<div className="state" data-state="TN" data-abbr="Tennessee">Tennessee</div>
								<div className="state" data-state="TX" data-abbr="Texas">Texas</div>
								<div className="state" data-state="UT" data-abbr="Utah">Utah</div>
								<div className="state" data-state="VT" data-abbr="Vermont">Vermont</div>
								<div className="state" data-state="VA" data-abbr="Virginia">Virginia</div>
								<div className="state" data-state="WA" data-abbr="Washington">Washington</div>
								<div className="state" data-state="WV" data-abbr="West Virgina">West Virgina</div>
								<div className="state" data-state="WI" data-abbr="Wisconsin">Wisconsin</div>
								<div className="state" data-state="WY" data-abbr="Wyoming">Wyoming</div>
							</div>
							<div className="zh-loader"></div>
						</div>
					}{this.state.stateChosen !== false &&
						<div className="zh-city">
							<div className="zh-city-holder">
								{
									this.results.map((item,key)=>{
										return(<div className={"city letter-"+item.first_letter_city} data-zipcode={item.zipcode} key={key} onClick={this.props.chooseZip}>{item.city_name}</div>)
									})
								}
							</div>
						</div>
					}
				</div>
			</div>
		</div>
		)
	}
}
export default ZipHelp;