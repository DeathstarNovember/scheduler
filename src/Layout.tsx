import React from 'react'

type LayoutProps = {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {children}
    </div>
  )
}
