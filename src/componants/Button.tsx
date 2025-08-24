import React, { type MouseEventHandler } from 'react'

const Button = ({children,customClasses,onClick}:
  {children:React.ReactNode,
  customClasses?:"" | String,
  onClick:MouseEventHandler}) => {
  return (
    <button className={`border border-blue-900 bg-blue-800 text-amber-50 rounded-md px-4 py-1.5 cursor-pointer hover:bg-blue-700 ${customClasses}`} onClick={onClick}>{children}</button>
  )
}

export default Button