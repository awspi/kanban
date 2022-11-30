import React from 'react'
import { Navigate } from 'react-router-dom'

const ProjectList = React.lazy(() => import('@/views/project-list'))
const Project = React.lazy(() => import('@/views/project'))
const Epic = React.lazy(() => import('@/views/epic'))
const Kanban = React.lazy(() => import('@/views/kanban'))

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
    element: <Project />,
    children: [
      {
        path: 'epic',
        element: <Epic />
      },
      {
        path: 'kanban',
        element: <Kanban />
      }
    ]
  }
]

export default routes
