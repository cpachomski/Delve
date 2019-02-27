export default `{
  __schema {
    queryType {
      name
      fields {
        name
        args {
          name
          description
          defaultValue
          type {
            kind
            name
            description
          }
        }
        name
        description
      }
      description
      enumValues {
        name
        description
        isDeprecated
        deprecationReason
      }
    }
  }
}`;
