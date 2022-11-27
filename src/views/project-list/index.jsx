import React, { memo, useEffect, useState } from 'react'
import { getList } from '../../api/list'
import List from './components/list'
import SearchPanel from './components/search-panel'

const ProjectList = memo(() => {
  const [param,setParam]=useState({
    name:"",
    personId:""
  })
  const [list,setList]=useState([])

  useEffect(()=>{
    getList().then((res)=>{
      setList(res)
    })
    
  },[param])

  return (
  <div>
    <SearchPanel  param={param} setParam={setParam}/>
    <List list={list} param={param}/>
  </div>
  )
})

export default ProjectList
