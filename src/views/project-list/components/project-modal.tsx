import React, { memo } from 'react'
import { Button, Drawer } from 'antd'
const ProjectModal = memo((props: { open: boolean; onClose: () => void }) => {
  const { open, onClose } = props
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Basic Drawer"
      placement="right"
    ></Drawer>
  )
})

export default ProjectModal
