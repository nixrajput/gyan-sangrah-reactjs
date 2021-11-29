import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    verifyAuth,
    getcurrentUserData
} from '../../redux/actions';
import LoadingWidget from '../widgets/LoadingWidget';

const Header = lazy(() => import("../header/Header"));
const RoutesPage = lazy(() => import('../routes/RoutesPage'));
const Footer = lazy(() => import("../footer/Footer"));
const Notifier = lazy(() => import('../widgets/Notifier'));

const mapState = ({ auth, userData }) => ({
    auth: auth,
    userData: userData
})

function MainPage() {

    const { auth, userData } = useSelector(mapState);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(verifyAuth())
            .then(() => {
                console.log('authentication checked')
            })
            .catch((err) => {
                console.log(err.message)
            })

        return () => { }
    },
        [
            dispatch, auth.authenticated,
            auth.currentUser
        ]
    )

    useEffect(() => {
        if (auth.authenticated && auth.currentUser !== null) {

            dispatch(getcurrentUserData())
                .then(() => {
                    console.log('user data fetched')
                })
                .catch((err) => {
                    console.log(err.message)
                })
        }
        return () => { }
    }, [
        dispatch, auth.authenticated,
        auth.currentUser
    ])

    return (
        <div>

            <Header />

            <Notifier />

            <div style={{ height: 0 }} id="back-to-top-anchor" />

            {
                (auth.authenticating ||
                    userData.fetching) ?
                    <div className="page-container"
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingTop: "40px",
                            paddingBottom: "100px"
                        }}>
                        <LoadingWidget />
                    </div>
                    :
                    <RoutesPage />
            }

            <Footer />

        </div>
    )
}

export default MainPage;
