import { getCars } from "../controller/car.controller";
import { gql } from 'apollo-server-fastify';

export const carTypeDef = gql`
  type Car {
    id: String!
    title: String!
    brand: String!
    price: String!
    age: Int!
  }
  extend type Query {
    cars: [Car!]!
  }
`

export const carResolver = {
    Query: {
        cars: async () => {
            const res = await getCars()
            console.log(res)
            return res
        }
    }
}