import React, { Component } from 'react';
import error from '../img/error-icon.svg';
import greenCheckmark from '../img/green_check2.png';
import clearCheckmark from '../img/clear_check2.png';
import verisignlogo from '../img/verisign.png';
class Step4 extends Component {
  constructor(props) {
    super(props);
    this.state = {emailError:'none',firstError:'none',lastError:'none',phoneError:'none'};
    this.handleEmailFocus = this.handleEmailFocus.bind(this);
    this.handleFirstFocus = this.handleFirstFocus.bind(this);
    this.handleLastFocus = this.handleLastFocus.bind(this);
    this.handlePhoneFocus = this.handlePhoneFocus.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateName = this.validateName.bind(this);
    this.validatePhone = this.validatePhone.bind(this);
    this.formatPhone = this.formatPhone.bind(this);
  }
  validateEmail(e){
    e.preventDefault();
    if(/[a-zA-Z0-9.!#$%&'*+-=?^_`{|}~]+@[a-z0-9-]+\.\w./.test(this.props.email) !==false){
      fetch('/validate/validate/email', 
      {
        method: 'POST',
        credentials:'include',
        headers: new Headers({
          'Accept': 'application/json, text/javascript, */*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'X-Requested-With': 'XMLHttpRequest'
        }),
        body:'email_address='+this.props.email
      }).then((res)=>{
        return res.text();
      }).then((res)=>{
        if(res==="true"){
          document.getElementById('slider').style.marginLeft='-100%';
          this.props.sendTracking('submit', 'click next','Landing-mobile-email');
          setTimeout(()=>{
            document.getElementById('first_name').focus();
          },1000)
        }else
          this.setState({emailError:'block'})
      });
      // document.getElementById('slider').style.marginLeft='-100%';
      // setTimeout(()=>{
      //   document.getElementById('first_name').focus();
      // },1000)
    }else{
      //ERROR
      this.setState({emailError:'block'})
    }
  }
  validateName(e){
    e.preventDefault();
    if(this.props.firstName !== '' && this.props.firstName.length > 2){
      if(this.props.lastName !== '' && this.props.lastName.length > 2){
        fetch('/validate/validate/firstname', 
          {
            method: 'POST',
            credentials:'include',
            headers: new Headers({
              'Accept': 'application/json, text/javascript, */*',
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
              'X-Requested-With': 'XMLHttpRequest'
            }),
            body:'first_name='+this.props.firstName
          }).then((res)=>{
            return res.text();
          }).then((res)=>{
            if(res==="true"){
              fetch('/validate/validate/lastname', 
              {
                method: 'POST',
                credentials:'include',
                headers: new Headers({
                  'Accept': 'application/json, text/javascript, */*',
                  'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                  'X-Requested-With': 'XMLHttpRequest'
                }),
                body:'last_name='+this.props.lastName
              }).then((res)=>{
                 return res.text();
              }).then((res)=>{
                if(res==="true"){
                  this.props.sendTracking('submit', 'click go','Landing-mobile-name');
                  setTimeout(()=>{
                    document.getElementById('phone_number').focus();
                    document.getElementById('disclaimer').style.display = 'block';
                  },1000)
                  document.getElementById('slider').style.marginLeft='-200%';
                }else{
                  this.setState({lastError:'block'})
                }
              });
          }else
            this.setState({firstError:'block'})
        });
        // setTimeout(()=>{
        //   document.getElementById('phone_number').focus();
        //   document.getElementById('disclaimer').style.display = 'block';
        // },1000)
        // document.getElementById('slider').style.marginLeft='-200%';
      }else{
        this.setState({lastError:'block'})
      }
    }else{
      this.setState({firstError:'block'})
    }
  }
  validatePhone(e){
    e.preventDefault();
    
    if(/\(\d{3}\) \d{3} - \d{4}/.test(this.props.phone)){
      this.props.sendTracking('submit', 'click get my quotes now','Landing-mobile-getmyquotes');
      fetch('/validate/validate/phone', 
      {
        method: 'POST',
        credentials:'include',
        headers: new Headers({
          'Accept': 'application/json, text/javascript, */*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'X-Requested-With': 'XMLHttpRequest'
        }),
        body:'phone_number='+this.props.phone.match(/\d/g).join('')
      }).then((res)=>{
        return res.text();
      }).then((res)=>{
        if(res==="true"){
          //check Targus
          fetch("/validate/calculator/confirmation",{
            method: 'GET',
            credentials:'include',
            headers: new Headers({
              'Accept': 'application/json, text/javascript, */*',
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
              'X-Requested-With': 'XMLHttpRequest'
            })
          });
          fetch('/targus', 
          {
            method: 'POST',
            credentials:'include',
            headers: new Headers({
              'Accept': 'application/json, text/javascript, */*',
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
              'X-Requested-With': 'XMLHttpRequest'
            }),
            body:'first_name='+this.props.firstName+'&last_name='+this.props.lastName+'&email_address='+this.props.email+'&phone_number='+this.props.phone
          }).then((res)=>{
            return res.text();
          }).then((res)=>{
             conversionScripts(1063537684, "CH78CO6xZRCUmJH7Aw");
            if(res==='true'){
              //go to Thank You

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
            }else
              this.props.changeView('Step5');
          })
        }else
          this.setState({phoneError:'block'})
      });
    }else{
      this.setState({phoneError:'block'})
    }
  }
  handleEmailFocus(e){
    this.setState({emailError:'none'})
  }
  handleFirstFocus(e){
    this.setState({firstError:'none'})
  }
  handleLastFocus(e){
    this.setState({lastError:'none'})
  }
  handlePhoneFocus(e){
    this.setState({phoneError:'none'})
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
  render() {
    return (
      <section id="step4">
          <div className="move-details">
            <ul>
              <li><img src={greenCheckmark} alt="checked"/> Move Details
              </li><li><img src={greenCheckmark} alt="checked"/> Movers Found
              </li><li><img src={clearCheckmark} alt="checked"/> View Quotes</li>
            </ul>
          </div>
          <div className="next-steps">
            <h4>Next, our system will display your ballpark estimate.</h4>
          </div>
          <div id="slider" className="clearfix">
            <div id="email" className="forms">
              <h2>
               Valid Email:
              </h2>
              <span className="error-msg" style={{display:this.state.emailError}}><img src={error} alt="Error!" />Enter Valid Email</span>
              <div>
                <form id="f-step3-1">
                  <input type="text" id="email_address" autoFocus className={(this.state.emailError === 'none') ? '':'error'} name="email" placeholder="Email Address" value={this.props.email} onChange={this.props.handleChange} onFocus={this.handleEmailFocus} autoComplete="off"/>
                  <button className="cta" type="submit" onClick={this.validateEmail}>GO</button>
                </form>
              </div>
              <div className="extra">
                <img src={verisignlogo} height="26" width="51" alt="VeriSign Secured"/>
              </div>        
            </div>
            <div id="name" className="forms">
              <h2>
                Full Name:
              </h2>
              <span className="error-msg" style={{display:this.state.emailError}}><img src={error} alt="Error!"/>Enter Valid Name</span>
              <div>
                <form  id="f-step3-2">
                  <input type="text" id="first_name" className={(this.state.firstError === 'none') ? 'input_col_ii':'input_col_ii error'} name="firstName" placeholder="First" value={this.props.firstName} onChange={this.props.handleChange} onFocus={this.handleFirstFocus} autoComplete="off"/>
                  <input type="text" id="last_name" className={(this.state.lastError === 'none') ? 'input_col_ii':'input_col_ii error'} name="lastName" placeholder="Last" value={this.props.lastName} onChange={this.props.handleChange} onFocus={this.handleLastFocus} autoComplete="off"/>
                  <button className="cta" type="submit" onClick={this.validateName}>SUBMIT</button>
                </form>
              </div>  
              <div className="extra">
                <img src={verisignlogo} height="26" width="51" alt="VeriSign Secured"/>
              </div>      
            </div>
            <div id="phone" className="forms">
              <h2>
                Enter Your Number:
              </h2>
              <span className="error-msg" style={{display:this.state.phoneError}}><img src={error} alt="Error!"/>Enter Valid Phone</span>
              <div>
                <form id="f-step3-3">
                  <input type="tel" className={(this.state.phoneError === 'none') ? '':'error'} id="phone_number" name="phone" placeholder="Valid Phone Number" value={this.props.phone} onChange={this.props.handleChange} onFocus={this.handlePhoneFocus} onKeyDown={this.formatPhone} maxLength="16" autoComplete="off"/>
                  
                  <button className="cta" type="submit" id="get-my-quotes" onClick={this.validatePhone}>Get My Quotes</button>
                </form>
              </div>  
              <div className="extra">
                <img src={verisignlogo} height="26" width="51" alt="VeriSign Secured"/>
              </div>    
            </div>
            
          </div>
          <div id="disclaimer">
              <p>By clicking on the "GET MY QUOTES" button, I agree to the Terms of Use, Privacy Policy and Disclaimer.  My "click" provides express written consent to be contacted directly by companies to quote my move or offer other products or services via emails, text messages, or calls/prerecorded messages via automatic dialing systems even if I am on a DNC list.  Consent is not a condition of purchasing any product or service.</p>
            </div>
        </section>
    )
  }
}
function conversionScripts(id, label){
  //if(window.location.hostname=="www.gotmovers.com"){
    
    window.dotq = window.dotq || [];
    window.dotq.push(
      {
        'projectId':'10001059850032',
        'properties': {
          'pixelId': '431153',
          'qstrings': {
            'et':'custom',
            'ea':'conversion'
          }
        }
      }
    );
    //Google Analytics Mobile-Goal Conversion
    window.ga('send', {
      hitType: 'event',
      eventCategory: 'Conversion',
      eventAction: 'Landing-mobile-test',
      eventLabel: 'Validate'
    });
    
    //uet 
    window.uetq = window.uetq || []; 
    window.uetq.push({'ea': 'Gconversion'});  // Pass the computed revenue 
    
    //google conversion script
    var image = new Image(1,1); 

    image.src = "http://www.googleadservices.com/pagead/conversion/"+id+"/?label="+label + "&script=0";
    document.body.appendChild(image);
  //}
}
export default Step4;