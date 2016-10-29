import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router';

class Home extends Component {
  render() {
    const voteList = [
      {
        id: 1,
        topic: 'Inbox',
      },
      {
        id: 2,
        topic: 'Starred',
      },
      {
        id: 3,
        topic: 'Sent mail',
      },
      {
        id: 4,
        topic: 'Drafts',
      },
      {
        id: 5,
        topic: 'Inbox'
      },
    ];
    return (
      <div
        style={{maxWidth: '650px', margin: '0 auto'}}
      >
        <h2> Go Vote! </h2>
        <h4> Below are polls hosted by Go Vote!. </h4>
        <h4> Select a poll to see the results and vote, or sign-in to make a new poll. </h4>
        <hr/  >
        <List>
          { 
            voteList.map((voteTopicObj) => {
              return (
                <Link to={`/vote/${voteTopicObj.id}`}>
                  <ListItem primaryText={voteTopicObj.topic} />
                </Link>
              );
            })
          }
        </List>
      </div>
    );
  }
}

export default Home;
