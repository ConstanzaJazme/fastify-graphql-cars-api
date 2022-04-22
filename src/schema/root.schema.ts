import { gql } from 'apollo-server-core'

export const rootTypeDef = gql`
  scalar Date
  type Query {
    # Added because declaring an empty type doesnt make sense
    # Later we're gonna extend these by using more types and resolvers
    _ignore: String!
  }
  type Mutation {
    _ignore: String!
  }
`

export const rootResolver = {
    Query: {
        _ignore: () => ''
    },
    Mutation: {
        _ignore: () => ''
    }
}