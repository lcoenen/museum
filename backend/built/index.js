"use strict";

var _restify = _interopRequireDefault(require("restify"));

var _graphqlTools = require("graphql-tools");

var _apolloServerRestify = require("apollo-server-restify");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var typeDefs = "\n\ttype Query { list: [Task] },\n\ttype Task { description: String }\n";
var PORT = 2999;
var resolvers = {
  Query: {
    list: function list() {
      return [{
        description: 'dummy task'
      }];
    }
  }
};
var schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: typeDefs,
  resolvers: resolvers
});

var main = function main() {
  var server = _restify["default"].createServer({
    title: 'Apollo Server'
  });

  var graphQLOptions = {
    schema: schema
  };
  server.use(_restify["default"].plugins.bodyParser());
  server.use(_restify["default"].plugins.queryParser());
  server.post('/graphql', (0, _apolloServerRestify.graphqlRestify)(graphQLOptions));
  server.get('/graphql', (0, _apolloServerRestify.graphqlRestify)(graphQLOptions));
  server.get('/graphiql', (0, _apolloServerRestify.graphiqlRestify)({
    endpointURL: '/graphql'
  }));
  server.listen(PORT, function () {
    return console.log("Listening on ".concat(PORT));
  });
};

main();