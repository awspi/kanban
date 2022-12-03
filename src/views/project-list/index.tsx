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
import { ButtonNoPadding, ErrorBox, Row } from '@/components/lib'
import { useProjectModal } from './utils/use-projects-modal'

const ProjectList = memo(() => {
  const { open } = useProjectModal()
  const [param, setParam] = useProjectsSearchParams()
  const debounceParam = useDebounce(param, 500) //防抖
  const { isLoading, error, data: list } = useProjects(debounceParam)

  const { data: users } = useUsers(debounceParam)
  useDocumentTitle('项目列表', false)
  return (
    <Container>
      <h2>项目列表</h2>
      <Row marginBottom={2} between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={'link'}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? <ErrorBox error={error} /> : null}
      {/* //*refresh:当更新完成后(.then())执行retry函数 */}
      <List
        // refresh={retry}
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
