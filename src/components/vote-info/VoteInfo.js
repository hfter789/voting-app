import React, { Component } from 'react';
import Relay from 'react-relay';

class VoteInfo extends Component {
  render() {
    const { voteInfo } = this.props;
    return (
      <div>
        <h2> {voteInfo.topic} </h2>
        {
          voteInfo.voteOptions.map((voteOption) => {
            return <div>{voteOption.desc}:{voteOption.voteCount}</div>
          })
        }
      </div>
    );
  }
}

const VoteInfoContainer = Relay.createContainer(VoteInfo, {
  fragments: {
    voteInfo: () => Relay.QL`
      fragment on VoteInfo {
        voteId
        topic
        voteOptions {
          desc
          voteCount
        }
      }
    `
  }
});

export default VoteInfoContainer;
