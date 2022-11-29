import React, { memo } from 'react'
import { ConfigProvider } from 'antd'
import { useAuth } from './context/auth-context'
import UnauthenticatedApp from './unauthenticated-app'
import AuthenticatedApp from '@/authenticated-app'
import './App.css'
import ErrorBoundary from './components/error-boundray'
import { FullPageErrorFallback } from './components/lib'
import { BrowserRouter } from 'react-router-dom'

const App = memo(() => {
  const { user } = useAuth()
  return (
    //todo
    <ConfigProvider>
      <BrowserRouter>
        <div className="App">
          {/* 使用错误边界 */}
          <ErrorBoundary fallbackRender={FullPageErrorFallback}>
            {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
          </ErrorBoundary>
        </div>
      </BrowserRouter>
    </ConfigProvider>
  )
})

export default App
