import { UserCredential, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, storage } from '../../config/firebase.config';
import { translate } from 'app/i18n';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes, uploadString } from 'firebase/storage';
import { User, UserModel } from 'app/models/User';
import { get } from 'firebase/database';

/**
 * Create a new user in Firebase
 * @param email Email address
 * @param password Password
 * @returns Firebase user
 */
export const registerUser = async (values: { email: string, password: string }) => {
    try {
        // Create user in Firebase
        const response = await createUserWithEmailAndPassword(auth, values.email, values.password);

        // Check if user was created
        if (!response.user) {
            throw new Error(translate('firebaseAuth.userCreationError'));
        }

        // Create user in Firestore
        const newUser = await createUser(response, values);
        return newUser;
    } catch (error) {
        console.log({ error })
        // Handle errors
        if (error.code === 'auth/email-already-in-use') {
            throw new Error(translate('firebaseAuth.emailAlreadyInUse'));
        }

        if (error.code === 'auth/invalid-email') {
            throw new Error(translate('firebaseAuth.invalidEmail'));
        }

        throw new Error(translate('firebaseAuth.userCreationError'));
    }
}

/**
 * Create a user in Firestore
 * @param user Firebase user
 * @param values Form values
 */
const createUser = async (userCredential: UserCredential, values: { email: string }) => {
    try {
        const {user} = userCredential;
        // Create user object

        const userObject: User = UserModel.create({
            uid: user.uid,
            email: values.email.toLowerCase(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Create user in Firestore
        await setDoc(doc(db, 'users', user.uid), userObject);
        return userObject;
    } catch (error) {
        console.log({ error })
        throw new Error(translate('firebaseAuth.userCreationError'));
    }
}

/**
 * Fetch a user from Firestore
 * @param uid User ID
 * @returns User object
 * @throws Error
 */
export const fetchUser = async (uid: string): Promise<User> => {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as User;
        } else {
            throw new Error(translate('fetchUserErrors.userNotFound'));
        }

    } catch (error) {
        throw new Error(translate('fetchUserErrors.userFetchError'));
    }
}

/**
 * Upload profile image to Firebase Storage and update user object in Firestore
 * 
 */
export const uploadProfileImage = async (file, user: User) => {
    console.log({ file, user })
    try {
        // Create a storage reference from our storage service
        const storageRef = ref(storage, `users/${user.uid}/profile-image`);
        // Upload file and metadata
        const snapshot = await uploadBytes(storageRef, file,);
        // Get download URL
        const downloadUrl = await getDownloadURL(storageRef)
        console.log({ downloadUrl })

        //Update user object in Firestore
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
            ...user,
            profileImage: downloadUrl,
            updatedAt: new Date(),
        }, { merge: true });
        const updatedUser = await getDoc(userRef);
        if (updatedUser.exists()) {
            return updatedUser.data() as User;
        }else {
            throw new Error(translate('fetchUserErrors.userNotFound'));
        }
    } catch (error) {
        console.log({ error })
        throw new Error(translate('profileImageUploadErrors.uploadError'));
    }
}