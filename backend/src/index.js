import restify from 'restify';

import { makeExecutableSchema } from 'graphql-tools';
import { graphqlRestify, graphiqlRestify } from 'apollo-server-restify';

const typeDefs = `
	type Query { list: [Task] },
	type Task { description: String }
`;
const PORT = 2999;

const resolvers = {
	Query: { list: () => [{description: 'dummy task'}]}
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['http://localhost:3000'],
})

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

	server.pre(cors.preflight)
	server.use(cors.actual)

	server.listen(PORT, () => console.log(`Listening on ${PORT}`));

}

main();