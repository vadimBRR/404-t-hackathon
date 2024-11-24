import React, { PropsWithChildren } from 'react'

type Props = {
  children: React.ReactNode,
  isTopBar?: boolean
}
const Container = ({children, isTopBar}:Props ) => {

  return (
    <div className={`w-full h-full relative px-16 ${isTopBar ? 'pt-14' : ''}`}>
      {children}
    </div>
  )
}

export default Container

