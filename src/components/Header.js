import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import UserMenu from './UserMenu';

class Header extends Component {
  render() {
    return (
      <div>
        <AppBar
          title="Go Vote!"
          iconElementLeft={<div />}
          iconElementRight={<UserMenu setLoginUser={this.props.setLoginUser} />}
          iconStyleRight={{ width: '50%', margin: 0 }}
        />
      </div>
    );
  }
}

export default Header;
