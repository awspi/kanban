import { Row } from '@/components/lib'
import UserSelect from '@/components/user-select'
import { useSetUrlSearchParam } from '@/hooks/use-url-query-param'
import React, { memo } from 'react'
import { useTasksSearchParams } from '../utils/lib'
import { Input, Button } from 'antd'
import TaskTypeSelect from '@/components/task-type-select/inde'

const SearchPanel = memo(() => {
  const searchParams = useTasksSearchParams()
  const setSearchParams = useSetUrlSearchParam()
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined
    })
  }
  return (
    <Row marginBottom={4} gap={true}>
      <Input
        style={{ width: '20rem' }}
        placeholder={'任务名'}
        value={searchParams.name}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      />
      <UserSelect
        defaultOptionName={'经办人'}
        value={searchParams.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName={'类型'}
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  )
})

export default SearchPanel
