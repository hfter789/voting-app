import React, { Component } from 'react';
import Relay from 'react-relay';
import VoteSection from './VoteSection';
import VoteChart from './VoteChart';

class VoteInfo extends Component {
  render() {
    const { voteInfo } = this.props;
    return (
      <div>
        <VoteSection voteInfo={voteInfo} />
        <VoteChart voteOptions={voteInfo.voteOptions} />
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
