import React, { memo } from 'react'
import Login from './unauthenticated-app/login'
import ProjectList from './views/project-list'

const App = memo(() => {
  return (
    <Login />
    // <ProjectList />
  )
})

export default App
