function LoadingWidget() {
    return (
        <div className="animated-icon"
            style={{
                width: 48,
                height: 48,
                backgroundColor: "var(--whiteColor)",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                padding: "15px",
                boxShadow: "var(--boxShadow)"
            }}>

            <div style={{
                color: "var(--activeColor)",
                fontSize: "10px",
                fontWeight: "600"
            }}>
                Loading...
            </div>

        </div>
    )
}

export default LoadingWidget;
