import { useDebounce } from '@/hooks'
import React, { memo } from 'react'
import { Typography } from 'antd'
import styled from '@emotion/styled'
import List from './components/list'
import SearchPanel from './components/search-panel'

import { useUsers } from '@/views/project-list/utils/use-users'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { useProjectsSearchParams } from './utils/use-projects-search-params'
import { useProjects } from './utils/use-projects'

const ProjectList = memo(() => {
  const [param, setParam] = useProjectsSearchParams()
  const debounceParam = useDebounce(param, 500) //防抖
  const { isLoading, error, data: list, retry } = useProjects(debounceParam) //*获取list之后 也获取retry函数
  const { data: users } = useUsers(debounceParam)
  useDocumentTitle('项目列表', false)
  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error?.message}</Typography.Text>
      ) : null}
      {/* //*refresh:当更新完成后(.then())执行retry函数 */}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  )
})

export default ProjectList

const Container = styled.div`
  padding: 3.2rem;
`
