import { GraphQLClient } from "graphql-request";
import { formatQueries, queriesFragment, Query } from "./models/queries";
import { formatTypes, typesFragment, Type } from "./models/types";

async function delve(endpoint: string, options: object) {
  const query = `{
    __schema {
      ${queriesFragment}
      ${typesFragment}
    }
  }`;

  try {
    const client = new GraphQLClient(endpoint, options);
    const {
      __schema: { queryType, types }
    } = await client.request(query);

    return {
      queries: {
        list: formatQueries(queryType.fields),
        map: formatQueries(queryType.fields).reduce((m, curr: Query) => {
          const { name, ...rest } = curr;
          m[curr.name] = rest;
          return m;
        }, {})
      },
      types: {
        list: formatTypes(types),
        map: formatTypes(types).reduce((m, curr: Type) => {
          const { name, ...rest } = curr;
          m[curr.name] = rest;
          return m;
        }, {})
      }
    };
  } catch (err) {
    return console.error(err);
  }
}

export default delve;
