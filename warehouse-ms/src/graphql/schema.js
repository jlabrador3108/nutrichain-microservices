import { gql } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";

import {
  Query as WarehouseQuery,
  Mutation as WarehouseMutation,
} from "../modules/warehouse/graphql/warehouse.resolver.js";
import {
  Query as StockQuery,
  Mutation as StockMutation,
} from "../modules/stock/graphql/stock.resolver.js";

const typeDefs = gql`
  scalar JSON
  enum MovementType {
    IN
    OUT
    TRANSFER
    RETURN
    ADJUST_POSITIVE
    ADJUST_NEGATIVE
  }

  type Location {
    address: String
    lat: Float
    lon: Float
  }
  type Warehouse {
    id: ID!
    name: String!
    location: Location!
    manager: String
    createdAt: String
    updatedAt: String
  }

  type Stock {
    id: ID!
    productSku: String!
    warehouseId: String!
    quantity: Int!
    updatedAt: String
  }

  type ByWarehouse {
    warehouseId: String!
    warehouseName: String!
    quantity: Int!
  }

  type StockSummary {
    total: Int!
    byWarehouse: [ByWarehouse!]!
  }

  type Movement {
    id: ID!
    productSku: String!
    quantity: Int!
    type: MovementType!
    fromWarehouseId: ID
    toWarehouseId: ID
    note: String
    createdAt: String
  }

  type Query {
    warehouses: [Warehouse!]!
    warehouse(id: ID!): Warehouse
    stock(productSku: String!, warehouseId: ID!): Stock
    totalStockByProduct(productSku: String!): StockSummary!
  }

  input LocationInput {
    address: String
    lat: Float
    lon: Float
  }

  type Mutation {
    createWarehouse(
      name: String!
      location: LocationInput!
      manager: String
    ): Warehouse
    updateWarehouse(
      id: ID!
      name: String
      location: LocationInput
      manager: String
    ): Warehouse
    deleteWarehouse(id: ID!): Warehouse

    registerEntry(
      productSku: String!
      warehouseId: ID!
      quantity: Int!
      note: String
    ): Movement
    registerExit(
      productSku: String!
      warehouseId: ID!
      quantity: Int!
      note: String
    ): Movement
    transferStock(
      productSku: String!
      fromWarehouseId: ID!
      toWarehouseId: ID!
      quantity: Int!
      note: String
    ): Movement
    adjustStock(
      productSku: String!
      warehouseId: ID!
      quantity: Int!
      note: String
    ): JSON
    registerReturn(
      productSku: String!
      warehouseId: ID!
      quantity: Int!
      note: String
    ): Movement
  }
`;

const resolvers = {
  Query: {
    ...WarehouseQuery,
    ...StockQuery,
  },
  Mutation: {
    ...WarehouseMutation,
    ...StockMutation,
  },
};

export default makeExecutableSchema({ typeDefs, resolvers });
