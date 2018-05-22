import { GraphQLScalarType, Kind } from 'graphql';

export default new GraphQLScalarType({
  name: 'Symbol',
  parseValue: value => value,
  serialize: value => value.toString(),
  parseLiteral: ast => {
    if (ast.kind === Kind.STRING) {
      if (ast.value.length > 10) {
        throw new TypeError('Symbols have to be shorter than 6 characters.');
      } else {
        return ast.value.toString();
      }
    }

    return null;
  },
});
