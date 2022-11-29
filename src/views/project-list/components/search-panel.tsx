import React, { memo } from 'react'
import { Form, Input, Select } from 'antd'
import { User } from '@/types/user'
import { Project } from '@/types/project'

interface SearchPanelProps {
  users: User[]
  param: Partial<Pick<Project, 'name' | 'personId'>>
  setParam: (param: SearchPanelProps['param']) => void
}

const SearchPanel = memo(({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: '2rem' }} layout={'inline'}>
      <Form.Item>
        {/*setParam(Object.assign({}, param, {name:evt.target.value}))*/}
        <Input
          placeholder={'项目名'}
          type="text"
          value={param.name}
          onChange={(e) =>
            setParam({
              ...param,
              name: e.target.value
            })
          }
        />
      </Form.Item>
      <Form.Item>
        {/* <UserSelect
          defaultOptionName={"负责人"}
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        /> */}
        <Select
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        >
          <Select.Option value={''}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
})

export default SearchPanel
