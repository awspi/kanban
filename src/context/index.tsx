import React, { ReactNode } from 'react'
import { AuthProvider } from './auth-context'
import { QueryClient, QueryClientProvider } from 'react-query'

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    // dev-tool
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  )
}
