import React, { Component } from 'react';
import Relay from 'react-relay';
import Divider from 'material-ui/Divider';
import VoteListComponent from './VoteListComponent';

class VoteList extends Component {
  render() {

    return (
      <div>
        <h2> Go Vote! </h2>
        <h4> Below are polls hosted by Go Vote!. </h4>
        <h4> Select a poll to see the results and vote, or sign-in to make a new poll. </h4>
        <Divider />
        <VoteListComponent voteList={this.props.root.vote} />
      </div>
    );
  }
}

const VoteListContainer = Relay.createContainer(VoteList, {
  initialVariables: {
    id: null
  },

  fragments: {
    root: () => Relay.QL`
      fragment on VoteRoot {
        vote(id: $id) @relay(plural: true) {
          id,
          topic
        }
      }
    `
  }
});

export default VoteListContainer;
