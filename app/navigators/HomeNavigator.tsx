import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  HomeScreen,
  WelcomeScreen
} from "app/screens"

export type HomeNavigatorParamList = {
  Home: undefined
}

const Stack = createNativeStackNavigator<HomeNavigatorParamList>()
export const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
			<Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  )
}
