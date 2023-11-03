import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { createFirebaseUser, uploadProfileImage } from "app/services/firebase"
import { User, UserModel } from "./User"

/**
 * Model description here for TypeScript hints.
 */
export const UserRegistrationStoreModel = types
  .model("UserRegistrationStore")
  .props({
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.string, ''),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    reset() {
      self.isLoading = false
      self.error = ''
    },
    setIsLoading(isLoading: boolean) {
      self.isLoading = isLoading
    },
    setError(error: string) {
      self.error = error
    }
  }))
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async registerUser(values: { email: string, password: string }) {
      self.setIsLoading(true)
      try {
        await createFirebaseUser(values);
      } catch (error) {
        self.setError(error.message)
      }finally{
        self.setIsLoading(false)
      }
    },
    async uploadProfileImage(file: any, user: User) {
      self.setIsLoading(true)
      try {
        const updatedUser = await uploadProfileImage(file, user);
        return updatedUser;
      } catch (error) {
        self.setError(error.message)
      }finally{
        self.setIsLoading(false)
      }
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface UserRegistrationStore extends Instance<typeof UserRegistrationStoreModel> {}
export interface UserRegistrationStoreSnapshotOut extends SnapshotOut<typeof UserRegistrationStoreModel> {}
export interface UserRegistrationStoreSnapshotIn extends SnapshotIn<typeof UserRegistrationStoreModel> {}
export const createUserRegistrationStoreDefaultModel = () => types.optional(UserRegistrationStoreModel, {})
