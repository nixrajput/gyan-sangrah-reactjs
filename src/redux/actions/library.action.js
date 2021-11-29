import {
    db,
    serverTimeStamp,
    storage
} from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { libraryConstants } from '../constants/index';

export const getAllBooks = () => {
    return async (dispatch) => {

        dispatch({
            type: `${libraryConstants.GET_ALL_BOOK}_REQUEST`
        })

        await db
            .collection("books")
            .get()
            .then((snapshot) => {

                const fetchedBooks = snapshot.docs.map((book) => {
                    return {
                        id: book.id,
                        ...book.data()
                    }
                })

                dispatch({
                    type: `${libraryConstants.GET_ALL_BOOK}_SUCCESS`,
                    payload: { books: fetchedBooks }
                })
            })
            .catch((err) => {
                dispatch({
                    type: `${libraryConstants.GET_ALL_BOOK}_FAILURE`,
                    payload: { error: err.message }
                })
                throw err;
            })
    }
}

export const addBook = (uid, file, data) => {
    return async (dispatch) => {

        dispatch({
            type: `${libraryConstants.ADD_BOOK}_REQUEST`
        })

        if (file != null) {

            let filename = uuidv4();

            await storage
                .ref("books")
                .child(filename)
                .put(file)
                .then(async (snapshot) => {

                    await snapshot
                        .ref
                        .getDownloadURL()
                        .then(async (url) => {

                            await db
                                .collection("books")
                                .add({
                                    ...data,
                                    url: url,
                                    user: db.doc("users/" + uid),
                                    userId: uid,
                                    addedAt: serverTimeStamp
                                })
                                .then(() => {
                                    dispatch({
                                        type: `${libraryConstants.ADD_BOOK}_SUCCESS`
                                    })
                                })
                                .catch((error) => {
                                    dispatch({
                                        type: `${libraryConstants.ADD_BOOK}_FAILURE`,
                                        payload: { error: error.message }
                                    })
                                    throw error;
                                })

                        })
                        .catch((error) => {
                            dispatch({
                                type: `${libraryConstants.ADD_BOOK}_FAILURE`,
                                payload: { error: error.message }
                            })
                            throw error;
                        })

                })
                .catch((error) => {
                    dispatch({
                        type: `${libraryConstants.ADD_BOOK}_FAILURE`,
                        payload: { error: error.message }
                    })
                    throw error;
                })

        }


    }
}