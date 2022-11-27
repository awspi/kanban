import React, { memo } from 'react'

const List = memo(({list,param}) => {
  console.log(list);
  return (
    <div>
      <ul>
        {
          list?.filter(item=>item.name===param.name&&item.personId===param.personId).map((item)=>{
            return <li key={item.id}>{item.personId} {item.name} </li>
          })
        }
      </ul>
    </div>
  )
})

export default List
