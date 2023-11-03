import React, { FC, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps, OnboardingStackScreenProps } from "app/navigators"
import { Button, ButtonAccessoryProps, Icon, LinkButton, Screen, Spacer, Text, TextField } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { spacing } from "app/theme"
import { ms } from "../utils/ui"
import { Formik } from "formik"
import { getPersonalInfoFormValidationSchema } from "app/validators"
// import { useNavigation } from "@react-navigation/native"
import { UserModel, useStores } from "app/models"

interface PersonalInfoScreenProps extends NativeStackScreenProps<OnboardingStackScreenProps<"PersonalInfo">> {}

interface LoginFormValues {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
}

export const PersonalInfoScreen: FC<PersonalInfoScreenProps> = observer(function PersonalInfoScreen() {
  // Pull in one of our MST stores
  const { authenticationStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<PersonalInfoScreenProps>();

  const lastNameRef = useRef(null)
  const emailRef = useRef(null)
  const phoneNumberRef = useRef(null)
  const addressRef = useRef(null)

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const initialFormValues: LoginFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  }

  //Previous Icon for Back Buttons
  const BackButtonLeftAccessory: FC<ButtonAccessoryProps> = useMemo(
    () => function BackButtonLeftAccessory(props: ButtonAccessoryProps) {
      return <Icon icon="previous" size={ms(13.5)} {...props} />
    },
    [],
  )

  //Next Icon for Next Buttons
  const NextButtonRightAccessory: FC<ButtonAccessoryProps> = useMemo(
    () => function NextButtonRightAccessory(props: ButtonAccessoryProps) {
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
      <Formik initialValues={initialFormValues} validationSchema={getPersonalInfoFormValidationSchema} onSubmit={(values) => {
        console.log({ values })
        authenticationStore.setUser(null);
      }}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={$topContainer}>
              <View style={$titleContainer}>
                <Text preset="h4" tx="personalInfoScreen.title" />
                <Spacer mainAxisSize={spacing.xs} />
                <Text tx="personalInfoScreen.subTitle" />
              </View>
              <View style={$formContainer}>
              <TextField
                  labelTx="personalInfoScreen.firstNameLabel"
                  textContentType="name"
                  keyboardType="name-phone-pad"
                  returnKeyType="next"
                  onSubmitEditing={() => { lastNameRef.current?.focus() }}
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={values.firstName}
                  helper={touched.firstName && errors.firstName ? errors.firstName : undefined}
                />
                <Spacer mainAxisSize={spacing.md} />
                <TextField
                  ref={lastNameRef}
                  labelTx="personalInfoScreen.lastNameLabel"
                  textContentType="name"
                  keyboardType="name-phone-pad"
                  returnKeyType="next"
                  onSubmitEditing={() => { emailRef.current?.focus() }}
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                  helper={touched.lastName && errors.lastName ? errors.lastName : undefined}
                />
                <Spacer mainAxisSize={spacing.md} />
                <TextField
                  ref={emailRef}
                  labelTx="personalInfoScreen.emailLabel"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => { phoneNumberRef.current?.focus() }}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  helper={touched.email && errors.email ? errors.email : undefined}
                />
                <Spacer mainAxisSize={spacing.md} />
                <TextField
                  ref={phoneNumberRef}
                  labelTx="personalInfoScreen.phoneLabel"
                  textContentType="telephoneNumber"
                  keyboardType="phone-pad"
                  returnKeyType="next"
                  onSubmitEditing={() => { addressRef.current?.focus() }}
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                  helper={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : undefined} />
                <Spacer mainAxisSize={spacing.md} />
                <TextField
                  ref={addressRef}
                  labelTx="personalInfoScreen.addressLabel"
                  textContentType="fullStreetAddress"
                  keyboardType="default"
                  returnKeyType="done"
                  onSubmitEditing={() => { handleSubmit() }}
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  value={values.address}
                  helper={touched.address && errors.address ? errors.address : undefined} />
              </View>
            </View>
            <View style={$bottomContainer}>
              <Button
                preset="default"
                style={$submitBtnContainer}
                tx="common.back"
                LeftAccessory={BackButtonLeftAccessory}
                onPress={() => navigation.goBack()}
              />
              <Spacer crossAxisSize={spacing.sm} />
              <Button style={$submitBtnContainer} tx="common.next" RightAccessory={NextButtonRightAccessory} onPress={() => handleSubmit()} />
            </View>
          </>
        )}
      </Formik>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $contentContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
}

const $topContainer: ViewStyle = {
  flexGrow: 1,
  marginTop: ms(20),
}

const $titleContainer: ViewStyle = {
}

const $formContainer: ViewStyle = {
  marginTop: ms(20),
}

const $bottomContainer: ViewStyle = {
  flexDirection: "row",
  marginBottom: spacing.sm,
}

const $submitBtnContainer: ViewStyle = {
  flex: 1,
}
