import { combineReducers } from 'redux';
import snackbarReducer from './snackbar.reducer';
import authReducer from './auth.reducer';
import userDataReducer from './userData.reducer';
import libraryReducer from './library.reducer';

const rootReducer = combineReducers({
    snackbar: snackbarReducer,
    auth: authReducer,
    userData: userDataReducer,
    library: libraryReducer
})

export default rootReducer;