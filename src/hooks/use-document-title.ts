import { useEffect, useRef } from 'react'

/**
 * 设置页面标题
 * @param title 要设置的标题
 * @param keepOnUnmount 卸载后是否保留标题
 */
export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  //? 页面加载时 旧title
  //? 加载后 新title
  const oldTitle = useRef(document.title).current

  useEffect(() => {
    document.title = title
  }, [title])

  //* 页面卸载后调用
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle
      }
    }
  }, [keepOnUnmount, oldTitle])
}
