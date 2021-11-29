import "./Footer.css";
import LogoImg from "../../assets/logo.webp";
import { useNavigate } from 'react-router-dom';

function Footer() {

    let navigate = useNavigate()

    return (
        <div className="footer" id="footer">

            <div className="footer-bottom">

                <img onClick={
                    () => navigate("/")
                }
                    className="footer-logo"
                    src={LogoImg}
                    alt="logo"
                    width="100%"
                    height="auto"
                    loading="lazy"
                />

                <div style={{
                    fontSize: 14,
                    textAlign: "center"
                }}>
                    © 2021 Gyan Sangrah - An online library portal by NixLab Techonologies.
                </div>

            </div>

        </div>
    )
}

export default Footer;
