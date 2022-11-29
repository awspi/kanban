import { useEffect } from 'react'

/**
 * 设置页面标题
 * @param title 要设置的标题
 * @param keepOnUnmount 卸载后是否保留标题
 */
export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = document.title
  console.log('渲染时', oldTitle)

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    //* 页面卸载后调用
    return () => {
      if (!keepOnUnmount) {
        console.log('卸载时', oldTitle)
        document.title = oldTitle
      }
    }
  })
}
