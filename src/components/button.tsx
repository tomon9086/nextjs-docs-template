import { FC } from 'react'

type ButtonProps = {
  disabled?: boolean
  title?: string
}

export const Button: FC<ButtonProps> = (props) => {
  const { disabled = false, title } = props

  return <button disabled={disabled}>{title}</button>
}
