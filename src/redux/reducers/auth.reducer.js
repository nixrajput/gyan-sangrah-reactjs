import { authConstants } from '../constants'

const initState = {
    uid: '',
    currentUser: null,
    authenticating: false,
    authenticated: false,
    creating: false,
    created: false,
    sending: false,
    sent: false,
    error: null
}

const authReducer = (state = initState, action) => {

    switch (action.type) {
        // USER LOG IN
        case `${authConstants.USER_LOGIN}_REQUEST`:
            return state = {
                ...state,
                authenticating: true
            }
        case `${authConstants.USER_LOGIN}_SUCCESS`:
            return state = {
                ...state,
                currentUser: action.payload.currentUser,
                authenticating: false,
                authenticated: true
            }
        case `${authConstants.USER_LOGIN}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                authenticated: false,
                authenticating: false
            }

        // GOOGLE SIGN IN
        case `${authConstants.USER_GOOGLE_SIGN_IN}_REQUEST`:
            return state = {
                ...state,
                authenticating: true
            }
        case `${authConstants.USER_GOOGLE_SIGN_IN}_SUCCESS`:
            return state = {
                ...state,
                currentUser: action.payload.currentUser,
                authenticating: false,
                authenticated: true
            }
        case `${authConstants.USER_GOOGLE_SIGN_IN}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                authenticated: false,
                authenticating: false
            }

        // USER SIGN UP
        case `${authConstants.USER_SIGNUP}_REQUEST`:
            return state = {
                ...state,
                creating: true
            }
        case `${authConstants.USER_SIGNUP}_SUCCESS`:
            return state = {
                ...state,
                creating: false,
                created: true
            }
        case `${authConstants.USER_SIGNUP}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                created: false,
                creating: false
            }

        // GOOGLE SIGN UP
        case `${authConstants.USER_GOOGLE_SIGN_UP}_REQUEST`:
            return state = {
                ...state,
                creating: true
            }
        case `${authConstants.USER_GOOGLE_SIGN_UP}_SUCCESS`:
            return state = {
                ...state,
                creating: false,
                created: true
            }
        case `${authConstants.USER_GOOGLE_SIGN_UP}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                created: false,
                creating: false
            }


        // AUTO LOG IN
        case `${authConstants.AUTO_LOGGED_IN}_SUCCESS`:
            return state = {
                ...state,
                currentUser: action.payload.currentUser,
                authenticating: false,
                authenticated: true
            }


        // LOGOUT
        case `${authConstants.USER_LOGGED_OUT}_SUCCESS`:
            return state = {
                ...initState
            }

        // SENDING PASSWORD RESET EMAIL
        case `${authConstants.PASSWORD_RESET_EMAIL}_REQUEST`:
            return state = {
                ...state,
                sending: true
            }
        case `${authConstants.PASSWORD_RESET_EMAIL}_SUCCESS`:
            return state = {
                ...state,
                sending: false,
                sent: true
            }
        case `${authConstants.PASSWORD_RESET_EMAIL}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                sending: false,
                sent: false
            }

        default:
            return state;
    }
}

export default authReducer;