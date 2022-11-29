import React from 'react'
import { Navigate } from 'react-router-dom'

const ProjectList = React.lazy(() => import('@/views/project-list'))
const Project = React.lazy(() => import('@/views/project'))

const routes = [
  {
    path: '/',
    element: <Navigate to="/projects" />
  },
  {
    path: '/projects',
    element: <ProjectList />
  },
  {
    path: '/projects/:projectId/*',
    element: <Project />
  }
]

export default routes
