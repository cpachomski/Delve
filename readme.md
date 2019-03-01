# Delve

Delve returns a useful data model of your GraphQL Schema. That's about it.

![](https://img.shields.io/npm/v/@pachomski/delve.svg?style=flat-square) ![](https://img.shields.io/bundlephobia/minzip/@pachomski/delve.svg?style=flat-square)

### Install

`npm i @pachomski/delve`

### Usage

```javascript
import delve from "@pachomski/delve";

const schema = await delve("https://your-graphql-endpoint.com/graphql");
// ...now do stuff with schema

// OR

delve("https://your-graphql-endpoint.com/graphql").then(schema => {
  // ...now do stuff with schema
});
```
