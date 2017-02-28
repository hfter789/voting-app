import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import get from 'lodash/get';
import Header from './Header';
import Paper from 'material-ui/Paper';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setLoginUser = this.setLoginUser.bind(this);
  }

  componentDidMount() {
    this.getIp();
  }

  setLoginUser(userObject) {
    this.setState({
      userID: userObject.userID,
      fullName: userObject.fullName,
    });
  }

  getIp() {
    const self = this;
    axios.get('http://jsonip.com')
      .then(function (response) {
        self.setState({
          clientIp: get(response, 'data.ip'),
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { userID, clientIp } = this.state;
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
                  userID: 'test' || userID || clientIp,
                })}
              </Paper>
           </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
