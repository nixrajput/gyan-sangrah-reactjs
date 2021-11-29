import {snackbarConstants} from '../constants';
import { v4 as uuidv4 } from 'uuid';

export const enqueueSnackbar = (notification) => {
    const key = notification.options && notification.options.key;

    return {
        type: snackbarConstants.ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || uuidv4(),
        },
    };
};

export const closeSnackbar = key => ({
    type: snackbarConstants.CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const removeSnackbar = key => ({
    type: snackbarConstants.REMOVE_SNACKBAR,
    key,
});