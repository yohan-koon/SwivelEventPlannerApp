import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  WelcomeScreen
} from "app/screens"
import { HomeNavigator } from "./HomeNavigator"
import { ProfileNavigator } from "./ProfileNavigator"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { Icon } from "app/components"
import { colors, spacing, typography } from "app/theme"
import { translate } from "app/i18n"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { CompositeScreenProps } from "@react-navigation/native"
import { ms, vs } from "app/utils/ui"

export type MainNavigatorParamList = {
  HomeTab: undefined,
  ProfileTab: undefined
}

export type MainNavigatorScreenProps<T extends keyof MainNavigatorParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainNavigatorParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<MainNavigatorParamList>()
export const MainNavigator = () => {
  const { bottom } = useSafeAreaInsets()
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarStyle: [$tabBar, { height: bottom + vs(70) }],
      tabBarActiveTintColor: colors.palette.neutral400,
      tabBarInactiveTintColor: colors.palette.neutral400,
      tabBarLabelStyle: $tabBarLabel,
      tabBarItemStyle: $tabBarItem,
    }}>
      <Tab.Screen name="HomeTab" component={HomeNavigator}
        options={{
          tabBarLabel: translate("mainNavigator.home"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="home" color={focused && colors.tint} size={30} />
          ),
        }} />
      <Tab.Screen name="ProfileTab" component={ProfileNavigator}
        options={{
          tabBarLabel: translate("mainNavigator.profile"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="profile" color={focused && colors.tint} size={30} />
          ),
        }} />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.palette.neutral900,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: ms(12),
  fontFamily: typography.primary.medium,
  lineHeight: ms(20),
  flex: 1,
  fontWeight: "500",
}