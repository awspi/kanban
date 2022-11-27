import React, { memo } from 'react'

const SearchPanel = memo(({param,setParam}) => {
  console.log(param);
  function paramChangeHandle(e){
    setParam({
      ...param,
      name: e.target.value,
    })
  }
  return (
    <div>
      <input type="text" value={param.name} onChange={(e)=>{
        setParam({
          ...param,
          name: e.target.value,
        })
      }}/>
      <input type="text" value={param.personId} onChange={(e)=>{
        setParam({
          ...param,
          personId: e.target.value,
        })
      }}/>
    </div>
  )
})

export default SearchPanel
