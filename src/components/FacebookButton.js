import React, { Component } from 'react';

class FacebookBtn extends Component {
  constructor(props) {
    super(props);

    this.FB = this.props.fb;
    this.state = {};
  }

  componentDidMount() {
    const self = this;
    self.FB.Event.subscribe('auth.statusChange',
      self.onStatusChange.bind(this));
    self.FB.getLoginStatus();
  }

  onStatusChange(response) {
    const self = this;
    if( response.status === "connected" ) {
      const userID = response.authResponse.userID;
      self.props.fb.api(
        `${userID}`,
        function (response) {
          if (response && !response.error) {
            self.props.setLoginUser({
              userID: userID,
              fullName: response.name,
            });
            self.setState({
              fullName: response.name,
            });
          }
        }
      );
    }
  }

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
