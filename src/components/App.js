import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import Paper from 'material-ui/Paper';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setLoginUser = this.setLoginUser.bind(this);
  }

  setLoginUser(userID) {
    this.setState({
      userID: userID
    });
  }

  render() {
    return (
        <MuiThemeProvider>
          <div>
              <Header setLoginUser={this.setLoginUser} />
              <Paper
                zDepth={2}
                style={{padding: '20px', textAlign: 'center', margin: '50px'}}
              >
                {this.props.children}
              </Paper>
           </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
