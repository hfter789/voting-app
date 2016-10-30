import express from 'express';
import graphQLHTTP from 'express-graphql';
import { Schema } from './src/data/schema';
const app = express();

app.use('/graphql', graphQLHTTP({
    graphiql: true,
    pretty: true,
    schema: Schema,
}));

app.listen(4080, () => {
  console.log('service middleware is listening on port 3000!');
});
