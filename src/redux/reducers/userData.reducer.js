import { userDataConstants } from '../constants'

const initState = {
    currentUser: {},
    customUser: {},
    allUsers: [],
    fetching: false,
    fetched: false,
    fetchingAllUsers: false,
    fetchedAllUsers: false,
    updating: false,
    updated: false,
    deleting: false,
    deleted: false,
    error: null,
}

const userDataReducer = (state = initState, action) => {
    switch (action.type) {
        // GET CURRENT USER DATA
        case `${userDataConstants.GET_USER_DATA}_REQUEST`:
            return state = {
                ...state,
                fetching: true
            }
        case `${userDataConstants.GET_USER_DATA}_SUCCESS`:
            return state = {
                ...state,
                currentUser: action.payload.currentUser,
                fetching: false,
                fetched: true
            }
        case `${userDataConstants.GET_USER_DATA}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                fetching: false,
                fetched: false
            }

        // GET ALL USER DATA
        case `${userDataConstants.GET_ALL_USER_DATA}_REQUEST`:
            return state = {
                ...state,
                fetchingAllUsers: true
            }
        case `${userDataConstants.GET_ALL_USER_DATA}_SUCCESS`:
            return state = {
                ...state,
                allUsers: [...action.payload.allUsers],
                fetchingAllUsers: false,
                fetchedAllUsers: true
            }
        case `${userDataConstants.GET_ALL_USER_DATA}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                fetchingAllUsers: false,
                fetchedAllUsers: false
            }

        // GET CUSTOM USER DATA
        case `${userDataConstants.GET_CUSTOM_USER_DATA}_REQUEST`:
            return state = {
                ...state,
                fetching: true
            }
        case `${userDataConstants.GET_CUSTOM_USER_DATA}_SUCCESS`:
            return state = {
                ...state,
                customUser: action.payload.customUser,
                fetching: false,
                fetched: true
            }
        case `${userDataConstants.GET_CUSTOM_USER_DATA}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                fetching: false,
                fetched: false
            }

        // UPDATE CURRENT USER DATA
        case `${userDataConstants.UPDATE_USER_DATA}_REQUEST`:
            return state = {
                ...state,
                updating: true
            }
        case `${userDataConstants.UPDATE_USER_DATA}_SUCCESS`:
            return state = {
                ...state,
                updating: false,
                updated: true,
            }
        case `${userDataConstants.UPDATE_USER_DATA}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                updating: false,
                updated: false,
            }

        default:
            return state;
    }
}

export default userDataReducer;