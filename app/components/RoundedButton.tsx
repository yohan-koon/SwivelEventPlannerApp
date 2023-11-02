import React, { ComponentType } from "react"
import { StyleProp, TextStyle, View, ViewStyle, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "app/theme"
import { Text } from "app/components/Text"
import { ms } from "../utils/ui"

export interface RoundedButtonAccessoryProps {
  style?: StyleProp<any>
}

export interface RoundedButtonProps extends TouchableOpacityProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Size of the container
   */
  size?: number
  /**
   * Accessory component to render on the middle of the button.
   */
  Accessory?: ComponentType<RoundedButtonAccessoryProps>
}

/**
 * Describe your component here
 */
export const RoundedButton = observer(function RoundedButton(props: RoundedButtonProps) {
  const { style, size = 116, Accessory, ...rest } = props
  const $styles = [$container, style]

  const $containerStyle = () => {
    return [$container, {
      width: ms(size),
      height: ms(size),
      borderRadius: ms(size / 2),
    }, style];
  }

  return (
    <TouchableOpacity style={$containerStyle()} {...rest}>
      {Accessory && <Accessory style={$rightAccessoryStyle} />}
    </TouchableOpacity>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.palette.primary100,
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}

const $rightAccessoryStyle: ViewStyle = { width: ms(24), height: ms(24), }
