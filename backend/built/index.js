"use strict";

var _restify = _interopRequireDefault(require("restify"));

var _graphqlTools = require("graphql-tools");

var _apolloServerRestify = require("apollo-server-restify");

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\ttype Query { list: [Task] },\n\ttype Task { id: Int!, description: String !}\n\ttype Mutation {\n\t\taddTask(description: String): Int!\n\t}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDefs = (0, _graphqlTag["default"])(_templateObject());
var PORT = 2999;
var resolvers = {
  Query: {
    list: function list() {
      return [{
        id: 0,
        description: 'dummy task'
      }];
    }
  },
  Mutation: {
    addTask: function addTask(_, _ref) {
      var description = _ref.description;
      console.log({
        description: description
      });
      return 0;
    }
  }
};
var schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: typeDefs,
  resolvers: resolvers
});

var main = function main() {
  var server = _restify["default"].createServer({
    title: 'onTheGo server'
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