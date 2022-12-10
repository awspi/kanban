import { useDocumentTitle } from '@/hooks/use-document-title'
import React, { memo } from 'react'
import KanbanColumn from './components/kanban-column'
import { useKanbans } from './utils/kanbans'
import {
  useKanbansSearchParams,
  useProjectInUrl,
  useTasksSearchParams
} from './utils/lib'
import styled from '@emotion/styled'
import SearchPanel from './components/search-panel'
import { useTasks } from './utils/task'
import { Spin } from 'antd'
import CreateKanban from './components/create-kanban'
import TaskModal from './components/task-modal'
import Drop from '@/components/drag-and-drop'
const Kanban = memo(() => {
  useDocumentTitle('看板')
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbansSearchParams()
  )

  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())

  const isLoading = kanbanIsLoading || taskIsLoading

  return (
    <ScreenContainer>
      <h1>{currentProject?.name} 看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size="large" />
      ) : (
        //todo 类型
        <Drop type="COLUMN" direction="horizontal" droppableId="kanban">
          <ColumnsContainer>
            {kanbans?.map((kanban) => (
              <KanbanColumn kanban={kanban} key={kanban.id} />
            ))}
            <CreateKanban />
          </ColumnsContainer>
        </Drop>
      )}
      <TaskModal />
    </ScreenContainer>
  )
})

export default Kanban

export const ColumnsContainer = styled('div')`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`

export const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`
