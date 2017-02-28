/* global FB*/

import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AddIcon from 'material-ui/svg-icons/content/add';
import { browserHistory } from 'react-router';

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
    // if (typeof(FB) !== 'undefined' && FB !== null ) {
    //   const self = this;
    //   FB.Event.subscribe('auth.statusChange',
    //     self.onStatusChange.bind(this));
    //   FB.getLoginStatus();
    // }
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
    const { pathname } = this.props;
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
              <IconButton>
                <MoreVertIcon color='#FFF' />
              </IconButton>
            </div>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          iconStyle={{color: '#fff'}}
        >
          <MenuItem primaryText='My Votes' onClick={() => { browserHistory.push('/voteHistory') } } />
          <MenuItem primaryText='Log Out' onClick={this.logout} />
        </IconMenu>
      );
    }
    return (
      <div
        style={{
          color: '#FFF',
          textAlign: 'right',
          paddingRight: 30
        }}
      >
        <Tabs
          style={{ paddingRight: 30, display: 'inline-block' }}
          value={pathname}
        >
          <Tab
            style={{ width: 110, height: 64 }}
            label='HOME'
            value='/votelist'
            onActive={ () => { browserHistory.push('/votelist') } }
          />
          <Tab
            style={{ width: 110, height: 64 }}
            label='MY POLLS'
            value='/mypolls'
            onActive={ () => { browserHistory.push('/mypolls') } }
          />
          <Tab
            style={{ width: 110, height: 64 }}
            icon={<AddIcon />}
            value='/newpoll'
            onActive={ () => { browserHistory.push('/newpoll') } }
          />
        </Tabs>
        <span onClick={this.login}>
          Login Via FB
        </span>
      </div>
    );
  }
}

export default UserMenu;