/* global FB*/

import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FacebookButton from './FacebookButton';

class Header extends Component {
  render() {
    return (
      <div>
        <AppBar
          title="Go Vote!"
          iconElementLeft={<div />}
          iconElementRight={<FacebookButton fb={FB} setLoginUser={this.props.setLoginUser} />}
          iconStyleRight={{margin: '20px 25px 0 auto'}}
        />
      </div>
    );
  }
}

export default Header;
