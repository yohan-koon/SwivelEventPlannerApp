import React, { FC, useCallback, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import {
  Button,
  ButtonAccessoryProps,
  Icon,
  LinkButton,
  LinkButtonAccessoryProps,
  Screen,
  Spacer,
  Text,
  TextField,
  TextFieldAccessoryProps,
  TextFieldProps,
} from "app/components"
import { spacing, typography } from "app/theme"
import { ms } from "../utils/ui"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Formik } from "formik"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface LoginScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Login">> {}
interface LoginFormValues {
  email: string
  password: string
}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const passwordRef = useRef(null)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const initialFormValues: LoginFormValues = {
    email: "",
    password: "",
  }

  //Email Icon for Email TextField
  const EmailLeftAccessory: FC<TextFieldAccessoryProps> = useCallback(
    (props) => <Icon icon="mail" size={ms(18)} {...props} />,
    [],
  )
  //Password Icon for Password TextField
  const PasswordLeftAccessory: FC<TextFieldAccessoryProps> = useCallback(
    (props) => <Icon icon="lock" size={ms(15)} {...props} />,
    [],
  )
  //ClosedEye / Eye Icon for Password TextField
  const PasswordRightAccessory: FC<TextFieldAccessoryProps> = useCallback(
    (props) => (
      <TouchableOpacity onPress={togglePasswordVisibility}>
        <Icon icon={isPasswordVisible ? "eye" : "closedEye"} size={ms(15)} {...props} />
      </TouchableOpacity>
    ),
    [isPasswordVisible],
  )
  //Open Icon for Restore Password LinkButton
  const RestorePasswordRightAccessory: FC<LinkButtonAccessoryProps> = useCallback(
    (props) => <Icon icon="open" size={ms(10)} {...props} />,
    [],
  )
  //Next Icon for Login and SignUp Buttons
  const ButtonRightAccessory: FC<ButtonAccessoryProps> = useCallback(
    (props) => <Icon icon="next" size={ms(13.5)} {...props} />,
    [],
  )

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <Screen
      style={$root}
      contentContainerStyle={$contentContainer}
      preset="scroll"
      safeAreaEdges={["top"]}
    >
      <Formik initialValues={initialFormValues} onSubmit={(values) => console.log({values})}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <View style={$topContainer}>
              <View style={$titleContainer}>
                <Text preset="h1" tx="loginScreen.title" />
                <Spacer mainAxisSize={spacing.sm} />
                <Text tx="loginScreen.subTitle" />
              </View>
              <View style={$formContainer}>
                <TextField
                  labelTx="loginScreen.emailLabel"
                  textContentType="emailAddress"
                  LeftAccessory={EmailLeftAccessory}
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => {passwordRef.current?.focus()}}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                <Spacer mainAxisSize={spacing.md} />
                <TextField
                  ref={passwordRef}
                  labelTx="loginScreen.passwordLabel"
                  secureTextEntry={!isPasswordVisible}
                  textContentType="password"
                  LeftAccessory={PasswordLeftAccessory}
                  RightAccessory={PasswordRightAccessory}
                  returnKeyType="done"
                  onSubmitEditing={() => {handleSubmit()}}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                <Spacer mainAxisSize={spacing.lg} />
                <LinkButton
                  style={$restorePasswordContainer}
                  tx="loginScreen.restorePassword"
                  RightAccessory={RestorePasswordRightAccessory}
                />
              </View>
            </View>
            <View style={$bottomContainer}>
              <Button
                tx="loginScreen.loginBtn"
                RightAccessory={ButtonRightAccessory}
                onPress={() => handleSubmit()}
              />
              <Spacer mainAxisSize={spacing.md} />
              <Button tx="loginScreen.signUpBtn" RightAccessory={ButtonRightAccessory} />
            </View>
          </>
        )}
      </Formik>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
}

const $contentContainer: ViewStyle = {
  flex: 1,
}

const $topContainer: ViewStyle = {
  flex: 3,
  justifyContent: "center",
}

const $titleContainer: ViewStyle = {
  alignItems: "center",
}

const $formContainer: ViewStyle = {
  marginTop: spacing.xl,
}

const $restorePasswordContainer: ViewStyle = {
  alignSelf: "flex-end",
}

const $bottomContainer: ViewStyle = {
  flex: 1,
}
