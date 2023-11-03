import React, { FC, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps, OnboardingStackScreenProps } from "app/navigators"
import {
  ButtonAccessoryProps,
  Icon,
  Screen,
  Spacer,
  Text,
  TextField,
  TextFieldAccessoryProps,
  Button,
} from "app/components"
import { spacing } from "app/theme"
import { ms } from "../utils/ui"
import { Formik } from "formik"
import { getSignUpFormValidationSchema } from "app/validators/schemas"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"

interface SignUpScreenProps extends NativeStackScreenProps<OnboardingStackScreenProps<"SignUp">> {}

interface SignUpFormValues {
  email: string
  password: string
  confirmPassword: string
}

export const SignUpScreen: FC<SignUpScreenProps> = observer(function SignUpScreen() {
  // Pull in one of our MST stores
  const {
    userRegistrationStore: { isLoading, error, registerUser },
  } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)

  const initialFormValues: SignUpFormValues = {
    email: "",
    password: "",
    confirmPassword: "",
  }

  //Email Icon for Email TextField
  const EmailLeftAccessory: FC<TextFieldAccessoryProps> = useMemo(
    () =>
      function EmailLeftAccessory(props: TextFieldAccessoryProps) {
        return <Icon icon="mail" size={ms(18)} {...props} />
      },
    [],
  )
  //Password Icon for Password TextField
  const PasswordLeftAccessory: FC<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordLeftAccessory(props: TextFieldAccessoryProps) {
        return <Icon icon="lock" size={ms(15)} {...props} />
      },
    [],
  )
  //ClosedEye / Eye Icon for Password TextField
  const PasswordRightAccessory: FC<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordLeftAccessory(props: TextFieldAccessoryProps) {
        return (
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon icon={isPasswordVisible ? "eye" : "closedEye"} size={ms(15)} {...props} />
          </TouchableOpacity>
        )
      },
    [isPasswordVisible],
  )
  //ClosedEye / Eye Icon for Password TextField
  const ConfirmPasswordRightAccessory: FC<TextFieldAccessoryProps> = useMemo(
    () =>
      function ConfirmPasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
            <Icon icon={isConfirmPasswordVisible ? "eye" : "closedEye"} size={ms(15)} {...props} />
          </TouchableOpacity>
        )
      },
    [isConfirmPasswordVisible],
  )
  //Next Icon for Login and SignUp Buttons
  const ButtonRightAccessory: FC<ButtonAccessoryProps> = useMemo(
    () =>
      function ButtonRightAccessory(props: ButtonAccessoryProps) {
        return <Icon icon="next" size={ms(13.5)} {...props} />
      },
    [],
  )

  return (
    <Screen
      style={$root}
      contentContainerStyle={$contentContainer}
      preset="scroll"
      safeAreaEdges={["top", "bottom"]}
      isVisibleSpinner={isLoading}
    >
      <Formik
        initialValues={initialFormValues}
        validationSchema={getSignUpFormValidationSchema}
        onSubmit={(values) => registerUser(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={$topContainer}>
              <View style={$titleContainer}>
                <Text preset="h1" tx="signUpScreen.title" />
                <Spacer mainAxisSize={spacing.sm} />
                <Text tx="signUpScreen.subTitle" />
              </View>
              <View style={$formContainer}>
                <TextField
                  labelTx="signUpScreen.emailLabel"
                  textContentType="emailAddress"
                  LeftAccessory={EmailLeftAccessory}
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    passwordRef.current?.focus()
                  }}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  helper={touched.email && errors.email ? errors.email : undefined}
                />
                <Spacer mainAxisSize={spacing.md} />
                <TextField
                  ref={passwordRef}
                  labelTx="signUpScreen.passwordLabel"
                  secureTextEntry={!isPasswordVisible}
                  textContentType="password"
                  LeftAccessory={PasswordLeftAccessory}
                  RightAccessory={PasswordRightAccessory}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    confirmPasswordRef.current?.focus()
                  }}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  helper={touched.password && errors.password ? errors.password : undefined}
                />
                <Spacer mainAxisSize={spacing.md} />
                <TextField
                  ref={confirmPasswordRef}
                  labelTx="signUpScreen.confirmPasswordLabel"
                  secureTextEntry={!isConfirmPasswordVisible}
                  textContentType="password"
                  LeftAccessory={PasswordLeftAccessory}
                  RightAccessory={ConfirmPasswordRightAccessory}
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    handleSubmit()
                  }}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  helper={
                    touched.confirmPassword && errors.confirmPassword
                      ? errors.confirmPassword
                      : undefined
                  }
                />
              </View>
            </View>
            <View style={$bottomContainer}>
              <Button
                tx="signUpScreen.signUpBtn"
                RightAccessory={ButtonRightAccessory}
                onPress={() => handleSubmit()}
              />
              <Spacer mainAxisSize={spacing.md} />
              <Button
                tx="signUpScreen.loginBtn"
                RightAccessory={ButtonRightAccessory}
                onPress={() => navigation.goBack()}
              />
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
