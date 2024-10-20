import React from 'react'

export interface IconProps extends React.SVGAttributes<SVGElement> {
  children?: never
  color?: string
}

export type IconNodeType = React.ForwardRefExoticComponent<SVGSVGElement>
