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
  "string",
  "Int",
  "Float"
];

interface TypeAttribute {
  name: string;
  description: string;
  isDeprecated: boolean;
  deprecationReason: string;
  type: string;
  kind: string;
}

interface Type {
  name: string;
  attributes: [TypeAttribute];
}

export const typesFragment = `
  types {
    kind
    name
    interfaces {
      name
      description
    }
    inputFields {
      description
      defaultValue
    }
    fields {
      name
      description
      deprecationReason
      args {
        name
        description
        defaultValue
      }
      type {
        name
        kind
      }
    }
  }
`;

export function formatTypes(types: any): [Type] {
  return types
    .filter((f: any) => !DefaultGraphQLTypes.includes(f.name))
    .map(
      (t: any): Type => ({
        name: t.name,
        attributes: t.fields
          ? t.fields.map(
              (f: any): TypeAttribute => ({
                name: f.name,
                description: f.description,
                isDeprecated: f.isDeprecated,
                deprecationReason: f.deprecationReason,
                type: f.type.name,
                kind: f.type.kind
              })
            )
          : null
      })
    );
}
