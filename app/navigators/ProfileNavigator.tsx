import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  ProfileScreen,
  WelcomeScreen
} from "app/screens"

export type ProfileNavigatorParamList = {
  Profile: undefined
}

const Stack = createNativeStackNavigator<ProfileNavigatorParamList>()
export const ProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  )
}
