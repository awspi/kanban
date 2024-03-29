import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'antd'
import { TableProps, Dropdown, Menu, Modal } from 'antd'
import { User } from '@/types/user'
import { Project } from '@/types/project'
import dayjs from 'dayjs'
import Pin from '@/components/pin'
import { useUsers } from '@/views/project-list/utils/use-users'

import { useProjectModal } from '../utils/use-projects-modal'
import { ButtonNoPadding } from '@/components/lib'
import { useProjectQueryKey } from '../utils/use-project-query-key'
import { useDeleteProject, useEditProject } from '../utils/project'

/** 继承antd的props类型 */
interface ListProps extends TableProps<Project> {
  users: User[]
  refresh?: () => void
}

const List = memo(({ users, ...props }: ListProps) => {
  //取出users 剩下的放在 props里

  const { mutate } = useEditProject(useProjectQueryKey())
  //? 柯里化
  // const pinProject=(id: number,pin: boolean)=>mutate({id,pin})
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })

  return (
    <Table
      pagination={false}
      rowKey={'id'}
      {...props}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
                // onCheckedChange={pin=>pinProject(project.id,pin)}
              />
            )
          }
        },
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return (
              <Link to={String(project.id) + '/kanban'}>{project.name}</Link>
            )
          }
        },
        {
          title: '部门',
          dataIndex: 'organization'
        },
        {
          title: '负责人',
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  '未知'}
              </span>
            )
          }
        },
        {
          title: '创建时间',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : '无'}
              </span>
            )
          }
        },
        {
          title: '操作',
          render(value, project) {
            return <More project={project} />
          }
        }
      ]}
    />
  )
})

export default List

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal()
  const editProject = (id: number) => () => startEdit(id)
  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey())
  const comfirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: '提示',
      content: '确认删除吗?',
      okText: '确定',
      onOk() {
        deleteProject({ id })
      }
    })
  }
  return (
    <Dropdown
      menu={{
        items: [
          {
            label: (
              <ButtonNoPadding type={'link'} onClick={editProject(project.id)}>
                编辑
              </ButtonNoPadding>
            ),
            key: 'edit'
          },
          {
            label: (
              <ButtonNoPadding
                type={'link'}
                onClick={() => comfirmDeleteProject(project.id)}
              >
                删除
              </ButtonNoPadding>
            ),
            key: 'delete'
          }
        ]
      }}
    >
      <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
    </Dropdown>
  )
}
