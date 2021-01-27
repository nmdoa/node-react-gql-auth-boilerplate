import React from 'react'

import CRUDButtons from '../CRUDButtons'

const getCols = (keys, schema) => {
    return keys.map((key, id) => {
        if(!schema[id]) return null
        const cls = `col-${schema[id]}`
        return (<th scope="col" className={cls} key={id}>{key}</th>)
    })
}

const getRow = (values, schema) => {
    return values.map((value, id) => {
        if(!schema[id]) return null
        // const cls = `col-${schema[id]}`
        return (<td key={id} >{value}</td>)
    })
}

export const List = ({model, onDelete, onUpdate, schema}) => {
    if(!model) return
    const columns = Object.keys(model[0])
    return (
        <React.Fragment>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {getCols(columns, schema)}
                        <th scope="col" className="col-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {model.map((item, num) => {
                        return (
                            <tr key={item._id}>
                                {getRow(Object.values(item), schema)}
                                <td>
                                    <CRUDButtons onDelete={onDelete} object={item} onUpdate={onUpdate} />
                                </td>
                            </tr>
                            
                        )
                    })}
                </tbody>
            </table>
        </React.Fragment>
    )

}