import restify from 'restify';
import gql from 'graphql-tag';

import { makeExecutableSchema } from 'graphql-tools';
import { graphqlRestify, graphiqlRestify } from 'apollo-server-restify';
import { MongoClient, ObjectId } from 'mongodb';

const mongoServerUri =
	'mongodb+srv://onTheGo:guest@anastasia-cwn7g.mongodb.net/test?retryWrites=true&w=majority';
const mongo = new MongoClient(mongoServerUri, { useNewUrlParser: true });

const typeDefs = gql`
	type Query {
		list: [Artist]
	}
	type Artist {
		_id: String!
		name: String
		pictures: [String]!
	}
	type Mutation {
		addPicture(_id: String!, picture: String): String!
	}
`;

const PORT = 2999;

const resolvers = {
	Query: {
		list: (_, __, { mongo }) => {
			return mongo
				.db('tango')
				.collection('artists')
				.find({})
				.toArray();
		},
	},
	Mutation: {
		addPicture: (_, { _id, picture }, { mongo }) => {
			return mongo
				.db('tango')
				.collection('artists')
				.findOneAndUpdate({ _id: ObjectId(_id) }, { $push: { pictures: picture } })
				.then(() => {
					return 'Added';
				});
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

		const graphQLOptions = { schema, context: { mongo } };

		server.use(restify.plugins.bodyParser());
		server.use(restify.plugins.queryParser());

		server.post('/graphql', graphqlRestify(graphQLOptions));
		server.get('/graphql', graphqlRestify(graphQLOptions));

		server.get('/graphiql', graphiqlRestify({ endpointURL: '/graphql' }));

		server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
	});
};

main();
