import { useCallback, useReducer, useState } from 'react'
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
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef()
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, , mountedRef]
  )
}

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initialConfig }
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState
    }
  )

  const safeDispatch = useSafeDispatch(dispatch)

  const [retry, setRetry] = useState(() => () => {})

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: 'success',
        error: null
      }),
    []
  )
  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
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
      safeDispatch({ stat: 'loading' })
      return promise
        .then((data) => {
          setData(data)
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
    [safeDispatch, setData, state, config.throwOnError]
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
