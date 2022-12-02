import React, { memo } from 'react'
import styled from '@emotion/styled'
import { Button, Popover, Typography, List, Divider } from 'antd'
import { useProjects } from '@/views/project-list/utils/use-projects'
import { ButtonNoPadding } from '../lib'
import { useProjectModal } from '@/views/project-list/utils/use-projects-modal'

const ProjectPopover = memo(() => {
  const { open } = useProjectModal()
  const { data: projects, isLoading } = useProjects()
  const pinnedProject = projects?.filter((project) => project.pin)
  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProject?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding type="link" onClick={open}>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  )
  return (
    <Popover placement="bottom" content={content}>
      项目
    </Popover>
  )
})

export default ProjectPopover

const ContentContainer = styled.div`
  min-width: 30rem;
`
