import React, { Component, ReactNode } from 'react'

// children 子组件
// fallbackRender 备用方案
type FallbackRender = (props: { error: Error | null }) => React.ReactElement
//* Component<props,state>
export default class ErrorBoundary extends Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null }
  // 当子组件抛出异常，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props
    if (error) {
      return fallbackRender({ error })
    }
    return children
  }
}
