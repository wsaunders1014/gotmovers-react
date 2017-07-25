import React, { Component } from 'react';
import error from '../img/error-icon.svg';
import greenCheckmark from '../img/checkmark-icon-green.svg';
import MoveInfo from './MoveInfo';
class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {error:'none'};
    this.handleFocus = this.handleFocus.bind(this);
    this.validate = this.validate.bind(this);
    this.toCity ='';
    this.toState='';
  }
  validate(e){
    e.preventDefault();
    if(this.props.toZip.match(/\d{5}/) && this.props.toZip.length ===5){
      fetch('/validate/validate/to-zipcode', 
      {
        method: 'POST',
        credentials:'include',
        headers: new Headers({
          'Accept': 'application/json, text/javascript, */*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'X-Requested-With': 'XMLHttpRequest'
        }),
        body:'zip_to='+this.props.toZip
      }).then((res)=>{
        return res.text();
      }).then((res)=>{
        if(res==="true"){
          this.props.chooseToZip(this.props.toZip,this.toCity,this.toState);
          this.props.changeView('Step3');
        }else
          this.setState({error:'block'})
      });
      // this.props.chooseToZip(this.props.toZip,this.toCity,this.toState);
      // this.props.changeView('Step3');
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
      <section id="step2">
        <MoveInfo {...this.props} />
        <div className="forms">
          <h2>
            Moving To:
          </h2>
          <span className="error-msg" style={{display:this.state.error}}><img src={error} alt="Error!"/>Enter Valid Zipcode</span>
          <div>
            <form id="f-step2">
              <input type="tel" id="to_zip"  className={(this.state.error === 'none') ? '':'error'} onFocus={this.handleFocus} name="toZip" placeholder="To ZIP" maxLength="5" value={this.props.toZip} autoComplete="off" onChange={this.props.handleChange}/>
              <button className="ziphelp zip2" type="button" onClick={()=>{this.props.openOverlay('ziphelp')}}>ZIP Help</button>
              <button className="cta calc2" type="submit" id="calculate" onClick={this.validate}>CALCULATE</button>
            </form>
          </div>
        </div>
      </section>
    )
  }
  componentDidUpdate(prevProps, prevState) {
    var that = this;
    if(prevProps.toZip !== this.props.toZip && this.props.toZip.length === 5){
      fetch('https://maps.googleapis.com/maps/api/geocode/json?&address='+this.props.toZip)
      .then((res)=>{
        return res.json();
      })
      .then((res)=>{
        if(res.status ==='OK' && res.results[0].address_components[res.results[0].address_components.length-1].short_name==='US'){
          var result = res.results[0].formatted_address.split(", ");
          that.toState= result[1].split(' ')[0];
          that.toCity = result[0];
          document.getElementById('step2').children[1].children[0].innerHTML = that.toCity+', '+that.toState+' <img src="'+greenCheckmark+'"/>';
        }
      })
    }
  }
}
export default Step2;