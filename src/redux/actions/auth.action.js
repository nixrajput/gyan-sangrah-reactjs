import {
    firebaseApp,
    db,
    googleAuthProvider,
    serverTimeStamp
} from '../../firebase';
import { authConstants } from '../constants/index';

export const registerUser = (data) => {

    return async (dispatch) => {

        dispatch({
            type: `${authConstants.USER_SIGNUP}_REQUEST`
        })

        await firebaseApp.auth()
            .createUserWithEmailAndPassword(data.email, data.pass)
            .then(async (result) => {
                const user = result.user;
                await user
                    .sendEmailVerification()
                    .then(async () => {
                        await db
                            .collection('users')
                            .doc(user.uid)
                            .set({
                                uid: user.uid,
                                name: data.name,
                                email: user.email,
                                phone: data.phone,
                                isAdmin: false,
                                dateJoined: serverTimeStamp
                            }).then(() => {
                                dispatch({
                                    type: `${authConstants.USER_SIGNUP}_SUCCESS`
                                })
                            })
                            .catch(async (err) => {

                                await firebaseApp.auth().currentUser.delete();

                                dispatch({
                                    type: `${authConstants.USER_SIGNUP}_FAILURE`,
                                    payload: { error: err }
                                })
                                throw err;
                            })
                    })
                    .catch((err) => {
                        dispatch({
                            type: `${authConstants.USER_SIGNUP}_FAILURE`,
                            payload: { error: err }
                        })
                        throw err;
                    })
            })
            .catch((err) => {
                dispatch({
                    type: `${authConstants.USER_SIGNUP}_FAILURE`,
                    payload: { error: err }
                })
                throw err;
            });
    }
}

export const loginUser = (data) => {

    return async (dispatch) => {

        dispatch({
            type: `${authConstants.USER_LOGIN}_REQUEST`
        })

        await firebaseApp.auth()
            .signInWithEmailAndPassword(data.email, data.pass)
            .then(async (result) => {
                const user = result.user;

                dispatch({
                    type: `${authConstants.USER_LOGIN}_SUCCESS`,
                    payload: { currentUser: user }
                })

            })
            .catch((err) => {
                dispatch({
                    type: `${authConstants.USER_LOGIN}_FAILURE`,
                    payload: { error: err.message }
                })
                throw err;
            })
    }
}

export const signUpWithGoogle = () => {
    return async (dispatch) => {

        dispatch({
            type: `${authConstants.USER_GOOGLE_SIGN_UP}_REQUEST`
        })

        const userRef = db.collection("users");

        await firebaseApp
            .auth()
            .signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const user = result.user;

                await userRef
                    .doc(user.uid)
                    .get()
                    .then(async (snapshot) => {
                        if (snapshot.exists) {

                            dispatch({
                                type: `${authConstants.USER_GOOGLE_SIGN_IN}_SUCCESS`,
                                payload: { currentUser: user }
                            })

                        }
                        else {
                            await userRef
                                .doc(user.uid)
                                .set({
                                    uid: user.uid,
                                    name: user.displayName,
                                    email: user.email,
                                    phone: user.phoneNumber,
                                    isAdmin: false,
                                    dateJoined: serverTimeStamp
                                }).then(() => {
                                    dispatch({
                                        type: `${authConstants.USER_GOOGLE_SIGN_UP}_SUCCESS`
                                    })

                                    dispatch({
                                        type: `${authConstants.USER_GOOGLE_SIGN_IN}_REQUEST`
                                    })

                                    dispatch({
                                        type: `${authConstants.USER_GOOGLE_SIGN_IN}_SUCCESS`,
                                        payload: { currentUser: user }
                                    })

                                })
                                .catch(async (err) => {

                                    await firebaseApp.auth().currentUser.delete();

                                    dispatch({
                                        type: `${authConstants.USER_GOOGLE_SIGN_UP}_FAILURE`,
                                        payload: { error: err.message }
                                    })
                                    throw err;
                                })
                        }
                    })
            })
            .catch((err) => {
                dispatch({
                    type: `${authConstants.USER_GOOGLE_SIGN_UP}_FAILURE`,
                    payload: { error: err.message }
                })
                throw err;
            })

    }
}

export const signInWithGoogle = () => {
    return async (dispatch) => {

        dispatch({
            type: `${authConstants.USER_GOOGLE_SIGN_IN}_REQUEST`
        })

        await firebaseApp
            .auth()
            .signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const user = result.user;

                await db
                    .collection("users")
                    .doc(user.uid)
                    .get()
                    .then(async (snapshot) => {
                        if (snapshot.exists) {

                            dispatch({
                                type: `${authConstants.USER_GOOGLE_SIGN_IN}_SUCCESS`,
                                payload: { currentUser: user }
                            })

                        }
                        else {
                            await firebaseApp.auth().currentUser.delete();

                            dispatch({
                                type: `${authConstants.USER_GOOGLE_SIGN_IN}_FAILURE`,
                                payload: { error: "This email address is not registered. Please register the email address first and then try again." }
                            })

                            throw Error("This email address is not registered. Please register the email address first and then try again.");
                        }
                    })

            })
            .catch((err) => {
                dispatch({
                    type: `${authConstants.USER_GOOGLE_SIGN_IN}_FAILURE`,
                    payload: { error: err.message }
                })
                throw err;
            })

    }
}

export const logoutUser = () => {
    return async (dispatch) => {

        await firebaseApp.auth().signOut();

        dispatch({
            type: `${authConstants.USER_LOGGED_OUT}_SUCCESS`
        })
    }
}

export const verifyAuth = () => {
    return async (dispatch) => {
        dispatch({
            type: `${authConstants.AUTO_LOGGED_IN}_REQUEST`
        })

        const unsubscribe = firebaseApp.auth()
            .onAuthStateChanged(user => {
                if (user !== null) {
                    dispatch({
                        type: `${authConstants.AUTO_LOGGED_IN}_SUCCESS`,
                        payload: { currentUser: user }
                    })
                }
                else {
                    dispatch({
                        type: `${authConstants.USER_LOGGED_OUT}_SUCCESS`
                    })
                }
            },
                (err) => {
                    console.log(err.message)
                })
        unsubscribe()
    }
}

export const sendPasswordRestEmail = (email) => {
    return async (dispatch) => {
        dispatch({
            type: `${authConstants.PASSWORD_RESET_EMAIL}_REQUEST`
        })

        await firebaseApp.auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                dispatch({
                    type: `${authConstants.PASSWORD_RESET_EMAIL}_SUCCESS`
                })
            }).catch((err) => {
                dispatch({
                    type: `${authConstants.PASSWORD_RESET_EMAIL}_FAILURE`,
                    payload: { error: err.message }
                })
                throw err;
            });
    }
}