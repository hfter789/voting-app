import Relay from 'react-relay';

export default class CreatePollMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{createPoll}`;
  }
  getCollisionKey() {
    return `check_${this.props.topic}`;
  }
  getFatQuery() {
    // from output fields by schema
    return Relay.QL`
      fragment on createPollMutationPayload {
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
        voteInfo: this.props.topic,
      },
    }];
  }
  getVariables() {
    return {
      topic: this.props.topic,
      voteOptions: this.props.voteOptions,
    };
  }
}