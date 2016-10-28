import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../header/Header';
import Paper from 'material-ui/Paper';

class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
        <div>
            <Header />
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
