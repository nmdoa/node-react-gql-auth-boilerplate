export const PRODUCTS_LIST = `
query Products($limit: Int!, $skip: Int!){
    products(userInput:{skip:$skip limit:$limit}) {
      _id
      name
      description
      size {
        S
        M
        L
        XL
        XX
      }
      tags{
        tag
      }
      isActive
      pictureFront
      pictureBack
    }
  }
`

export const PRODUCTS_LIST_SHORT = `
query Products($limit: Int!, $skip: Int!){
    products(userInput:{skip:$skip limit:$limit}) {
      _id
      name
      description
      isActive
      pictureFront
    }
  }
`
