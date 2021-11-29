function ErrorPage() {
    return (
        <div className="page-container"
            style={{
                minHeight: 130
            }}>

            <div className="container">

                <div className="row row-padding">

                    <div className="col-md-12 text-center">

                        <div style={{
                            color: "tomato",
                            fontSize: 24,
                            marginTop: 40
                        }}>
                            Page not found!
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ErrorPage;
