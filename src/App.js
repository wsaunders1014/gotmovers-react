import React, { Component } from 'react';
import './css/App.css';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import Step6 from './components/Step6';
import Overlay from './components/Overlay';
import ZipHelp from './components/ZipHelp';
import MoveSize from './components/MoveSize';
import Calendar from './components/Calendar';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import Info from './components/Info';
class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      fromZip:'',
      fromCity:'',
      fromState:'',
      moveSize:'',
      moveDate:'',
      toZip:'',
      toCity:'',
      toState:'',
      email:'',
      firstName:'',
      lastName:'',
      phone:'',
      view:'Step1',
      dialog:false,
      dialogContent:'',
      quote:'Loading...'
    }
    this.openOverlay = this.openOverlay.bind(this);
    this.chooseFromZip = this.chooseFromZip.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeOverlay = this.closeOverlay.bind(this);
    this.chooseZip = this.chooseZip.bind(this);
    this.chooseMoveSize = this.chooseMoveSize.bind(this);
    this.chooseDate = this.chooseDate.bind(this);
    this.viewSwitch = this.viewSwitch.bind(this);
    this.changeView = this.changeView.bind(this);
    this.chooseToZip = this.chooseToZip.bind(this);
    this.calculateDistance = this.calculateDistance.bind(this);
    this.sendTracking = this.sendTracking.bind(this);
  }
  openOverlay(content){
    this.setState({dialog:true, dialogContent:content});
  }
  closeOverlay(){
    this.setState({dialog:false, dialogContent:''});
  }
  chooseFromZip(zip,city,state){
    this.sendTracking('submit', 'click get moving','Landing-mobile-step1');
    this.setState({fromZip:zip, fromCity:city,fromState:state, dialog:true, dialogContent:'movesize'});
  }
  chooseToZip(zip,city,state){
    this.sendTracking('submit', 'click calculate cost','Landing-mobile-step2');
    this.setState({toZip:zip, toCity:city, toState:state});
  }
  changeView(view){
    this.setState({view:view});
    if(view==='Step6')
      this.calculateDistance();
  }
  //ZIPHELP action
  chooseZip(e){
    if(this.state.view==='Step1')
      this.setState({fromZip:e.target.getAttribute('data-zipcode'),dialog:false});
    else{
      this.setState({toZip:e.target.getAttribute('data-zipcode'),dialog:false});
    }
    
  }
  handleChange(e){
    var value = e.target.value;
    const name = e.target.name;
  
    if(name==='fromZip'){
      if(value.length < 5)
        document.getElementById('step1').children[2].children[0].innerHTML='Moving From: ';
    }
    this.setState({[name]:value});
  }
  chooseMoveSize(movesize){
    this.sendTracking('submit','select size','Landing-mobile-size');
    this.setState({moveSize:movesize, dialogContent:'calendar'})
  }
  chooseDate(date){
    this.sendTracking('submit','select date','Landing-mobile-date');
    this.setState({moveDate:date, view:'Step2'})
    this.closeOverlay();
  }
  render() {
    return (
      <div className="App">
        {this.viewSwitch()}
        <Overlay isOn={this.state.dialog} content=''>
          { 
            this.state.dialogContent==='ziphelp' &&
            <ZipHelp sendTracking={this.sendTracking} chooseZip={this.chooseZip} closeOverlay={this.closeOverlay}/>
          }
          {
            this.state.dialogContent==='movesize' &&
            <MoveSize sendTracking={this.sendTracking} chooseMoveSize={this.chooseMoveSize} moveSize={this.state.moveSize}/>
          }
          {
            this.state.dialogContent==='calendar' && 
            <Calendar sendTracking={this.sendTracking} moveDate={this.state.moveDate} chooseDate={this.chooseDate}/>
          }
          {this.state.dialogContent ==='privacy' &&
            <PrivacyPolicy closeOverlay={this.closeOverlay} />
          }
          {this.state.dialogContent ==='terms' &&
            <TermsOfUse closeOverlay={this.closeOverlay} />
          }
          {this.state.dialogContent ==='info' &&
            <Info closeOverlay={this.closeOverlay} />
          }
        </Overlay>
      </div>
    );
  }
  viewSwitch() {
    switch(this.state.view) {
      case 'Step1':
        return(<Step1 sendTracking={this.sendTracking} openOverlay={this.openOverlay} fromZip={this.state.fromZip} handleChange={this.handleChange} chooseFromZip={this.chooseFromZip}/>);
      case 'Step2':
        return(<Step2 sendTracking={this.sendTracking} changeView={this.changeView} chooseToZip={this.chooseToZip} openOverlay={this.openOverlay} toZip={this.state.toZip} toCity={this.state.toCity} toState={this.state.toState} handleChange={this.handleChange} moveSize={this.state.moveSize} moveDate={this.state.moveDate} fromCity={this.state.fromCity} fromState={this.state.fromState} />)
      case 'Step3':
        return(<Step3 sendTracking={this.sendTracking} toZip={this.state.toZip} toCity={this.state.toCity} toState={this.state.toState} moveSize={this.state.moveSize} moveDate={this.state.moveDate} fromCity={this.state.fromCity} fromState={this.state.fromState} changeView={this.changeView} />)
      case 'Step4':
        return(<Step4 sendTracking={this.sendTracking} calculateDistance={this.calculateDistance} handleChange={this.handleChange} email={this.state.email} firstName={this.state.firstName} lastName={this.state.lastName} phone={this.state.phone} changeView={this.changeView}/>);
      case 'Step5':
        return(<Step5 sendTracking={this.sendTracking} phone={this.state.phone} handleChange={this.handleChange} calculateDistance={this.calculateDistance} changeView={this.changeView}/>);
      case 'Step6':
        return(<Step6 sendTracking={this.sendTracking} quote={this.state.quote} />);
      default:
        break;
    }
  }
  //for debugging
  componentDidMount() {
    // if(window.location.pathname!=='/')
    //   this.setState({view:window.location.pathname.slice(1)})
    var that = this;
    document.getElementById('privacy-policy').addEventListener('click', function(e){
      e.preventDefault();
      that.setState({dialog:true, dialogContent:'privacy'});
    });
    document.getElementById('terms-of-use').addEventListener('click', function(e){
      e.preventDefault();
      that.setState({dialog:true, dialogContent:'terms'});
    });
    document.getElementById('info-show').addEventListener('click', function(e){
      e.preventDefault();
      that.setState({dialog:true, dialogContent:'info'});
    });
  }
  sendTracking(category,action,label){
    if(window.location.hostname === "www.gotmovers.com"  || window.location.hostname ==="gotmovers.com" ){
      window.ga('send', {
        hitType: 'event',
        eventCategory: category,
        eventAction: action,
        eventLabel: label
      });
    }
  }
  calculateDistance(){   
    var start = ""+this.state.fromZip;
    var end = ""+this.state.toZip;
    var that= this;
    var service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [start],
      destinations: [end],
      travelMode: window.google.maps.TravelMode.DRIVING,
      unitSystem: window.google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false
    }, function(response, status) {
      if (status !== window.google.maps.DistanceMatrixStatus.OK) {
        //alert('Error was: ' + status);
        alert('Error: Please try again at a later time.');
      } else {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        var test = '';
        var str1 = origins.toString();
        var str2 = destinations.toString();
        if( str1.match(/\bUSA\b/) && str2.match(/\bUSA\b/)){
          try{
            for (var i = 0; i < origins.length; i++) {
              var results = response.rows[i].elements;
              for (var j = 0; j < results.length; j++) {
                test += results[j].distance.text;
              }
            }
            var rooms = that.state.moveSize;
    
            fetch('/validate/calculator/calc',
            {
              method:'POST',
              credentials:'include',
              headers: new Headers({
                'Accept': 'application/json, text/javascript, */*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                'X-Requested-With': 'XMLHttpRequest'
              }),
              body:'rooms='+rooms+'&miles='+test
            }).then((data)=>{
              return data.json();
            }).then((data)=>{
              var d = data; 
              var text = "$" + d.min + " - $" + d.max;
              that.setState({quote:text})
            });    
          } catch(e){
            
          }
        }
      }
    });
  }
}
export default App;
