import { ms } from "app/utils/ui"

/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
export const spacing = {
  xxxs: ms(2),
  xxs: ms(4),
  xs: ms(8),
  sm: ms(12),
  md: ms(16),
  lg: ms(24),
  xl: ms(32),
  xxl: ms(48),
  xxxl: ms(64),
} as const

export type Spacing = keyof typeof spacing
