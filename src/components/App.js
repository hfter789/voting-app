/* globals btoa */
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import Paper from 'material-ui/Paper';
import cookie from 'react-cookie';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setLoginUser = this.setLoginUser.bind(this);
  }

  setLoginUser(userObject) {
    this.setState({
      userID: userObject.accessToken,
      fullName: userObject.fullName,
    });
    cookie.save('session', userObject.accessToken);
  }

  render() {
    const { userID } = this.state;
    const { location: { pathname } } = this.props;
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
                {this.props.children && React.cloneElement(this.props.children, {
                  userID,
                })}
              </Paper>
           </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
