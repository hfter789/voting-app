import React, { Component } from 'react';
import Relay from 'react-relay';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router';

class VoteList extends Component {
  render() {
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
            this.props.voteList.voteList.map((voteTopicObj) => {
              return (
                <Link to={`/vote/${voteTopicObj.id}`} key={voteTopicObj.id}>
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

const VoteListContainer = Relay.createContainer(VoteList, {
  fragments: {
    voteList: () => Relay.QL`
      fragment on VoteList {
        voteList {
          id
          topic
        }
      }
    `
  }
});

export default VoteListContainer;
