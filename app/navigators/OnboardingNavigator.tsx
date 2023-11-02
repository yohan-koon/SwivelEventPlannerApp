import React from "react"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import {
  LoginScreen,
  ProfileImageUploadScreen,
  SignUpScreen,
} from "app/screens"
import { CompositeScreenProps } from "@react-navigation/native"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type OnboardingNavigatorParamList = {
  Login: undefined,
  SignUp: undefined,
  ProfileImageUpload: undefined,
}

export type OnboardingStackScreenProps<T extends keyof OnboardingNavigatorParamList> = CompositeScreenProps<NativeStackScreenProps<OnboardingNavigatorParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Stack = createNativeStackNavigator<OnboardingNavigatorParamList>()
export const OnboardingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ProfileImageUpload" component={ProfileImageUploadScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  )
}
