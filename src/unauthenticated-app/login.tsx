import React, { memo } from 'react'
const apiUrl = process.env.REACT_APP_API_URL
const Login = memo(() => {
  const login = (param: { username: string; password: string }) => {
    console.log(param)
    fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(param)
    }).then(async (res) => {
      if (res.ok) {
        //todo
      }
    })
  }

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value
    login({ username, password })
  }

  return (
    <form onSubmit={(e) => handleSumbit(e)}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={'username'} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={'password'} />
      </div>
      <button type={'submit'}>登录</button>
    </form>
  )
})

export default Login
