import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import GoogleLogoImg from '../../assets/google-logo.webp';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar as closeSnackbarAction,
    registerUser, verifyAuth,
    signUpWithGoogle
} from '../../redux/actions';
import LoadingWidget from '../widgets/LoadingWidget';

function SignupForm({
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

    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

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

    const handleGoogleSignUp = () => {
        dispatch(signUpWithGoogle())
            .then(() => {
                handleShowSnackbar(
                    "You are logged in successfully.",
                    "success",
                    "google_sign_up_success",
                );
            })
            .catch((err) => {
                handleShowSnackbar(
                    err.message,
                    "error",
                    "google_sign_up_error",
                )
            })
    }

    const handleSubmit = () => {
        if (inputData.name === "" && inputData.name.length <= 0) {
            handleShowSnackbar(
                "Full name field is required.",
                "warning",
                "fname_field_error"
            )
        }
        else if (inputData.email === "" && inputData.email.length <= 0) {
            handleShowSnackbar(
                "Email field is required.",
                "warning",
                "email_field_error"
            )
        }
        else if (inputData.email !== "" && /^(([^<>()[\].,;:\s@]+(\.[^<>()[\],;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(inputData.email) === false) {
            handleShowSnackbar(
                "Email address is invalid.",
                "warning",
                "email_field_error"
            )
        }
        else if (inputData.phone === "" && inputData.phone.length <= 0) {
            handleShowSnackbar(
                "Phone field is required.",
                "warning",
                "phone_field_error"
            )
        }
        else if (inputData.phone !== "" && inputData.phone.length < 10) {
            handleShowSnackbar(
                "Phone number is invalid. Phone number must be at least 10 digits.",
                "warning",
                "phone_field_error"
            )
        }
        else if (inputData.phone !== "" && !/^\d+$/.test(inputData.phone)) {
            handleShowSnackbar(
                "Phone field is invalid.",
                "warning",
                "phone_field_error"
            )
        }
        else if (inputData.password === "" && inputData.password.length <= 0) {
            handleShowSnackbar(
                "Password field is required.",
                "warning",
                "password_field_error"
            )
        }
        else if (inputData.password !== "" && inputData.password.length < 8) {
            handleShowSnackbar(
                "Password length must be at least 8 characters.",
                "warning",
                "password_field_error"
            )
        }
        else if (!agreeTerms) {
            handleShowSnackbar(
                "You must agree to our Privacy Policy and Terms of Use before creating an account.",
                "warning",
                "agree_field_error"
            )
        }
        else {
            const _data = {
                name: inputData.name,
                email: inputData.email,
                phone: inputData.phone,
                pass: inputData.password
            }

            dispatch(registerUser(_data))
                .then(() => {
                    setInputData({
                        name: "",
                        email: "",
                        phone: "",
                        password: ""
                    });
                    setAgreeTerms(false);
                    setShowPassword(false);
                    handleShowSnackbar(
                        "Account created successfully.",
                        "success",
                        "register_success",
                        true
                    );
                    handleShowSnackbar(
                        "A verification email has been sent to your email associated with this account. Check your email and verify your account.",
                        "success",
                        "ver_email_sent",
                        true
                    )
                    dispatch(verifyAuth());
                    handleUserRole(userRoles.USER_LOGIN)

                }).catch((err) => {
                    handleShowSnackbar(
                        err.message,
                        "error",
                        "signup_error"
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
                    (auth.authenticating || auth.creating) ?
                        <div>
                            <LoadingWidget />
                        </div> :
                        <div style={{
                            width: "100%"
                        }}>

                            <div style={{
                                fontSize: "24px",
                                fontWeight: "700",
                                textAlign: "center",
                                marginBottom: 10
                            }}>
                               Create an account
                            </div>

                            <button className="rounded-outlined-btn"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    width: "100%",
                                    backgroundColor: "var(--activeColor)",
                                    padding: "5px 10px",
                                    marginTop: 20
                                }}
                                onClick={handleGoogleSignUp}>

                                <div style={{
                                    marginRight: "25%",
                                    backgroundColor: "var(--whiteColor)",
                                    padding: "10px",
                                    borderRadius: "50%"
                                }}>
                                    <img style={{
                                        width: 16,
                                        height: 16,
                                        aspectRatio: "1",
                                        objectFit: "cover"
                                    }}
                                        src={GoogleLogoImg}
                                        alt="google-logo"
                                        width="100%"
                                        height="auto"
                                        loading="lazy"
                                    />
                                </div>

                                <div style={{
                                    color: "var(--whiteColor)",
                                }}>
                                    Sign Up with Google
                                </div>
                            </button>

                            <div className="or-area">
                                or
                            </div>

                            <div>

                                <div className="form-item">
                                    <label htmlFor="name">Full Name *</label>
                                    <input type="text"
                                        placeholder="Full name"
                                        name="name"
                                        required
                                        disabled={auth.creating}
                                        value={inputData.name}
                                        onChange={handleOnChange}
                                    />
                                </div>

                                <div className="form-item">
                                    <label htmlFor="email">Email *</label>
                                    <input type="email"
                                        placeholder="Your email"
                                        name="email"
                                        required
                                        disabled={auth.creating}
                                        value={inputData.email}
                                        onChange={handleOnChange}
                                    />
                                </div>

                                <div className="form-item">
                                    <label htmlFor="phone">Phone *</label>
                                    <input type="text"
                                        placeholder="Phone"
                                        name="phone"
                                        required
                                        disabled={auth.creating}
                                        value={inputData.phone}
                                        onChange={handleOnChange}
                                    />
                                </div>

                                <div className="form-item">
                                    <label htmlFor="password">Password *</label>
                                    <input type={showPassword ? "text" : "password"}
                                        placeholder="Your password"
                                        name="password"
                                        required
                                        disabled={auth.creating}
                                        value={inputData.password}
                                        onChange={handleOnChange}
                                    />
                                </div>

                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "start",
                                    marginLeft: 4,
                                    marginTop: 10
                                }}>
                                    <input type="checkbox"
                                        name="showPassword"
                                        value="showPassword"
                                        checked={showPassword}
                                        onChange={
                                            () => setShowPassword(!showPassword)
                                        }
                                    />
                                    <label htmlFor="showPassword"
                                        style={{
                                            marginLeft: 8,
                                            fontSize: 14,
                                            fontWeight: 600
                                        }}>Show Password</label>
                                </div>

                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginLeft: 4,
                                    marginTop: 15
                                }}>
                                    <input 
                                        type="checkbox"
                                        name="agreeTerms"
                                        value="agreeTerms"
                                        checked={agreeTerms}
                                        onChange={
                                            () => setAgreeTerms(!agreeTerms)
                                        }
                                    />
                                    <label htmlFor="agreeTerms"
                                        style={{
                                            marginLeft: 8,
                                            fontSize: 14,
                                            fontWeight: 600
                                        }}>Yes. I agreed with Gyan Sangrah's Terms of Services and Privacy Policy</label>
                                </div>

                                <button className="rounded-filled-btn"
                                    style={{
                                        width: "100%",
                                        marginTop: 30,
                                        padding: 15
                                    }}
                                    onClick={handleSubmit}>
                                    Sign Up
                                </button>

                                <div style={{
                                    marginTop: 20,
                                    textAlign: "center",
                                    fontWeight: 600,
                                }}>
                                    Already registered? <span
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

export default SignupForm;
