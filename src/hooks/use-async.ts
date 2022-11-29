import { useState } from 'react'

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
  const setData = (data: D) =>
    setState({
      data,
      stat: 'success',
      error: null
    })
  const setError = (error: Error) =>
    setState({
      stat: 'error',
      error,
      data: null
    })
  /**
   * 触发异步请求
   * @param promise
   */
  const run = (promise: Promise<D>) => {
    //* 有then方法就是promise
    if (!promise || !promise.then) {
      throw new Error('请传入Promise')
    }
    setState({ ...state, stat: 'loading' })
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
  }
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isSuccess: state.stat === 'success',
    isError: state.stat === 'error',
    run,
    setData,
    setError,
    ...state
  }
}
