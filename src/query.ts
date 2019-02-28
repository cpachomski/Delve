const queries = `
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

const types = `
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

export default `{
  __schema {
    ${queries}
    ${types}
  }
}`;
