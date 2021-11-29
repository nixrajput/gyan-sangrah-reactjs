import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const mapState = ({ auth, userData }) => ({
    auth: auth,
    userData: userData
});

const PrivateRoute = ({ children }) => {

    const { auth } = useSelector(mapState);

    const location = useLocation();

    return (
        auth.authenticated ?
            children :
            <Navigate
                to="/login"
                replace
                state={{ path: location.pathname }}
            />
    )

}

export default PrivateRoute;
