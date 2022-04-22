import { rootResolver } from './root.schema'
import { carResolver } from './car.schema'
import { carTypeDef } from "./car.schema";
import { rootTypeDef } from "./root.schema";

export const resolvers = [
    rootResolver, carResolver
]

export const typeDefs = [
    rootTypeDef, carTypeDef
]