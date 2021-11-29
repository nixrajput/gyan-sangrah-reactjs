import './AdminPage.css';
import { useNavigate } from 'react-router-dom';

function AdminPage() {

    let navigate = useNavigate();

    return (
        <div className="page-container" id="admin">

            <div className="row row-padding"
                style={{
                    paddingBottom: 40
                }}>

                <div className="col-xl-10 col-md-12">

                    <div style={{
                        marginTop: "20px",
                        marginBottom: "30px",
                        fontSize: "24px",
                        fontWeight: "700",
                        textAlign: "center",
                        textTransform: "capitalize",
                        textDecoration: "underline"
                    }}>
                        Admin Panel
                    </div>

                    <button className="rounded-filled-btn"
                        style={{
                            margin: "auto"
                        }}
                        onClick={
                            () => navigate("/add-book")
                        }>
                        Upload
                    </button>

                </div>

            </div>

        </div>
    )
}

export default AdminPage;
