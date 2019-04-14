# Delve

Delve returns a useful data model of your GraphQL Schema. That's about it.

![](https://img.shields.io/npm/v/@pachomski/delve.svg?style=flat-square) ![](https://img.shields.io/bundlephobia/minzip/@pachomski/delve.svg?style=flat-square)

### Install

`npm i @pachomski/delve`

### Usage

```javascript
import delve from "@pachomski/delve";

const opts = {
  //...graphql-request options
};
const schemaProps = await delve(
  "https://your-graphql-endpoint.com/graphql",
  opts
);
// ...now do stuff with schemaProps
```

### API

##### `delve: (endpoint, options) => schemaProps`

- `endpoint (String)`: GraphQL endpoint to inspect
- `options (Object)`: graphql-request options object ([docs](https://github.github.io/fetch/)])
