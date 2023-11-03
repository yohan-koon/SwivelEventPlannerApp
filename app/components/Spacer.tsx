import * as React from "react"
import { View } from "react-native"
import { observer } from "mobx-react-lite"

export interface SpacerProps {
  /**
   * Orientation of the spacer
   */
  orientation?: "horizontal" | "vertical"
  /**
   * Main axis size of the spacer
   */
  mainAxisSize?: number
  /**
   * Cross axis size of the spacer
   */
  crossAxisSize?: number
}

/**
 * Describe your component here
 */
export const Spacer = observer(function Spacer(props: SpacerProps) {
  const { orientation = 'vertical', mainAxisSize, crossAxisSize = 1 } = props

  return (
    <View style={[{[orientation === 'horizontal' ? 'width' : 'height']: mainAxisSize, [orientation === 'vertical' ? 'width' : 'height']: crossAxisSize,}]} />
  )
})
