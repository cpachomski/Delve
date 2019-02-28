import { request } from "graphql-request";
import query from "./query";

interface QueryArgument {
  name: String;
  type: String;
  kind: String;
}

interface Query {
  name: String;
  description: String;
  args: [QueryArgument];
}

const formatQueries = (queries: any): [Query] =>
  queries.map((q: any) => ({
    name: q.name,
    description: q.description,
    args: q.args.map((a: any) => ({
      name: a.name,
      type: a.type.name,
      kind: a.type.kind
    }))
  }));

const DefaultGraphQLTypes = [
  "__Type",
  "__TypeKind",
  "__Field",
  "__InputValue",
  "__EnumValue",
  "__Directive",
  "__DirectiveLocation",
  "__Schema",
  "Query",
  "Boolean",
  "String",
  "Int",
  "Float"
];

interface TypeAttribute {
  name: String;
  description: String;
  isDepcrecated: Boolean;
  deprecationReason: String;
  type: String;
  kind: String;
}

interface Type {
  name: String;
  attributes: [TypeAttribute];
}

const formatTypes = (types: any): [Type] =>
  types
    .filter((f: any) => !DefaultGraphQLTypes.includes(f.name))
    .map((t: any) => ({
      name: t.name,
      attributes: t.fields
        ? t.fields.map((f: any) => ({
            name: f.name,
            description: f.description,
            isDeprecated: f.isDeprecated,
            deprecationReason: f.deprecationReason,
            type: f.type.name,
            kind: f.type.kind
          }))
        : null
    }));

export async function delve(url: string) {
  try {
    const {
      __schema: { queryType, types }
    } = await request(url, query);

    return {
      queries: {
        list: formatQueries(queryType.fields),
        map: formatQueries(queryType.fields).reduce((m, curr: any) => {
          const { name, ...rest } = curr;
          m[curr.name] = rest;
          return m;
        }, {})
      },
      types: {
        list: formatTypes(types),
        map: formatTypes(types).reduce((m, curr: any) => {
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

delve("http://content.cnnmoney.ch/graphql").then(data =>
  console.log(JSON.stringify(data, undefined, 2))
);
