import i18n from "i18n-js"
import React from "react"
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native"
import { isRTL, translate, TxKeyPath } from "../i18n"
import { colors, typography } from "../theme"
import { ms } from "app/utils/ui"

type Sizes = keyof typeof $sizeStyles
type Weights = keyof typeof typography.primary
type Presets = keyof typeof $presets

export interface TextProps extends RNTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: i18n.TranslateOptions
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
  /**
   * Text weight modifier.
   */
  weight?: Weights
  /**
   * Text size modifier.
   */
  size?: Sizes
  /**
   * Children components.
   */
  children?: React.ReactNode
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Text.md)
 */
export function Text(props: TextProps) {
  const { weight, size, tx, txOptions, text, children, style: $styleOverride, ...rest } = props

  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  const preset: Presets = $presets[props.preset] ? props.preset : "default"
  const $styles = [
    $rtlStyle,
    $presets[preset],
    $fontWeightStyles[weight],
    $sizeStyles[size],
    $styleOverride,
  ]

  return (
    <RNText {...rest} style={$styles}>
      {content}
    </RNText>
  )
}

const $sizeStyles = {
  xxl: { fontSize: ms(32), lineHeight: ms(40) } satisfies TextStyle,
  xl: { fontSize: ms(26), lineHeight: ms(36) } satisfies TextStyle,
  lg: { fontSize: ms(22), lineHeight: ms(32) } satisfies TextStyle,
  md: { fontSize: ms(19), lineHeight: ms(24) } satisfies TextStyle,
  sm: { fontSize: ms(16), lineHeight: ms(20) } satisfies TextStyle,
  xs: { fontSize: ms(14), lineHeight: ms(20) } satisfies TextStyle,
  xxs: { fontSize: ms(13), lineHeight: ms(16) } satisfies TextStyle,
  xxxs: { fontSize: ms(11), lineHeight: ms(14) } satisfies TextStyle,
}

const $fontWeightStyles = Object.entries(typography.primary).reduce((acc, [weight, fontFamily]) => {
  return { ...acc, [weight]: { fontFamily } }
}, {}) as Record<Weights, TextStyle>

const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.xs,
  $fontWeightStyles.normal,
  { color: colors.textDim },
]

const $presets = {
  default: $baseStyle,

  bold: [$baseStyle, $fontWeightStyles.semiBold] as StyleProp<TextStyle>,

  h1: [$baseStyle, $sizeStyles.xxl, $fontWeightStyles.semiBold, {color: colors.text}] as StyleProp<TextStyle>,

  h2: [$baseStyle, $sizeStyles.xl, $fontWeightStyles.semiBold, {color: colors.text}] as StyleProp<TextStyle>,

  h3: [$baseStyle, $sizeStyles.lg, $fontWeightStyles.semiBold, {color: colors.text}] as StyleProp<TextStyle>,

  h4: [$baseStyle, $sizeStyles.md, $fontWeightStyles.semiBold, {color: colors.text, fontFamily: typography.secondary.semiBold}] as StyleProp<TextStyle>,

  h5: [$baseStyle, $sizeStyles.sm, $fontWeightStyles.semiBold, {color: colors.text}] as StyleProp<TextStyle>,

  formLabel: [$baseStyle, $sizeStyles.xxs, $fontWeightStyles.medium, {color: colors.palette.neutral700}] as StyleProp<TextStyle>,

  formHelper: [$baseStyle, $sizeStyles.xxxs, $fontWeightStyles.normal] as StyleProp<TextStyle>,
}

const $rtlStyle: TextStyle = isRTL ? { writingDirection: "rtl" } : {}
