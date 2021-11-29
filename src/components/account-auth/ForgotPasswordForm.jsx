import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar as closeSnackbarAction,
    sendPasswordRestEmail
} from '../../redux/actions';

function ForgotPasswordForm({
    auth,
    inputData,
    handleOnChange,
    handleUserRole,
    userRoles,
    setInputData
}) {

    const dispatch = useDispatch();
    const showSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
    const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

    const handleShowSnackbar = (message, variant, key, persist) => {
        showSnackbar({
            message: message,
            options: {
                key: key ? key : uuidv4(),
                variant: variant ? variant : "default",
                action: key => (
                    <button
                        onClick={
                            () => closeSnackbar(key)
                        }>
                        <CloseIcon style={{
                            color: "var(--whiteColor)"
                        }} />
                    </button>
                ),
                persist: persist ? true : false,
            }
        })
    }

    const handleSubmit = () => {
        if (inputData.email === "" && inputData.email.length <= 0) {
            handleShowSnackbar(
                "Email field is required.",
                "warning",
                "email_field_error"
            )
        }
        else if (inputData.email !== "" && !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputData.email)) {
            handleShowSnackbar(
                "Email address is invalid.",
                "warning",
                "email_field_error"
            )
        }
        else {
            dispatch(sendPasswordRestEmail(inputData.email))
                .then(() => {
                    setInputData({
                        fname: "",
                        lname: "",
                        email: "",
                        phone: "",
                        password: ""
                    });
                    handleUserRole(userRoles.USER_LOGIN)
                    handleShowSnackbar(
                        "Password reset link sent successfully.",
                        "success",
                        "password_reset_link_success",
                    );
                }).catch((err) => {
                    handleShowSnackbar(
                        err.message,
                        "error",
                        "password_reset_link_error"
                    );
                });
        }
    }

    return (
        <div className="form-card">

            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>

                {
                    (auth.sending) ?
                        <div>
                            Loading...
                        </div> :
                        <div style={{
                            width: "100%"
                        }}>
                            <div style={{
                                fontSize: "20px",
                                fontWeight: "700",
                                textAlign: "center",
                                marginBottom: 30
                            }}>
                                Forgot Password
                            </div>

                            <div className="account-form">

                                <div style={{
                                    color: "#666",
                                    fontWeight: 600,
                                    marginBottom: 30
                                }}>
                                    Enter your email address associated with your <span style={{
                                        color: "var(--activeColor)",
                                        fontWeight: 700
                                    }}>Merito</span> account,
                                    we will send a password reset link to your email.
                                </div>

                                <div className="form-item">
                                    <label htmlFor="email">Email *</label>
                                    <input type="email"
                                        placeholder="Your email"
                                        name="email"
                                        required
                                        disabled={auth.authenticating}
                                        value={inputData.email}
                                        onChange={handleOnChange}
                                    />
                                </div>

                                <button className="rounded-filled-btn"
                                    style={{
                                        width: "100%",
                                        marginTop: 40
                                    }}
                                    onClick={handleSubmit}>
                                    Submit
                                </button>

                                <div style={{
                                    marginTop: 20,
                                    textAlign: "center",
                                    fontWeight: 600
                                }}>
                                    Already a member? <span
                                        style={{
                                            color: "var(--activeColor)",
                                            cursor: "pointer"
                                        }}
                                        onClick={
                                            () => handleUserRole(userRoles.USER_LOGIN)
                                        }>Login Now</span>
                                </div>

                            </div>
                        </div>
                }

            </div>

        </div>
    )
}

export default ForgotPasswordForm;
