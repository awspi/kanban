import React, { memo } from 'react'
import styled from '@emotion/styled'
import { Button, Popover, Typography, List } from 'antd'
import { useProjects } from '@/views/project-list/utils/use-projects'
import { useUsers } from '@/views/project-list/utils/use-users'

const UserPopover = memo(() => {
  const { data: users, isLoading } = useUsers()
  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">组员列表</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
    </ContentContainer>
  )
  return (
    <Popover placement="bottom" content={content}>
      用户
    </Popover>
  )
})

export default UserPopover

const ContentContainer = styled.div`
  min-width: 30rem;
`
