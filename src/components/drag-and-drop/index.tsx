import React, { memo, ReactNode } from 'react'
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps
} from 'react-beautiful-dnd'
//* 把children函数转为reactNode
type DropProps = Omit<DroppableProps, 'children | ref'> & {
  children: ReactNode
} & { ref: any }
const Drop = memo(({ children, ...props }: DropProps) => {
  return (
    <Droppable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided
          })
        }
        return <div />
      }}
    </Droppable>
  )
})

export default Drop

type DropChildProps = Partial<
  { provided: DroppableProvided } & DroppableProvidedProps
> &
  React.HTMLAttributes<HTMLDivElement>

//? 使子组件可以使用ref
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  (props, ref) => <div ref={ref} {...props}></div>
)

type DragProps = Omit<DroppableProps, 'children | ref'> & {
  children: ReactNode
} & { ref: any } & { draggableId: any } & { index: any }
export const Darg = ({ children, ...props }: DragProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            ref: provided.innerRef
          })
        }
        return <div />
      }}
    </Draggable>
  )
}
