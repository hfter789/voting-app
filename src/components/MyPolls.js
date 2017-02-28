import React, { Component } from 'react';
import Relay from 'react-relay';
import VoteListComponent from './VoteListComponent';

class MyPoll extends Component {
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
      <div>
        <h2> Go Vote! </h2>
        <h4> Below are votes that you created </h4>
        <hr />
        <VoteListComponent voteList={this.props.root.userVote} />
      </div>
    );
  }
}

const MyPollContainer = Relay.createContainer(MyPoll, {
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

export default MyPollContainer;
