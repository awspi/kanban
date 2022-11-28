import { useDebounce } from '@/hooks'
import React, { memo, useEffect, useState } from 'react'
import { getList } from '../../api/list'
import List from './components/list'
import SearchPanel from './components/search-panel'

const ProjectList = memo(() => {
  const [users, setUsers] = useState([])

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debounceParam = useDebounce(param, 2000)

  const [list, setList] = useState([])

  useEffect(() => {
    getList().then((res: any) => setList(res))
  }, [param])

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} param={param} />
    </div>
  )
})

export default ProjectList
