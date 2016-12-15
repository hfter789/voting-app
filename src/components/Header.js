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
          iconStyleRight={{margin: '20px 25px 0 auto'}}
        />
      </div>
    );
  }
}

export default Header;
