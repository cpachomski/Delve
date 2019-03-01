export interface QueryArgument {
  name: string;
  type: string;
  kind: string;
}

export interface Query {
  name: string;
  description: string;
  args: [QueryArgument];
}

export const queriesFragment = `
  queryType {
    name
    fields {
      name
      args {
        name
        defaultValue
        description
        type { 
          name
          description
          kind
        }
      }
      isDeprecated
      deprecationReason
      description
    }
    inputFields {
      name
      description
      defaultValue
    }
    description
    kind
    interfaces {
      name
      description
    }
  }
`;

export function formatQueries(queries: any): [Query] {
  return queries.map(
    (q: any): Query => ({
      name: q.name,
      description: q.description,
      args: q.args.map(
        (a: any): QueryArgument => ({
          name: a.name,
          type: a.type.name,
          kind: a.type.kind
        })
      )
    })
  );
}
