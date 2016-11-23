/* global FB*/

import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FacebookButton from './FacebookButton';

class Header extends Component {
  render() {
    let fbBtn = null;
    if (typeof(FB) !== 'undefined' && FB !== null ) {
      fbBtn = <FacebookButton fb={FB} setLoginUser={this.props.setLoginUser} />;
    }

    return (
      <div>
        <AppBar
          title="Go Vote!"
          iconElementLeft={<div />}
          iconElementRight={fbBtn}
          iconStyleRight={{margin: '20px 25px 0 auto'}}
        />
      </div>
    );
  }
}

export default Header;
