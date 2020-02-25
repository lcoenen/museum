import restify from 'restify';
import gql from 'graphql-tag';

import {makeExecutableSchema} from 'graphql-tools';
import {graphqlRestify, graphiqlRestify} from 'apollo-server-restify';
import {MongoClient} from 'mongodb';

const mongoServerUri =
  'mongodb+srv://onTheGo:guest@anastasia-cwn7g.mongodb.net/test?retryWrites=true&w=majority';
const mongo = new MongoClient(mongoServerUri, {useNewUrlParser: true});

const typeDefs = gql`
  type Query {
    list: [Task]
  }
  type Task {
    _id: String!
    description: String!
  }
  type Mutation {
    addTask(description: String): String!
  }
`;

const PORT = 2999;

const resolvers = {
  Query: {
    list: (_, __, {mongo}) => {
			return mongo.db('tango').collection('tasks').find({}).toArray()
		},
  },
  Mutation: {
    addTask: (_, {description}, {mongo}) => {
      return mongo
        .db('tango')
        .collection('tasks')
				.insertOne({id: 0, description}).then(({insertedId}) => insertedId);
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const main = () => {
  console.log('Connecting to mongoDB');

  mongo.connect(err => {
    if (err) {
      console.error('Server could not connect to mongoDB instance');
      console.error(err);
    }

    const server = restify.createServer({
      title: 'onTheGo server',
    });

    const graphQLOptions = {schema, context: {mongo}};

    server.use(restify.plugins.bodyParser());
    server.use(restify.plugins.queryParser());

    server.post('/graphql', graphqlRestify(graphQLOptions));
    server.get('/graphql', graphqlRestify(graphQLOptions));

    server.get('/graphiql', graphiqlRestify({endpointURL: '/graphql'}));

    server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  });
};

main();
