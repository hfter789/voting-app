import React, { Component } from 'react';
import Relay from 'react-relay';
import VoteListComponent from './VoteListComponent';

class VoteHistory extends Component {
  componentDidMount() {
    const { relay, userId } = this.props;
    relay.setVariables(
      userId,
    );
  }

  componentWillReceiveProps(nextProps) {
    const { userId } = nextProps;
    if (userId !== this.props.userId) {
      this.props.relay.setVariables(
        userId,
      );
    }
  }

  render() {
    return (
      <div
        style={{maxWidth: '650px', margin: '0 auto'}}
      >
        <h2> Go Vote! </h2>
        <h4> Below are votes that you participated in </h4>
        <hr />
        <VoteListComponent voteList={this.props.root.userVote} />
      </div>
    );
  }
}

const VoteHistoryContainer = Relay.createContainer(VoteHistory, {
  initialVariables: {
    userId: null
  },

  fragments: {
    root: () => {
      return Relay.QL`
        fragment on VoteRoot {
          userVote(userId: "test") {
            id,
            topic
          }
        }
      `
    }
  }
});

export default VoteHistoryContainer;
