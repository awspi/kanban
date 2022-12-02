import React, { memo } from 'react'
import { Button, Drawer } from 'antd'
import { useProjectModal } from '../utils/use-projects-modal'
const ProjectModal = memo(() => {
  const [isVisilble, open, close] = useProjectModal()
  return (
    <Drawer
      open={isVisilble}
      onClose={close}
      title="Basic Drawer"
      placement="right"
    ></Drawer>
  )
})

export default ProjectModal
