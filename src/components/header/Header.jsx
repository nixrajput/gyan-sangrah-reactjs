import './Header.css';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.webp';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
    logoutUser
} from '../../redux/actions';

const mapState = ({ auth, userData }) => ({
    auth: auth,
    userData: userData
})

function Header() {

    const { auth, userData } = useSelector(mapState);

    let navigate = useNavigate();

    const dispatch = useDispatch();

    const profileOptionsRef = useRef();

    const [mobileNav, setMobileNav] = useState(true);
    const [mobileNavActive, setMobileNavActive] = useState(false);
    const [showProfileOptions, setShowProfileOptions] = useState(false);

    const handleResetMobileNav = () => {
        setMobileNavActive(false);
    }

    const handleLogout = () => {
        dispatch(logoutUser())
            .catch((err) => {
                console.log(err.message)
            })
    }

    useEffect(() => {
        window.addEventListener("load", () => {
            if (window.innerWidth <= 992) {
                setMobileNav(true);
            }
            else {
                setMobileNav(false);
            }
        })

        window.addEventListener("resize", () => {
            if (window.innerWidth <= 992) {
                setMobileNav(true);
            }
            else {
                setMobileNav(false);
            }
        })
        return () => {
            window.removeEventListener("load", () => { })
            window.removeEventListener("resize", () => { })
        }
    }, [])

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (
                showProfileOptions &&
                profileOptionsRef.current &&
                !profileOptionsRef.current.contains(e.target)
            ) {
                setShowProfileOptions(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [showProfileOptions])

    return (
        <div className="header" id="header">
            <div className="logo"
                onClick={
                    () => {
                        if (mobileNav) handleResetMobileNav()
                        navigate("/")
                    }
                }>
                <img className="logo-img"
                    width="100%"
                    height="100%"
                    src={Logo}
                    alt="logo-img"
                    loading="lazy"
                />
            </div>

            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <div className={
                    mobileNav ?
                        mobileNavActive ?
                            "mobile-nav mobile-nav-active"
                            : "mobile-nav"
                        :
                        "nav-menu"
                }>
                    <ul>

                        <li>
                            <button
                                onClick={
                                    () => {
                                        if (mobileNav) handleResetMobileNav()
                                        navigate("/");
                                    }
                                }>
                                Home
                            </button>
                        </li>

                        {
                            ((auth.authenticated &&
                                userData.fetched) &&
                                userData.currentUser.isAdmin === true) &&
                            <li>
                                <button onClick={
                                    () => {
                                        if (mobileNav) handleResetMobileNav()
                                        navigate("/admin")
                                    }
                                }>
                                    Admin
                                </button>
                            </li>
                        }

                        <li>
                            <button onClick={
                                () => {
                                    if (mobileNav) handleResetMobileNav()
                                    navigate("/about")
                                }
                            }>
                                About
                            </button>
                        </li>
                    </ul>

                    <div className="sign-in-area" ref={profileOptionsRef}>

                        <button className="rounded-filled-btn sign-in-btn"
                            onClick={
                                () => {
                                    if (auth.authenticated) {
                                        handleLogout()
                                    }
                                    else {
                                        if (mobileNav) handleResetMobileNav()
                                        navigate("/login")
                                    }
                                }
                            }>
                            {
                                auth.authenticated ?
                                    "Logout" :
                                    "Sign In"
                            }
                        </button>

                    </div>

                </div>


                {/* Mobile Nav Toggle */}
                <button className="mobile-nav-toggle"
                    onClick={
                        () => setMobileNavActive(!mobileNavActive)
                    }>
                    {
                        mobileNavActive ?
                            <CloseIcon />
                            :
                            <MenuIcon />
                    }
                </button>
                {/* Mobile Nav Toggle */}

            </div>
        </div >
    )
}

export default Header;