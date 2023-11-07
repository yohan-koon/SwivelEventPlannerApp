import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { registerUser, uploadProfileImage } from "app/services/firebase"
import { User, UserModel } from "./User"

/**
 * Model description here for TypeScript hints.
 */
export const UserRegistrationStoreModel = types
  .model("UserRegistrationStore")
  .props({
    signUpIsLoading: types.optional(types.boolean, false),
    signUpError: types.optional(types.string, ''),
    user: types.optional(UserModel, {}),
    imageUploadIsLoading: types.optional(types.boolean, false),
    imageUploadError: types.optional(types.string, ''),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    resetSignUp() {
      self.signUpIsLoading = false
      self.signUpError = ''
    },
    setSignUpStatus(isLoading: boolean, error?: string, user?: User) {
      self.signUpIsLoading = isLoading
      self.signUpError = error
      if(user) {self.user  = user;}
    },
    setImageUploadStatus(isLoading: boolean, error?: string, user?: User) {
      self.imageUploadIsLoading = isLoading
      self.imageUploadError = error
      if(user){self.user = user}
    }
  }))
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async registerUser(values: { email: string, password: string }) {
      self.setSignUpStatus(true)
      try {
        const newUser = await registerUser(values);
        self.setSignUpStatus(false, '', newUser)
      } catch (error) {
        self.setSignUpStatus(false, error.message)
      }
    },
    async uploadProfileImage(file: any, user: User) {
      self.setImageUploadStatus(true)
      try {
        const updatedUser = await uploadProfileImage(file, user);
        self.setImageUploadStatus(false, '', updatedUser)
      } catch (error) {
        self.setImageUploadStatus(false, error.message)
      }
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface UserRegistrationStore extends Instance<typeof UserRegistrationStoreModel> {}
export interface UserRegistrationStoreSnapshotOut extends SnapshotOut<typeof UserRegistrationStoreModel> {}
export interface UserRegistrationStoreSnapshotIn extends SnapshotIn<typeof UserRegistrationStoreModel> {}
export const createUserRegistrationStoreDefaultModel = () => types.optional(UserRegistrationStoreModel, {})
