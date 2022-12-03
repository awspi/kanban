import IdSelect from '@/components/id-select'
import { useTaskTypes } from '@/views/kanban/utils/task-types'
import React, { memo } from 'react'

const TaskTypeSelect = memo((props: React.ComponentProps<typeof IdSelect>) => {
  const { data: taskTypes } = useTaskTypes()

  return <IdSelect options={taskTypes || []} {...props} />
})

export default TaskTypeSelect
