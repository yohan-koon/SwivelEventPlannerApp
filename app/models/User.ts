import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({
    uid: types.optional(types.string, ''),
    firstName: types.optional(types.string, ''),
    lastName: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    phoneNumber: types.optional(types.string, ''),
    address: types.optional(types.string, ''),
    profileImage: types.optional(types.string, ''),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setFirstName: (value: string) => self.setProp('firstName', value),
    setLastName: (value: string) => self.setProp('lastName', value),
    setEmail: (value: string) => self.setProp('email', value),
    setPhoneNumber: (value: string) => self.setProp('phoneNumber', value),
    setAddress: (value: string) => self.setProp('address', value),
    setProfileImage: (value: string) => self.setProp('profileImage', value),
  }))
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
export const createUserDefaultModel = () => types.optional(UserModel, {
  
})
