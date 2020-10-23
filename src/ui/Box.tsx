import React from 'react'

interface Props {}

export const Box: React.FC<{ style: React.CSSProperties }> = ({
  children,
  style,
}) => {
  return <div style={style}>{children}</div>
}
