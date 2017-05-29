/* globals btoa, sessionStorage */
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import Paper from 'material-ui/Paper';
import injectSession from '../network/relay-inject-session';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setLoginUser = this.setLoginUser.bind(this);
  }

  setLoginUser(userObject) {
    const { accessToken } = userObject;
    sessionStorage.setItem('session', accessToken);
    injectSession(accessToken);
  }

  render() {
    const { location: { pathname }, children } = this.props;
    return (
        <MuiThemeProvider>
          <div>
              <Header setLoginUser={this.setLoginUser} pathname={pathname} />
              <Paper
                zDepth={2}
                style={{
                  padding: '20px 50px',
                  margin: '50px auto',
                }}
              >
                { children }
              </Paper>
           </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
