require('./server.babel');
var express = require('express');
var graphQLHTTP = require('express-graphql');
var axios = require('axios');
var log = require('winston').log;
var Schema = require('./src/data/schema').Schema;
var app = express();
var initDevClient = require('./client.dev').default;
var serveStatic = require('serve-static');
const localCache = {};
const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  initDevClient();
}

function getSessionData(req, resp, next) {
  var { authorization: authToken } = req.headers;
  if (localCache[authToken]) {
    req.userId = localCache[authToken];
    log('info', `Request from ${localCache[authToken]}(Cached)`);
    next();
    return;
  }
  axios.get(`https://graph.facebook.com/me?access_token=${authToken}`)
  .then(authResp => {
    const userId = authResp.data.id;
    localCache[authToken] = userId;
    req.userId = userId;
    log('info', `Request from ${userId}`);
    next();
  })
  .catch(error => {
    log('error', error);
    next();
  });
}

app.use('/graphql', getSessionData, graphQLHTTP(({ userId }) =>({
    graphiql: true,
    pretty: true,
    schema: Schema,
    rootValue: { userId },
})));

app.use(serveStatic('build'));

app.listen(isDev ? 4080 : (process.env.PORT || 3000), function() {
  console.log(`${isDev ? 'development' : 'production'} Server is running!`);
});
