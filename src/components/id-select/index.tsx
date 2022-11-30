import React, { memo } from 'react'
import { Select } from 'antd'
//? 使用react自带的ComponentProps 获取组件props的类型
type SelectProps = React.ComponentProps<typeof Select>

//? 实现props透传
interface IdSelectProps
  extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value: string | number | null | undefined
  onChange: (value?: number) => void //传出一定是number
  defaultOptionName?: string
  options?: { name: string; id: number }[]
}
/**
 * * value 可以传入多种类型的值
 * onChange只会回调 number|undefined 类型
 * 当 isNaN(Number(value)) 为true的时候，代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 */
const IdSelect = memo((props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  )
})

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value))

export default IdSelect
