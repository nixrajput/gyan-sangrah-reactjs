import {
    db,
    serverTimeStamp,
    storage,
    firebaseApp
} from '../../firebase';
import { userDataConstants } from '../constants/index';

export const getcurrentUserData = () => {
    return async (dispatch) => {

        dispatch({
            type: `${userDataConstants.GET_USER_DATA}_REQUEST`
        })

        await db
            .collection("users")
            .doc(firebaseApp.auth().currentUser.uid)
            .get()
            .then(async (snapshot) => {
                const data = snapshot.data();

                dispatch({
                    type: `${userDataConstants.GET_USER_DATA}_SUCCESS`,
                    payload: { currentUser: data }
                })
            })
            .catch((err) => {
                dispatch({
                    type: `${userDataConstants.GET_USER_DATA}_FAILURE`,
                    payload: { error: err.message }
                })
                throw err;
            })
    }
}

export const checkIsProfileCompleteStepOne = (uid) => {
    return async (dispatch) => {

        let isProfileCompleteStepOne = false;

        dispatch({
            type: `${userDataConstants.CHECK_PROFILE_COMPLETE_STEP_ONE}_REQUEST`
        })

        await db
            .collection("users")
            .doc(uid)
            .get()
            .then((snapshot) => {
                const data = snapshot.data();

                if (data.userType !== undefined &&
                    data.userType !== null) {
                    isProfileCompleteStepOne = true;
                }
                else {
                    isProfileCompleteStepOne = false;
                }

                dispatch({
                    type: `${userDataConstants.CHECK_PROFILE_COMPLETE_STEP_ONE}_SUCCESS`,
                    payload: { isProfileCompleteStepOne: isProfileCompleteStepOne }
                })
            })
            .catch((err) => {
                dispatch({
                    type: `${userDataConstants.CHECK_PROFILE_COMPLETE_STEP_ONE}_FAILURE`,
                    payload: { error: err.message }
                })
                throw err;
            })

    }
}

export const checkIsProfileCompleteStepTwo = (uid) => {
    return async (dispatch) => {

        let isProfileCompleteStepTwo = false;

        dispatch({
            type: `${userDataConstants.CHECK_PROFILE_COMPLETE_STEP_TWO}_REQUEST`
        })

        await db
            .collection("users")
            .doc(uid)
            .get()
            .then((snapshot) => {
                const data = snapshot.data();

                if (data.userType === "Candidate") {
                    if (data.linkedInProfileLink && data.category &&
                        data.experienceLevel && data.hourlyRate &&
                        data.monthlyRate && data.highestQualification && data.instituteName) {
                        isProfileCompleteStepTwo = true;
                    }
                    else {
                        isProfileCompleteStepTwo = false;
                    }
                }
                else {

                    if (data.engagementMode) {
                        if (data.engagementMode === "Talented Interns – Hire and groom your next superstars" ||
                            data.engagementMode === "Experienced Hires – Hire the superstar talent now") {
                            isProfileCompleteStepTwo = true;
                        }
                    }

                    else if (data.jobHeadline && data.skills &&
                        data.engagementMode && data.scopeDuration &&
                        data.experienceLevel && data.budgetMode &&
                        data.budgetRangeStart && data.budgetRangeEnd) {
                        isProfileCompleteStepTwo = true;
                    }

                    else {
                        isProfileCompleteStepTwo = false;
                    }
                }

                dispatch({
                    type: `${userDataConstants.CHECK_PROFILE_COMPLETE_STEP_TWO}_SUCCESS`,
                    payload: { isProfileCompleteStepTwo: isProfileCompleteStepTwo }
                })
            })
            .catch((err) => {
                dispatch({
                    type: `${userDataConstants.CHECK_PROFILE_COMPLETE_STEP_TWO}_FAILURE`,
                    payload: { error: err.message }
                })
                throw err;
            })

    }
}

export const getAllUserData = () => {
    return async (dispatch) => {

        dispatch({
            type: `${userDataConstants.GET_ALL_USER_DATA}_REQUEST`
        })

        await db
            .collection("users")
            .get()
            .then((snapshot) => {

                const usersData = snapshot.docs.map((user) => {
                    return {
                        id: user.id,
                        ...user.data()
                    }
                })

                dispatch({
                    type: `${userDataConstants.GET_ALL_USER_DATA}_SUCCESS`,
                    payload: { allUsers: usersData }
                })
            })
            .catch((err) => {
                dispatch({
                    type: `${userDataConstants.GET_ALL_USER_DATA}_FAILURE`,
                    payload: { error: err.message }
                })
                throw err;
            })
    }
}

export const getCustomUserData = (uid) => {
    return async (dispatch) => {

        dispatch({
            type: `${userDataConstants.GET_CUSTOM_USER_DATA}_REQUEST`
        })

        await db
            .collection("users")
            .doc(uid)
            .get()
            .then((snapshot) => {
                const data = snapshot.data();
                dispatch({
                    type: `${userDataConstants.GET_CUSTOM_USER_DATA}_SUCCESS`,
                    payload: { customUser: data }
                })
            }).catch((err) => {
                dispatch({
                    type: `${userDataConstants.GET_CUSTOM_USER_DATA}_FAILURE`,
                    payload: { error: err.message }
                })
                throw err;
            })
    }
}

export const updateUserProfile = (uid, filename, blob, data) => {
    return async (dispatch) => {

        dispatch({
            type: `${userDataConstants.UPDATE_USER_DATA}_REQUEST`
        })

        if (filename !== "" && blob !== null) {
            await storage
                .ref('images')
                .child('avatars')
                .child(uid)
                .child(filename)
                .put(blob, { contentType: blob.type })
                .then(async (snapshot) => {
                    await snapshot
                        .ref
                        .getDownloadURL()
                        .then(async (downloadURL) => {
                            await db
                                .collection('users')
                                .doc(uid)
                                .update({
                                    ...data,
                                    imgUrl: downloadURL,
                                    updatedAt: serverTimeStamp,
                                })
                                .then(() => {
                                    dispatch({
                                        type: `${userDataConstants.UPDATE_USER_DATA}_SUCCESS`
                                    })
                                })
                                .catch((err) => {
                                    dispatch({
                                        type: `${userDataConstants.UPDATE_USER_DATA}_FAILURE`,
                                        payload: { error: err.message }
                                    })
                                    throw err;
                                });
                        })
                        .catch((err) => {
                            dispatch({
                                type: `${userDataConstants.UPDATE_USER_DATA}_FAILURE`,
                                payload: { error: err.message }
                            })
                            throw err;
                        });
                })
                .catch((err) => {
                    dispatch({
                        type: `${userDataConstants.UPDATE_USER_DATA}_FAILURE`,
                        payload: { error: err.message }
                    })
                    throw err;
                });
        }
        else {
            await db
                .collection('users')
                .doc(uid)
                .update({
                    ...data,
                    updatedAt: serverTimeStamp
                })
                .then(() => {
                    dispatch({
                        type: `${userDataConstants.UPDATE_USER_DATA}_SUCCESS`
                    })
                })
                .catch((err) => {
                    dispatch({
                        type: `${userDataConstants.UPDATE_USER_DATA}_FAILURE`,
                        payload: { error: err.message }
                    })
                    throw err;
                });
        }


    }
}