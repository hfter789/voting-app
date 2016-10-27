import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';

class Home extends Component {
  render() {
    return (
      <Paper
        zDepth={2}
        style={{padding: '20px', textAlign: 'center', margin: '50px'}}
      >
        <div
          style={{maxWidth: '650px', margin: '0 auto'}}
        >
          <h2> Go Vote! </h2>
          <h4> Below are polls hosted by Go Vote!. </h4>
          <h4> Select a poll to see the results and vote, or sign-in to make a new poll. </h4>
          <hr/  >
          <List>
            <ListItem primaryText="Inbox" />
            <ListItem primaryText="Starred" />
            <ListItem primaryText="Sent mail" />
            <ListItem primaryText="Drafts" />
            <ListItem primaryText="Inbox" />
          </List>
        </div>
      </Paper>
    );
  }
}

export default Home;
