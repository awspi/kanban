import { useCallback, useState } from 'react'
import { useMountedRef } from '.'

interface State<D> {
  error: Error | null
  data: D | null
  //idle: 未发生
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

const defaultConfig = {
  throwOnError: false
}

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initialConfig }
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

  const mountedRef = useMountedRef()

  const [retry, setRetry] = useState(() => () => {})

  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        stat: 'success',
        error: null
      }),
    []
  )
  const setError = useCallback(
    (error: Error) =>
      setState({
        stat: 'error',
        error,
        data: null
      }),
    []
  )
  /**
   * 触发异步请求
   * @param promise
   */
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      //* 有then方法就是promise
      if (!promise || !promise.then) {
        throw new Error('请传入Promise')
      }

      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig)
        }
      })
      setState({ ...state, stat: 'loading' })
      return promise
        .then((data) => {
          //? 阻止在已经卸载的组件上赋值
          if (mountedRef.current) {
            //如果已经被挂载 并且没有被卸载
            setData(data)
          }
          return data
        })
        .catch((err) => {
          //? catch 会消化异常 如果不主动抛出 外面接受不到异常 new Promise.reject(err)
          setError(err)
          if (config.throwOnError) {
            return Promise.reject(err)
          }
          return err
        })
    },
    [mountedRef, setData, state, config.throwOnError]
  )

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isSuccess: state.stat === 'success',
    isError: state.stat === 'error',
    run,
    //重新run 刷新state
    retry,
    setData,
    setError,
    ...state
  }
}
