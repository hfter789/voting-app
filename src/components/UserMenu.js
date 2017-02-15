/* global FB*/

import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

export class UserMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.handleMyInfo = this.handleMyInfo.bind(this);
  }

  componentDidMount() {
    // TODO: if possible, make FB fully loaded before this is mounted
    if (typeof(FB) !== 'undefined' && FB !== null ) {
      const self = this;
      FB.Event.subscribe('auth.statusChange',
        self.onStatusChange.bind(this));
      FB.getLoginStatus();
    }
  }

  handleMyInfo(response) {
    if (response && !response.error) {
      this.props.setLoginUser({
        userID: response.id,
        fullName: response.name,
      });
      this.setState({
        fullName: response.name,
      });
    }
  }

  onStatusChange(response) {
    if( response.status === 'connected' ) {
      FB.api('/me', this.handleMyInfo);
    }
  }

  login() {
    FB.login(function(response) {
      if (response.authResponse) {
        FB.api('/me', this.handleMyInfo);
      }
    });
  }

  logout() {
    const self = this;
    FB.api('/me/permissions', 'delete', function(response) {
      self.props.setLoginUser({
        userID: null,
        fullName: null,
      });
      self.setState({
        fullName: null,
      });
    });
  }

  render() {
    const { fullName } = this.state;
    if (fullName) {
      return (
        <IconMenu
          iconButtonElement={
            <div style={{margin: '-10px 0'}}>
              <div style={{
                display: 'inline-block',
                color: '#FFF',
                padding: '12px 0',
                verticalAlign: 'top',
                height: '24px',
                lineHeight: '24px',
              }}>{ fullName }</div>
              <IconButton><MoreVertIcon color='#FFF' /></IconButton>
            </div>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          iconStyle={{color: '#fff'}}
        >
          <MenuItem primaryText='Log Out' onClick={this.logout} />
        </IconMenu>
      );
    }
    return (
      <div
        style={{ color: '#FFF', paddingTop: '5px', cursor: 'pointer' }}
        onClick={this.login}
      >
        Login Via FB
      </div>
    );
  }
}

export default UserMenu;