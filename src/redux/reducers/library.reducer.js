import { libraryConstants } from '../constants'

const initState = {
    books: [],
    fetching: false,
    fetched: false,
    adding: false,
    added: false,
    updating: false,
    updated: false,
    deleting: false,
    deleted: false,
    error: null,
}

const libraryReducer = (state = initState, action) => {
    switch (action.type) {
        // GET ALL BOOKS
        case `${libraryConstants.GET_ALL_BOOK}_REQUEST`:
            return state = {
                ...state,
                fetching: true
            }
        case `${libraryConstants.GET_ALL_BOOK}_SUCCESS`:
            return state = {
                ...state,
                books: [...action.payload.books],
                fetching: false,
                fetched: true
            }
        case `${libraryConstants.GET_ALL_BOOK}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                fetching: false,
                fetched: false
            }

        // ADD A BOOK
        case `${libraryConstants.ADD_BOOK}_REQUEST`:
            return state = {
                ...state,
                adding: true
            }
        case `${libraryConstants.ADD_BOOK}_SUCCESS`:
            return state = {
                ...state,
                adding: false,
                added: true
            }
        case `${libraryConstants.ADD_BOOK}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                adding: false,
                added: false
            }

        // UPDATE A BOOK
        case `${libraryConstants.UPDATE_BOOK}_REQUEST`:
            return state = {
                ...state,
                updating: true
            }
        case `${libraryConstants.UPDATE_BOOK}_SUCCESS`:
            return state = {
                ...state,
                updating: false,
                updated: true,
            }
        case `${libraryConstants.UPDATE_BOOK}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                updating: false,
                updated: false,
            }

        // DELETE A BOOK
        case `${libraryConstants.DELETE_BOOK}_REQUEST`:
            return state = {
                ...state,
                deleting: true
            }
        case `${libraryConstants.DELETE_BOOK}_SUCCESS`:
            return state = {
                ...state,
                deleting: false,
                deleted: true,
            }
        case `${libraryConstants.DELETE_BOOK}_FAILURE`:
            return state = {
                ...state,
                error: action.payload.error,
                deleting: false,
                deleted: false,
            }

        default:
            return state;
    }
}

export default libraryReducer;