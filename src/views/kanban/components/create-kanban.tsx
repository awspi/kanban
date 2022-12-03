import React, { memo, useState } from 'react'
import { ColumnsContainer } from '..'
import { useAddKanban } from '../utils/kanbans'
import { useKanbansQueryKey, useProjectIdInUrl } from '../utils/lib'
import { Input } from 'antd'
import { Container } from './kanban-column'

const CreateKanban = memo(() => {
  const [name, setName] = useState('')
  const projectId = useProjectIdInUrl()
  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey())

  const submit = async () => {
    addKanban({ name, projectId })
    setName('')
  }
  return (
    <Container>
      <Input
        size="large"
        placeholder="新建看板名称"
        onPressEnter={submit}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Container>
  )
})

export default CreateKanban
