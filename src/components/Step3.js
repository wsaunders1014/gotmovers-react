import React, { Component } from 'react';
import MoveInfo from './MoveInfo';
import checkmark from '../img/checkmark.png';
import success from '../img/success-icon.png';

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state={percent:0,message:'Calculating'};
    this.animateBar = this.animateBar.bind(this);
  }
  componentDidMount() {
    this.animateBar();
  }
  render() {
    return (
      <section id="step3">
        <div className="loader_area">
          <MoveInfo {...this.props} />
          <div id="success"><img id="start" src={checkmark} alt="checkmark" /> <img id="done" src={success} alt="Success!" /></div>
         
          <h3 id="calculating">Calculating...</h3>
          <div className="bar-holder">
            <div className="bar" ref={(bar)=>{this.bar = bar}}></div>
          </div>
          <p><span id="loader-text">0</span>%</p>
        </div>
      </section>
    )
  }
  animateBar(){
    var percent=5;
    var that = this;
    setTimeout(()=>{
      var interval = setInterval(()=>{
        if(percent <35){
          percent++;
          document.getElementById('loader-text').innerHTML = percent+1;
          this.bar.style.width = percent+'%';
        }else{
          clearInterval(interval);
          document.getElementById('calculating').innerHTML = 'Searching for Movers...';
          setTimeout(()=>{
            interval = setInterval(()=>{
              if(percent < 71){
                percent++;
                document.getElementById('loader-text').innerHTML = percent+1;
                this.bar.style.width = percent+'%';
              }else{
                clearInterval(interval);
                document.getElementById('calculating').innerHTML = 'Movers Found';
                document.getElementById('success').style.display = 'block';
                setTimeout(()=>{
                  interval = setInterval(()=>{
                    if(percent < 90){
                      percent++;
                      document.getElementById('loader-text').innerHTML = percent+1;
                      this.bar.style.width = percent+'%';
                    }else{
                      clearInterval(interval);
                      document.getElementById('start').style.display = 'none';
                      document.getElementById('done').style.display = 'inline';
                      interval = setInterval(()=>{
                        if(percent <99){
                          percent++;
                          document.getElementById('loader-text').innerHTML = percent+1;
                          this.bar.style.width = percent+'%';
                        }else{
                          clearInterval(interval);
                          this.props.sendTracking('submit', 'loading','Landing-mobile-loading');
                          setTimeout(()=>{
                            that.props.changeView('Step4');
                          },500)
                        }
                      },30);
                    }
                  },80)
                },400)
              }
            },50)
          },500)
        }
      },90)
    },400);
  }
}
export default Step3;