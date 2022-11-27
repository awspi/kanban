import { useEffect, useState } from 'react'

export const useDebounce = (fn, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(fn)
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(fn), delay)
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout)
  }, [fn, delay]) //当value变化时
  return debouncedValue
}
