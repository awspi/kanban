import React, { memo } from 'react'
import { ConfigProvider } from 'antd'
import { useAuth } from './context/auth-context'
import UnauthenticatedApp from './unauthenticated-app'
import AuthenticatedApp from '@/authenticated-app'
import './App.css'
import ErrorBoundary from './components/error-boundray'
import { FullPageErrorFallback } from './components/lib'

const App = memo(() => {
  const { user } = useAuth()
  return (
    //todo
    <ConfigProvider>
      <div className="App">
        {/* 使用错误边界 */}
        <ErrorBoundary fallbackRender={FullPageErrorFallback}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </ErrorBoundary>
      </div>
    </ConfigProvider>
  )
})

export default App
