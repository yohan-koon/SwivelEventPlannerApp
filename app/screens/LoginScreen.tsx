import React, { FC, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { OnboardingStackScreenProps } from "app/navigators"
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
} from "app/components"
import { spacing } from "app/theme"
import { ms } from "../utils/ui"
import { Formik } from "formik"
import { useNavigation } from "@react-navigation/native"
import { getLoginFormValidationSchema } from "app/validators"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface LoginScreenProps extends NativeStackScreenProps<OnboardingStackScreenProps<"Login">> { }
interface LoginFormValues {
  email: string
  password: string
}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<LoginScreenProps>();

  const passwordRef = useRef(null)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const initialFormValues: LoginFormValues = {
    email: "",
    password: "",
  }

  //Email Icon for Email TextField
  const EmailLeftAccessory: FC<TextFieldAccessoryProps> = useMemo(
    () => function EmailLeftAccessory(props: TextFieldAccessoryProps) {
      return <Icon icon="mail" size={ms(18)} {...props} />
    },
    [],
  )
  //Password Icon for Password TextField
  const PasswordLeftAccessory: FC<TextFieldAccessoryProps> = useMemo(
    () => function PasswordRightAccessory(props: TextFieldAccessoryProps) {
      return <Icon icon="lock" size={ms(15)} {...props} />
    },
    [],
  )
  //ClosedEye / Eye Icon for Password TextField
  const PasswordRightAccessory: FC<TextFieldAccessoryProps> = useMemo(
    () => function PasswordRightAccessory(props: TextFieldAccessoryProps) {
      return (<TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
        <Icon icon={isPasswordVisible ? "eye" : "closedEye"} size={ms(15)} {...props} />
      </TouchableOpacity>)
    },
    [isPasswordVisible],
  )
  //Open Icon for Restore Password LinkButton
  const RestorePasswordRightAccessory: FC<LinkButtonAccessoryProps> = useMemo(
    () => function RestorePasswordRightAccessory(props: LinkButtonAccessoryProps) {
      return <Icon icon="open" size={ms(10)} {...props} />
    },
    [],
  )
  //Next Icon for Login and SignUp Buttons
  const ButtonRightAccessory: FC<ButtonAccessoryProps> = useMemo(
    () => function ButtonRightAccessory(props: ButtonAccessoryProps) {
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
    >
      <Formik initialValues={initialFormValues} onSubmit={(values) => {
        console.log({ values })
        navigation?.navigate('ProfileImageUpload')
      }}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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
                  onSubmitEditing={() => { passwordRef.current?.focus() }}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  helper={touched.email && errors.email ? errors.email : undefined}
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
                  onSubmitEditing={() => { handleSubmit() }}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  helper={touched.password && errors.password ? errors.password : undefined}
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
              <Button tx="loginScreen.signUpBtn" RightAccessory={ButtonRightAccessory} onPress={() => navigation?.navigate('SignUp')} />
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
