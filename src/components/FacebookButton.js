import React, { Component } from 'react';

class FacebookBtn extends Component {
  constructor(props) {
    super(props);

    this.FB = props.fb;
  }

  componentDidMount() {
    // this.FB.Event.subscribe('auth.logout', 
    //    this.onLogout.bind(this));
    this.FB.Event.subscribe('auth.statusChange', 
       this.onStatusChange.bind(this));
  }

  onStatusChange(response) {
    if( response.status === "connected" ) {
      this.props.setLoginUser(response.authResponse.userID);
    }
  }

  render() {
    return (
      <div 
        className="fb-login-button" 
        data-max-rows="1" 
        data-size="large" 
        data-show-faces="false" 
        data-auto-logout-link="true"
      />
    );
 }
}

export default FacebookBtn;
