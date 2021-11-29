function AboutPage() {
    return (
        <div className="page-container" id="about">

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
                        About
                    </div>

                    <div style={{
                        backgroundColor: "var(--whiteColor)",
                        padding: "15px 20px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>

                        <div style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            marginBottom: "30px",
                            color: "var(--activeColor)"
                        }}>
                            Project Name : Online Library Portal
                        </div>

                        <div style={{
                            fontSize: "16px",
                            fontWeight: "700",
                            marginBottom: "30px"
                        }}>
                            Technologies Used

                            <li style={{
                                fontWeight: "400",
                                marginTop: "10px"
                            }}>
                                Backend - Firebase
                            </li>

                            <li style={{
                                fontWeight: "400",
                                marginTop: "10px"
                            }}>
                                Frontend - React JS
                            </li>

                        </div>

                        <div style={{
                            fontSize: "16px",
                            fontWeight: "700"
                        }}>
                            Team Members

                            <li style={{
                                fontWeight: "400",
                                marginTop: "10px"
                            }}>Nikhil Kumar (Lead Developer)</li>
                            <li style={{
                                fontWeight: "400",
                                marginTop: "10px"
                            }}>Niladri Mandal</li>
                            <li style={{
                                fontWeight: "400",
                                marginTop: "10px"
                            }}>Pappu Kumar Yadav</li>
                            <li style={{
                                fontWeight: "400",
                                marginTop: "10px"
                            }}>Rahul</li>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default AboutPage;
