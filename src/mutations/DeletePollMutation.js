import Relay from 'react-relay';

export default class DeletePollMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{deletePoll}`;
  }
  getCollisionKey() {
    return `check_${this.props.id}`;
  }
  getFatQuery() {
    // from output fields by schema
    return Relay.QL`
      fragment on deletePollMutationPayload {
        clientMutationId
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        clientMutationId: this.props.clientMutationId,
      },
    }];
  }
  getVariables() {
    return {
      id: this.props.id,
      userId: this.props.userID,
    };
  }
}