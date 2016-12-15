/* global FB*/

import React, { Component } from 'react';
import FacebookButton from './FacebookButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

export class UserMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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

  onStatusChange(response) {
    const self = this;
    if( response.status === 'connected' ) {
      const userID = response.authResponse.userID;
      FB.api(
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
    let fbBtn = null;
    const { fullName } = this.state;
    if (fullName) {
      return (
        <IconMenu
          iconButtonElement={
            <div style={{margin: '-10px 0'}}>
              <div style={{
                display: 'inline-block',
                padding: '12px 0',
                verticalAlign: 'top',
                height: '24px',
                lineHeight: '24px',
              }}>{ fullName }</div>
              <IconButton><MoreVertIcon /></IconButton>
            </div>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          iconStyle={{color: '#fff'}}
        >
          <MenuItem primaryText={fullName} />
        </IconMenu>
      );
    }
    return (
      <div>
        Login Via FB
      </div>
    );
  }
}

export default UserMenu;