import Relay from 'react-relay';

const injectNetworkLayer = session => {
  Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer('/graphql', {
      headers: {
        Authorization: session,
      },
    })
  );
}

export default injectNetworkLayer;
