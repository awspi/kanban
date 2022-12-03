import { Kanban } from '@/types/kanban'
import React, { memo } from 'react'
import { useTasks } from '../utils/task'
import styled from '@emotion/styled'
import { useTasksSearchParams } from '../utils/lib'
import { useTaskTypes } from '../utils/task-types'
import taskIcon from '@/assets/task.svg'
import bugIcon from '@/assets/bug.svg'
import { Card } from 'antd'

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes()
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name

  if (!name) {
    return null
  }

  return <img src={name === 'task' ? taskIcon : bugIcon} />
}

const KanbanColumn = memo(({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams())

  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)

  return (
    <Container>
      <h2>{kanban.name}</h2>
      <TasksContainer>
        {tasks?.map((task) => (
          <Card style={{ marginBottom: 'o.5rem' }} key={task.id}>
            <TaskTypeIcon id={task.typeId} /> {task.name}
          </Card>
        ))}
      </TasksContainer>
    </Container>
  )
})

export default KanbanColumn

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`
