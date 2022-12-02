import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'antd'
import { TableProps, Dropdown, Menu } from 'antd'
import { User } from '@/types/user'
import { Project } from '@/types/project'
import dayjs from 'dayjs'
import Pin from '@/components/pin'
import { useUsers } from '@/views/project-list/utils/use-users'
import { useEditProject } from '../utils/use-edit-project'
import { useProjectModal } from '../utils/use-projects-modal'
import { ButtonNoPadding } from '@/components/lib'

/** 继承antd的props类型 */
interface ListProps extends TableProps<Project> {
  users: User[]
  refresh?: () => void
}

const List = memo(({ users, ...props }: ListProps) => {
  const [modalVisible, open, close] = useProjectModal()
  const { mutate } = useEditProject()
  //? 柯里化
  // const pinProject=(id: number,pin: boolean)=>mutate({id,pin})
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh)
  //取出users 剩下的放在 props里
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
            return <Link to={project.id.toString()}>{project.name}</Link>
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
          render() {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      label: (
                        <Menu>
                          <Menu.Item key={''}>items</Menu.Item>
                        </Menu>
                      ),
                      key: 'logout'
                    }
                  ]
                }}
              >
                <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
              </Dropdown>
            )
          }
        }
      ]}
    />
  )
})

export default List
