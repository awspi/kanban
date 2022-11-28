import React, { memo } from 'react'

interface User {
  id: string
  name: string
  email: string
  title: string
  organization: string
}

interface SearchPanelProps {
  users: User[]
  param: {
    name: string
    personId: string
  }
  setParam: (param: SearchPanelProps['param']) => void
}

const SearchPanel = memo(({ users, param, setParam }: SearchPanelProps) => {
  console.log(param)
  function paramChangeHandle(e: React.ChangeEvent<HTMLInputElement>) {
    setParam({
      ...param,
      name: e.target.value
    })
  }
  return (
    <div>
      <input
        type="text"
        value={param.name}
        onChange={(e) => {
          setParam({
            ...param,
            name: e.target.value
          })
        }}
      />
      <input
        type="text"
        value={param.personId}
        onChange={(e) => {
          setParam({
            ...param,
            personId: e.target.value
          })
        }}
      />
    </div>
  )
})

export default SearchPanel
