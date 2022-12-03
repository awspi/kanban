import { Kanban } from '@/types/kanban'
import React, { memo } from 'react'
import { useTasks } from '../utils/task'
import styled from '@emotion/styled'
import {
  useKanbansQueryKey,
  useTaskModal,
  useTasksSearchParams
} from '../utils/lib'
import { useTaskTypes } from '../utils/task-types'
import taskIcon from '@/assets/task.svg'
import bugIcon from '@/assets/bug.svg'
import { Card, Modal, Menu, Button, Dropdown } from 'antd'
import CreateTask from './create-task'
import { Task } from '@/types/task'
import Mark from '@/components/mark'
import { useDeleteKanban } from '../utils/kanbans'
import { Row } from '@/components/lib'

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes()
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name

  if (!name) {
    return null
  }

  return <img src={name === 'task' ? taskIcon : bugIcon} />
}

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTaskModal()
  const { name: keyword } = useTasksSearchParams()
  return (
    <Card
      style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
      key={task.id}
      onClick={(e) => startEdit(task.id)}
    >
      <TaskTypeIcon id={task.typeId} />{' '}
      <Mark name={task.name} keyword={keyword} />
    </Card>
  )
}

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteKanban(useKanbansQueryKey()) //* mutate
  const startDelete = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除看板吗',
      onOk() {
        return mutateAsync({ id: kanban.id })
      }
    })
  }
  const overlay = (
    <Menu
      items={[
        {
          label: (
            <Button type={'link'} onClick={startDelete}>
              删除
            </Button>
          ),
          key: 'delete'
        }
      ]}
    />
  )
  return (
    <Dropdown overlay={overlay}>
      <Button type={'link'}>...</Button>
    </Dropdown>
  )
}

const KanbanColumn = memo(({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams())
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)

  return (
    <Container>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} key={kanban.id} />
      </Row>
      <TasksContainer>
        {tasks?.map((task) => (
          <TaskCard task={task} />
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  )
})

export default KanbanColumn

export const Container = styled.div`
  flex: 1;
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
