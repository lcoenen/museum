import restify from 'restify';

import { makeExecutableSchema } from 'graphql-tools';
import { graphqlRestify, graphiqlRestify } from 'apollo-server-restify';

import gql from 'graphql-tag';

const typeDefs = gql`
	type Query { list: [Task] },
	type Task { id: Int!, description: String !}
	type Mutation {
		addTask(description: String): Int!
	}
`;

const PORT = 2999;

const resolvers = {
	Query: { list: () => [{id: 0, description: 'dummy task'}]},
	Mutation: {
		addTask: (_, {description}) => {
			console.log({description});
			return 0;
		}
	}
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const main = () => {

	const server = restify.createServer({
		title: 'onTheGo server',
	});

	const graphQLOptions = { schema };

	server.use(restify.plugins.bodyParser());
	server.use(restify.plugins.queryParser());

	server.post('/graphql', graphqlRestify(graphQLOptions));
	server.get('/graphql', graphqlRestify(graphQLOptions));

	server.get('/graphiql', graphiqlRestify({ endpointURL: '/graphql' }));

	server.listen(PORT, () => console.log(`Listening on ${PORT}`));

}

main();
