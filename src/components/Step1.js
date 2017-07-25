import React, { Component } from 'react';
import girlCell from '../img/girl-cell.png';
import error from '../img/error-icon.svg';
import verisignlogo from '../img/verisign.png';
import greenCheckmark from '../img/checkmark-icon-green.svg';
class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {error:'none'};
    this.handleFocus = this.handleFocus.bind(this);
    this.validate = this.validate.bind(this);
    this.fromCity = '';
    this.fromState ='';
  }
  validate(e){
    e.preventDefault();
    if(this.props.fromZip.match(/\d{5}/) && this.props.fromZip.length ===5){
      fetch('/validate/validate/from-zipcode', 
      {
        method: 'POST',
        credentials:'include',
        headers: new Headers({
          'Accept': 'application/json, text/javascript, */*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'X-Requested-With': 'XMLHttpRequest'
        }),
        body:'zip_from='+this.props.fromZip
      }).then((res)=>{
        return res.text();
      }).then((res)=>{
        if(res==="true")
         this.props.chooseFromZip(this.props.fromZip,this.fromCity,this.fromState);
        else
          this.setState({error:'block'})
      });
      //remove this in live version
      //this.props.chooseFromZip(this.props.fromZip,this.fromCity,this.fromState);
    }else{
      //ERROR
      this.setState({error:'block'})
    }
  }
  handleFocus(e){
    this.setState({error:'none'})
  }
  render() {
    return (
      <section id="step1">
        <div className="mobile-friendly">
          <p>
            <img src="" alt=""/> 
          </p>
        </div>
        <div className="marketing">
          <div className="col">
            <img src={girlCell} height="106" width="105" alt=""/>
          </div>
          <div className="col calculator">
            <h1>Moving Cost Calculator</h1>
            <p>Rates as low as $199 Local,</p>
            <p>$499 Long Distance</p>
          </div>
        </div>
        <div className="forms">
          <h2>
            Moving From:
          </h2>
          <span className="error-msg" style={{display:this.state.error}}>
            <img src={error} alt="Error!"/>Enter Valid Zipcode
          </span>
          <div>
            <form id="f-step1">
              <div>
                <input className={(this.state.error === 'none') ? '':'error'} type="tel" id="zip_from" name="fromZip" maxLength="5" placeholder="From ZIP" autoComplete="off" value={this.props.fromZip} onChange={this.props.handleChange} onFocus={this.handleFocus}/>
                <button className="ziphelp" id="ziphelp" type="button" onClick={()=>{this.props.openOverlay('ziphelp')}}>ZIP Help</button>
              </div>
              <div>
                <button className="cta" type="submit" id="step1-btn" onClick={this.validate}>GO</button>
              </div>
            </form>
          </div>
          <div className="extra">
            <img src={verisignlogo} height="26" width="51" alt="VeriSign Secured"/>
          </div>
        </div>
      </section>
    )
  }
  componentDidUpdate(prevProps, prevState) {
    var that = this;
    if(prevProps.fromZip !== this.props.fromZip && this.props.fromZip.length === 5){
      fetch('https://maps.googleapis.com/maps/api/geocode/json?&address='+this.props.fromZip)
      .then((res)=>{
        return res.json();
      })
      .then((res)=>{
        if(res.status ==='OK' && res.results[0].address_components[res.results[0].address_components.length-1].short_name==='US'){
          var result = res.results[0].formatted_address.split(", ");
          that.fromState= result[1].split(' ')[0];
          that.fromCity = result[0];
          document.getElementById('step1').children[2].children[0].innerHTML = that.fromCity+', '+that.fromState+' <img src="'+greenCheckmark+'"/>';
        }
      })
    }
  }
}
export default Step1;