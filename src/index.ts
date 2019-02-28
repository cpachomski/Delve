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

const extractQueries = (schemaDef: any): [Query] =>
  schemaDef.__schema.queryType.fields.map((q: any) => ({
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

const extractTypes = (schemaDef: any): [Type] =>
  schemaDef.__schema.types
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
    const schema = await request(url, query);
    return {
      queries: extractQueries(schema),
      types: extractTypes(schema)
    };
  } catch (err) {
    return console.error(err);
  }
}
