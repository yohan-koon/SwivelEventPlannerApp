import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { User, UserModel, createUserDefaultModel } from "./User"
import { fetchUser } from "app/services/firebase"
import { translate } from "app/i18n"
import { set } from "firebase/database"

/**
 * Model description here for TypeScript hints.
 */
export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    user: types.optional(UserModel, {}),
    isLoggedIn: types.optional(types.boolean, false),
    isCompletedInitialSetup: types.optional(types.boolean, false),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    async setAuthState(isLoggedIn: boolean, isCompletedInitialSetup: boolean, user: any){
      self.user = user || UserModel.create({})
      self.isLoggedIn = isLoggedIn
      self.isCompletedInitialSetup = isCompletedInitialSetup
    },
    
  }))
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async setUser(firebaseAuthUser: any){
      try{
        if(!firebaseAuthUser){
          self.setAuthState(false, false, null)
        }else if(firebaseAuthUser){
          // Check if user exists in Firestore
          const firestoreUser: User = await fetchUser(firebaseAuthUser.uid);
          if(!firestoreUser){
            self.setAuthState(true, false, null)
          }else{
            self.setAuthState(true, firestoreUser?.firstName && firestoreUser?.firstName != '' ? true : false , firestoreUser)
          }
        }
      }catch(error){
        throw new Error(translate('firebaseAuth.userCreationError'))
      }
    },
    async setFirestoreUser(firestoreUser: User){
      self.setAuthState(true, firestoreUser?.firstName && firestoreUser?.firstName != '' ? true : false , firestoreUser)
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshotOut extends SnapshotOut<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshotIn extends SnapshotIn<typeof AuthenticationStoreModel> {}
export const createAuthenticationStoreDefaultModel = () => types.optional(AuthenticationStoreModel, {})
