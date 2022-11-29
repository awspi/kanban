import { useDebounce, useMount } from '@/hooks'
import { cleanObject } from '@/utils'
import { useHttp } from '@/utils/http'
import React, { memo, useEffect, useState } from 'react'
import { Typography } from 'antd'
import styled from '@emotion/styled'
import List from './components/list'
import SearchPanel from './components/search-panel'
import { useProjects } from '@/hooks/use-projects'
import { useUsers } from '@/hooks/use-users'
import { useDocumentTitle } from '@/hooks/use-document-title'

const ProjectList = memo(() => {
  //* 获取用户信息
  // useMount(()=>{
  //   client('users').then(setUsers)
  // })
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debounceParam = useDebounce(param, 500) //防抖
  const { isLoading, error, data: list } = useProjects(debounceParam)
  const { data: users } = useUsers(debounceParam)
  useDocumentTitle('项目列表', false)
  return (
    <Container>
      <h2>项目列表</h2>
      {/* <SearchPanel users={users||[]} param={param} setParam={setParam} /> */}
      {error ? (
        <Typography.Text type="danger">{error?.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  )
})

export default ProjectList

const Container = styled.div`
  padding: 3.2rem;
`
