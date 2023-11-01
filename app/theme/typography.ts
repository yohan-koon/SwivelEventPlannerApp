// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native"

import {
  NotoSans_300Light as notoSansLight,
  NotoSans_400Regular as notoSansRegular,
  NotoSans_500Medium as notoSansMedium,
  NotoSans_600SemiBold as notoSansSemiBold,
  NotoSans_700Bold as notoSansBold,
} from "@expo-google-fonts/noto-sans"

import {
  Inter_300Light as interLight,
  Inter_400Regular as interRegular,
  Inter_500Medium as interMedium,
  Inter_600SemiBold as interSemiBold,
  Inter_700Bold as interBold,
} from "@expo-google-fonts/inter"

export const customFontsToLoad = {
  notoSansLight,
  notoSansRegular,
  notoSansMedium,
  notoSansSemiBold,
  notoSansBold,
  interLight,
  interRegular,
  interMedium,
  interSemiBold,
  interBold
}

const fonts = {
  notoSans: {
    // Cross-platform Google font.
    light: "notoSansLight",
    normal: "notoSansRegular",
    medium: "notoSansMedium",
    semiBold: "notoSansSemiBold",
    bold: "notoSansBold",
  },
  inter: {
    // Cross-platform Google font.
    light: "interLight",
    normal: "interRegular",
    medium: "interMedium",
    semiBold: "interSemiBold",
    bold: "interBold",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.notoSans,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: fonts.inter,
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
