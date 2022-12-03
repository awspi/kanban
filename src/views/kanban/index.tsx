import { useDocumentTitle } from '@/hooks/use-document-title'
import React, { memo } from 'react'
import KanbanColumn from './components/kanban-column'
import { useKanbans } from './utils/kanbans'
import {
  useKanbansSearchParams,
  useProjectIdInUrl,
  useProjectInUrl
} from './utils/lib'
import styled from '@emotion/styled'
import SearchPanel from './components/search-panel'

const Kanban = memo(() => {
  useDocumentTitle('看板')
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans } = useKanbans(useKanbansSearchParams())

  return (
    <ScreenContainer>
      <h1>{currentProject?.name} 看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnsContainer>
    </ScreenContainer>
  )
})

export default Kanban

export const ColumnsContainer = styled('div')`
  display: flex;
  /* overflow-x: scroll; */
  flex: 1;
`

export const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`
