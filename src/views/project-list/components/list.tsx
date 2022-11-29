import React, { memo } from 'react'
import { Table } from 'antd'
import { TableProps } from 'antd'
import { User } from '@/types/user'
import { Project } from '@/types/project'
import dayjs from 'dayjs'

/** 继承antd的props类型 */
interface ListProps extends TableProps<Project> {
  users: User[]
}

const List = memo(({ users, ...props }: ListProps) => {
  //取出users 剩下的放在 props里
  return (
    <Table
      pagination={false}
      rowKey={'id'}
      {...props}
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name)
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
        }
      ]}
    />
  )
})

export default List
