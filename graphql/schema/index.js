const { buildSchema } = require('graphql')

module.exports = buildSchema(`
type Tag {
  tag: String!
}

type Size {
  S: Int
  M: Int
  L: Int
  XL: Int
  XX: Int
}

type Product {
  _id: ID!
  name: String!
  description: String
  pictureFront: String
  pictureBack: String
  isActive: Boolean
  size: Size
  tags: [Tag!]
}

input TagInput {
  tag: String!
}

input SizeInput {
  S: Int
  M: Int
  L: Int
  XL: Int
  XX: Int
}

input ProductInput {
  name: String!
  description: String
  pictureFront: String
  pictureBack: String
  isActive: Boolean
  size: SizeInput
  tags: [TagInput]
}

type User {
  _id: ID!
  email: String!
  password: String
  ownGoods: [Goods!]!
}

type Goods {
  _id: ID!
  name: String!
  createdAt: String!
  updatedAt: String!
  user: User!
}

type AuthData {
  userId: ID!
  token: String!
  refreshToken: String!
  email: String!
}

type ListMetadata {
  count: Int!
}

input Pagination {
  limit: Int
  skip: Int
}

input UserInput {
  email: String!
  password: String!
}

type RootQuery {
    products(userInput: Pagination): [Product!]!
    users(userInput: Pagination): [User!]!
    _usersMeta:ListMetadata
    goods: [Goods!]!
    login(email: String!, password: String!): AuthData!
    refreshToken(token: String!): AuthData!
}
type RootMutation {
    createUser(userInput: UserInput): User
    deleteUser(id: String!): Int!
    updateUser(id: String!, email: String, password: String): User
    createGoods(name: String!): Goods
    addProduct(userInput: ProductInput): Product
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`)
