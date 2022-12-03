import React, { memo, useEffect, useState } from 'react'
import { useProjectIdInUrl, useTasksQueryKey } from '../utils/lib'
import { useAddTask } from '../utils/task'
import { Card, Input } from 'antd'

const CreateTask = memo(({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState('')
  const projectId = useProjectIdInUrl()
  const { mutateAsync: addKanban } = useAddTask(useTasksQueryKey())
  const [inputMode, setInputMode] = useState(false)

  const submit = () => {
    addKanban({ name, projectId, kanbanId }).then(() => {
      setName('')
      setInputMode(false)
    })
  }
  const toggle = () => setInputMode(!inputMode)

  useEffect(() => {
    if (!inputMode) {
      setName('')
    }
  }, [inputMode])

  if (!inputMode) {
    return <div onClick={toggle}>+ 创建事务</div>
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={'需要做些什么'}
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Card>
  )
})

export default CreateTask
