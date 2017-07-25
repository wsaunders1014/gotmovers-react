import React, {Component} from 'react';
import plus from '../img/plus.png';
import email from '../img/email.png';
import girlFill from '../img/girl-fill.png';
import error from '../img/error-icon.svg';
class Step5 extends Component {
	constructor(props) {
		super(props);
		this.state={phoneError:'none',codeError:'none', valMethod:'', code:''}
		this.formatPhone = this.formatPhone.bind(this);
		this.validate = this.validate.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.verifyCode = this.verifyCode.bind(this);
		this.sendCode = this.sendCode.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
	}
	formatPhone(e){
	    var value = e.target.value;
	    var num = value.match(/\d/g);
	    var str = '(';
	    if(e.which > 57 || e.which < 48 || e.shiftKey){
	      if(e.which !== 8)
	        e.preventDefault();
	    }
	    if(num && e.which !==8){
	      for(var i=0;i < num.length; i++){
	        str = str+num[i];
	        if(str.length===4)
	          str +=') ';
	        if(str.length===9)
	          str+=' - ';
	      }
	      e.target.value = str;
	    }
  	}
  	handleChange(e){
  		this.setState({code:e.target.value});
  	}
  	validate(e){
  		e.preventDefault();
  		if(/\(\d{3}\) \d{3} - \d{4}/.test(this.props.phone)){
  			if(e.target.id==='val-by-text'){
	  			this.setState({valMethod:'Text'});
  				this.sendCode('sms');
	  		}else{
	  			this.setState({valMethod:'Call'});
	  			this.sendCode('call');
	  		}
	  		document.getElementById('verify').style.display = 'none';
	  		document.getElementById('code').style.display = 'block';
  		}else{
  			this.setState({phoneError:'block'});
  		}
  		
  	}
  	sendCode(method){
		fetch('/plivo'+method,{
			method: 'POST',
	        credentials:'include',
	        headers: new Headers({
	          'Accept': 'application/json, text/javascript, */*',
	          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
	          'X-Requested-With': 'XMLHttpRequest'
	        }),
	        body:'phone_number='+this.props.phone+'&type='+method
		});
  	}
  	verifyCode(e){
  		e.preventDefault();
  		fetch('/confirmVerification',{
			method: 'POST',
	        credentials:'include',
	        headers: new Headers({
	          'Accept': 'application/json, text/javascript, */*',
	          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
	          'X-Requested-With': 'XMLHttpRequest'
	        }),
	        body:'digits='+this.state.code+'&phone_number='+this.props.phone+'&type='+this.state.valMethod.toLowerCase()
		}).then((res)=>{
			return res.text();
    }).then((res)=>{
			if(res==='true'){
				fetch('/validate/validate/send',
        	{
            method:'POST', 
            credentials:'include',
            headers: new Headers({
              'Accept': 'application/json, text/javascript, */*',
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
              'X-Requested-With': 'XMLHttpRequest'
            }),
            body:'source='+window.location.pathname
        	});
				this.props.changeView('Step6');
			}else{
				this.setState({codeError:'block'});
			}
		})
  	}
  	handleFocus(){
  		this.setState({phoneError:'none',codeError:'none'});
  	}
	render(){
		return(
			<section id="step5">
          <div className="main">
            <div id="verify" className="do default container">
              <div className="girl-area clearfix">
                <div className="girl">
                  <img width="89" height="90" className="girl-cell" src={girlFill} alt=""/>
                </div>
                <div className="heading">
                  <h1>Confirm Number</h1><p>Movers require us to validate your phone number before processing your quote.</p>
                </div>
              </div>
              <div className="form-area">
                <form id="f-step4">

                  <div className="confirm-number">
                    <p>Edit & Confirm this number</p>
                     <span className="error-msg" style={{display:this.state.phoneError}}><img src={error} alt="Error!" />Enter a valid phone number.</span>
                    <input type="tel" name="phone" onFocus={this.handleFocus} className={(this.state.phoneError==='block') ? 'error':''} autoComplete="off" id="phone2" onKeyDown={this.formatPhone} onChange={this.props.handleChange} placeholder="Verify Phone" value={this.props.phone} required />
                    <p className="receive">*Receive 2 digit security code and enter it on the next screen to confirm your number.</p>
                  </div>
                  <button id="val-by-text" className="submit" onClick={this.validate}>Validate by Text</button>
                  <button id="val-by-phone" className="submit" onClick={this.validate}>Validate by Phone</button>
                  <div className="important confirm-number">
                    <p>IMPORTANT:</p>
                    <p>Your session will end in 45 seconds.  Keep this screen open while validating.</p>
                  </div>
                </form>
              </div>
            </div>
            <div id="code" className="do text">
              <div className="container">
                <div className="text-sent">
                  <p>{this.state.valMethod} has been sent to:</p>
                  <h1 className="phone-num">{this.props.phone}</h1>
                </div>
                <div className="form-area">
                 <span className="error-msg" style={{display:this.state.codeError}}><img src={error} alt="Error!" />Invalid Code</span>
                  <form id="do-text" method="post" className="enternumber clearfix">
                    <label>Enter the 2 digit number</label>
                    <br/>
                   
                    <div>
	                    <input className={(this.state.codeError==='block')? 'error':''} name="code" type="tel" maxLength="2" placeholder="00" value={this.state.code} onChange={this.handleChange} required/>
	                    <button id="text-ver" className="submit" onClick={this.verifyCode}>Enter</button>
                    </div>
                    <div className="message"></div>
                  </form>
                </div>
                <div className="text-notes">
                  <div className="clearfix">
                    <img height="41" width="41" src={plus} alt=""/>
                    <p>After validating your number, your quote will be ready and we will match you with movers.</p>
                  </div> 
                  <div className="clearfix">
                    <img height="40" width="40" src={email} alt=""/>
                    <p>You will receive an email for your reference.</p>
                    <form><input type="hidden" id="source" name="source" value="/moving"/></form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
		)
	}
}
export default Step5;