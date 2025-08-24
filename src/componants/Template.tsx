import React from 'react'

const Template = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='min-w-3xl mx-auto min-h-screen flex flex-col gap-2.5'>{children}</div>
  )
}

export default Template