import React, { Component } from 'react';

class FacebookBtn extends Component {

  render() {
    const { fullName } = this.state;
    return (
      <div>
        { fullName }
        <div 
          className="fb-login-button" 
          data-max-rows="1" 
          data-size="large" 
          data-show-faces="false" 
          data-auto-logout-link="true"
        />
      </div>
    );
 }
}

export default FacebookBtn;
