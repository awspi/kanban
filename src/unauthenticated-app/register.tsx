import { useAuth } from '@/context/auth-context'
import React, { memo } from 'react'
import { Button, Form, Input } from 'antd'
import { useAsync } from '@/hooks/use-async'
const Register = memo(({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth()
  const { run, isLoading } = useAsync()
  const handleSumbit = ({
    cpassword,
    ...values
  }: {
    username: string
    password: string
    cpassword: string
  }) => {
    if (cpassword !== values.password) {
      onError(new Error('请确认两次密码相同'))
      return
    }
    run(register(values).catch((e) => onError(e)))
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
      <Form.Item
        name={'cpassword'}
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input placeholder="确认密码" type="password" id={'cpassword'} />
      </Form.Item>
      <Form.Item>
        <Button loading={isLoading} type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  )
})

export default Register
