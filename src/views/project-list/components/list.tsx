import React, { memo } from 'react'

interface ListProps {
  list: any
  param: any
}

type project = {
  name: string
  personName: string
}

const List = memo(({ list, param }: ListProps) => {
  console.log(list)
  return (
    <table>
      <thead>
        <tr>名称</tr>
        <tr>负责人</tr>
      </thead>
      <tbody>
        {list.map(
          (proj: {
            name:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined
            personName:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined
          }) => (
            <tr>
              <td>{proj.name}</td>
              <td>{proj.personName}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
})

export default List
