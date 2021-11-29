import './AuthPage.css';
import { useState, useEffect, lazy } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginForm = lazy(() => import('./LoginForm'));
const ForgotPasswordForm = lazy(() => import('./ForgotPasswordForm'));
const SignupForm = lazy(() => import('./SignupForm'));

const UserRoles = {
    USER_LOGIN: "USER_LOGIN",
    USER_REGISTER: "USER_REGISTER",
    FORGOT_PASSWORD: "FORGOT_PASSWORD"
}

const mapState = ({ auth, userData }) => ({
    auth: auth,
    userData: userData
})

function AuthPage() {

    const { auth, userData } = useSelector(mapState);

    const navigate = useNavigate();

    const [userRole, setUserRole] = useState(UserRoles.USER_LOGIN);
    const [inputData, setInputData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    })

    const handleOnChange = (evt) => {
        const { name, value } = evt.target;

        setInputData((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    const handleUserRole = (role) => {
        setUserRole(role);
    }

    useEffect(() => {

        if (auth.authenticated) {

            if (userData.fetched) {
                navigate("/")
            }

        }

        const anchor = document.querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return () => { }

    }, [
        auth.authenticated, navigate,
        userData.fetched
    ])

    return (
        <div className="page-container" id="auth-page">

            <div className="row" style={{
                paddingTop: 20,
                paddingBottom: 100,
                justifyContent: "center"
            }}>

                <div className="col-xl-10 col-md-12">

                    <div className="form-area">

                        {(() => {
                            switch (userRole) {
                                case UserRoles.USER_LOGIN:
                                    return (
                                        <LoginForm
                                            auth={auth}
                                            userData={userData}
                                            inputData={inputData}
                                            setInputData={setInputData}
                                            handleOnChange={handleOnChange}
                                            userRoles={UserRoles}
                                            handleUserRole={handleUserRole}
                                        />
                                    )

                                case UserRoles.USER_REGISTER:
                                    return (
                                        <SignupForm
                                            auth={auth}
                                            userData={userData}
                                            inputData={inputData}
                                            setInputData={setInputData}
                                            handleOnChange={handleOnChange}
                                            userRoles={UserRoles}
                                            handleUserRole={handleUserRole}
                                        />
                                    )

                                case UserRoles.FORGOT_PASSWORD:
                                    return (
                                        <ForgotPasswordForm
                                            auth={auth}
                                            userData={userData}
                                            inputData={inputData}
                                            setInputData={setInputData}
                                            handleOnChange={handleOnChange}
                                            userRoles={UserRoles}
                                            handleUserRole={handleUserRole}
                                        />
                                    )

                                default:
                                    break;
                            }
                        })()}

                    </div>

                </div>

            </div>

        </div>
    )
}

export default AuthPage;
