export const ADD_USER = `
mutation CreateUser($email: String!, $password: String!) {
    createUser(userInput:{email:$email password:$password}) {
      _id
    }
  }
`

export const LIST_USERS = `
query Users($limit: Int!, $skip: Int!){
    users(userInput:{limit: $limit, skip: $skip}) {
        _id
        email
        password
    }
    _usersMeta {
        count
    }
}
`

export const REFRESH_TOKEN = `
query RefreshToken($token: String!){
  refreshToken(token: $token) {
    token,
    refreshToken
  }
}
`

export const LOGIN_USER = `query LoginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
     token,
     refreshToken,
     email,
     userId
  }
}`

export const DELETE_USER = `
mutation DeleteUser($id: String!) {
  deleteUser(id:$id)
}
`

export const UPDATE_USER = `
mutation UpdateUser($id:String! $email:String $password:String) {
  updateUser(id:$id email:$email password:$password) {
    _id
  }
}
`
