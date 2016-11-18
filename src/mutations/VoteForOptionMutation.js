import Relay from 'react-relay';

export default class VoteForOptionMutation extends Relay.Mutation {
  static fragments = {
    voteInfo: () => Relay.QL`
      fragment on VoteInfo {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{voteForOption}`;
  }
  getCollisionKey() {
    return `check_${this.props.voteInfo.id}`;
  }
  getFatQuery() {
    // from output fields by schema
    return Relay.QL`
      fragment on voteForOptionPayload {
        voteInfo {
          id,
          topic,
          voteOptions,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        voteInfo: this.props.voteInfo.id,
      },
    }];
  }
  getVariables() {
    return {
      id: this.props.voteInfo.id,
      voteOptionIndex: this.props.optionIndex
    };
  }
  // getOptimisticResponse() {
  //   // need to work on this to see what are the args available
  //   return {
  //     vote: this.props.voteInfo,
  //   };
  // }
}