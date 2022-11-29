import { useEffect, useMemo, useState } from 'react'

export const useMount = (cb: Function) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => cb(), [])
}

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout)
  }, [value, delay]) //当value变化时
  return debouncedValue
}
