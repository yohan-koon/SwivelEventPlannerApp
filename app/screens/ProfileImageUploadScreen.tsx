import React, { FC, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Button, ButtonAccessoryProps, Icon, RoundedButton, RoundedButtonAccessoryProps, Screen, Spacer, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { ms } from "app/utils/ui"
import { spacing } from "app/theme"
// import { useStores } from "app/models"

interface ProfileImageUploadScreenProps extends NativeStackScreenProps<AppStackScreenProps<"ProfileImageUpload">> { }

export const ProfileImageUploadScreen: FC<ProfileImageUploadScreenProps> = observer(function ProfileImageUploadScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<ProfileImageUploadScreenProps>()

  //Camera Icon for ImageUploader Button
  const CameraButtonAccessory: FC<RoundedButtonAccessoryProps> = useMemo(
    () => function CameraButtonAccessory(props: RoundedButtonAccessoryProps) {
      return <Icon icon="camera" size={ms(13.5)} {...props} />
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
    <Screen style={$root} preset="scroll" safeAreaEdges={["top", "bottom"]} contentContainerStyle={$contentContainer}>
      <View style={$topContainer}>
        <View style={$titleContainer}>
          <Text preset="h1" tx="profileImageUploadScreen.title" />
          <Spacer mainAxisSize={spacing.sm} />
          <Text tx="profileImageUploadScreen.subTitle" style={$title}/>
        </View>
        <RoundedButton style={$imageUploaderButton} Accessory={CameraButtonAccessory} onPress={() => {}} />
      </View>
      <Button tx="common.next" RightAccessory={ButtonRightAccessory}/>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $contentContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.lg
}

const $topContainer: ViewStyle = {
  flexGrow: 1,
  justifyContent: "center",
}

const $titleContainer: ViewStyle = {
  alignItems: "center",
}

const $title: TextStyle = {
  textAlign: 'center',
  marginHorizontal: spacing.lg
}

const $imageUploaderButton: ViewStyle = {
  alignSelf: "center",
  marginVertical: spacing.lg,
}
