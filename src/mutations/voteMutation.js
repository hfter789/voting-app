import Relay from 'react-relay';

export default class VoteMutation extends Relay.Mutation {
  static fragments = {
    voteOption: () => Relay.QL`
      fragment on voteOption {
        desc,
        voteCount,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{Vote}`;
  }
  getCollisionKey() {
    return `check_${this.props.voteOption.id}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on CheckHidingSpotForTreasurePayload @relay(pattern: true) {
        hidingSpot {
          hasBeenChecked,
          hasTreasure,
        },
        game {
          turnsRemaining,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        hidingSpot: this.props.hidingSpot.id,
        game: this.props.game.id,
      },
    }];
  }
  getVariables() {
    return {
      id: this.props.hidingSpot.id,
    };
  }
  getOptimisticResponse() {
    return {
      voteOption: {
        desc: this.props.voteOption.desc,
        voteCount: this.props.voteOption.voteCount + 1,
      },
    };
  }
}