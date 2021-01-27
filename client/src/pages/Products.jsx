import React, { useState } from 'react'
import { useQuery } from 'graphql-hooks'

import List from '../components/List'

import { PRODUCTS_LIST_SHORT } from '../graphql/products'

const listSchema = [0, 4, 3, 3, 2]

const Products = () => {
    const paginationLimit = 10
    const [skipCount] = useState(0)
    const { error, data } = useQuery(PRODUCTS_LIST_SHORT, {
        variables: { skip: skipCount, limit: paginationLimit },
    })

    const handleOnDelete = () => console.log('on delete!')
    const onUpdate = () => console.log('on update')

    if (!data) return 'Loading...'
    if (error) return 'Something Bad Happened'

    const { products } = data

    return (
        <React.Fragment>
            <List
                model={products}
                onDelete={handleOnDelete}
                onUpdate={onUpdate}
                schema={listSchema}
            />
        </React.Fragment>
    )
}

export default Products
