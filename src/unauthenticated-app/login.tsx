import { useAuth } from '@/context/auth-context'
import React, { memo } from 'react'
import { Button, Form, Input } from 'antd'
import { useAsync } from '@/hooks/use-async'
const Login = memo(({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  const handleSumbit = (values: { username: string; password: string }) => {
    run(login(values).catch((e) => onError(e)))
  }

  return (
    <Form onFinish={handleSumbit}>
      <Form.Item
        name={'username'}
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="用户名" type="text" id={'username'} />
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input placeholder="密码" type="password" id={'password'} />
      </Form.Item>
      <Form.Item>
        <Button loading={isLoading} type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  )
})

export default Login
