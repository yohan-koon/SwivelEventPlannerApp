import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import {
  LoginScreen,
  ProfileImageUploadScreen,
  SignUpScreen,
  PersonalInfoScreen
} from "app/screens"
import { CompositeScreenProps } from "@react-navigation/native"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { useStores } from "app/models"

export type OnboardingNavigatorParamList = {
  Login: undefined,
  SignUp: undefined,
  ProfileImageUpload: undefined,
  PersonalInfo: undefined
}

export type OnboardingStackScreenProps<T extends keyof OnboardingNavigatorParamList> = CompositeScreenProps<NativeStackScreenProps<OnboardingNavigatorParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Stack = createNativeStackNavigator<OnboardingNavigatorParamList>()
export const OnboardingNavigator = observer(function OnboardingNavigator() {
  const { authenticationStore: { isLoggedIn, isCompletedInitialSetup, user} } = useStores();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      {!isLoggedIn ? <>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </> : <>
        {!isCompletedInitialSetup && <Stack.Screen name="ProfileImageUpload" component={ProfileImageUploadScreen} />}
        <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      </>}


    </Stack.Navigator>
  )
})
