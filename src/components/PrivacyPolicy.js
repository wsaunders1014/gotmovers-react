import React, { Component } from 'react';
class PrivacyPolicy extends Component {
	render(){
		return(
			<div className="privacy">
				<div className="close-btn" onClick={this.props.closeOverlay}>+</div>
				<h2>Privacy Policy</h2> 
				The following privacy policy explains our online information practice. 
				By using this site and its services, you accept the following terms of practice. 
				Should these practices change, GotMovers.com will post any amendments and adjustments on this page. 
				he following practices only apply to GotMovers.com. 
				<br/><br/>
				<b>Information Collection</b>
				<br/>The information we collect, including but not limited to your name and email address, 
				is voluntarily submitted by our visitors in order to fulfill a particular request, and will 
				only be used in the manner in which it was intended by the visitor. This is not a requirement 
				in order to visit our site. GotMovers.com insures maximum security in maintaining the integrity
				of our visitors' information. 
				<br/><br/>
				<b>Cookies (Tracking)</b><br/>Cookies are useful for 
				allocating data on certain visitor trends and patterns, such as operating systems, our number 
				of visitors, and which pages are most frequented. GotMovers.com may use tracking and cookies for 
				the express purpose of improving its services. Visitors can adjust their browser setting to notify 
				whenever they are receiving a cookie, with an option of accepting or declining. Declining cookies
				may affect your use of certain services on our website. 
				<br/><br/>
				<b>Information Distribution</b>
				<br/> We may also share aggregate cookie information with trusted third parties that assist in the
				operation of our website. However, the information disclosed will never specify identifiable 
				information. GotMovers.com will only release private information to protect ours or others' 
				rights, enforce our policies, or in compliance with the law. 
				<br/><br/>
				<b>Children's Online Privacy
				Protection Act Compliance</b><br/>GotMovers.com adheres to the requirements of COPPA 
				(Children's Online Privacy Protection Act). Our website, products, and services are only for 
				people who are at least 13 years old or older. We do not collect any information from anyone 
				under the age of 13. <br/><br/> If you have any questions or concerns about our policies,
				visit our <a target="_blank" rel="noopener noreferrer" href="http://gotmovers.com/contact-us.html">contact</a> page.

				<div onClick={this.props.closeOverlay} style={{textDecoration:'underline',marginTop:'20px',fontWeight:700,textAlign:'center'}}>
					CLOSE
				</div>
			</div>
		)
	}
}
export default PrivacyPolicy;