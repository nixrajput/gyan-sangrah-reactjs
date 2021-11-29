import './AddBookPage.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import CloseIcon from '@mui/icons-material/Close';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar as closeSnackbarAction,
    addBook
} from '../../redux/actions';

const mapState = ({ auth, userData, library }) => ({
    auth: auth,
    userData: userData,
    library: library
})

function AddBookPage() {

    const { library, auth } = useSelector(mapState);

    const dispatch = useDispatch();
    const showSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
    const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

    const [inputData, setInputData] = useState({
        title: "",
        author: ""
    })
    const [inputFile, setInputFile] = useState(null);

    const handleOnChange = (evt) => {
        const { name, value } = evt.target;

        setInputData((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

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

    const onFileChange = (evt) => {
        const file = evt.target.files[0];

        if (file) {
            setInputFile(file);
        }
    }

    const handleSubmit = () => {
        if (inputData.title === "" && inputData.title.length <= 0) {
            handleShowSnackbar(
                "Title is required.",
                "warning",
                "title_field_error"
            )
        }
        else if (inputFile === null) {
            handleShowSnackbar(
                "File is required.",
                "warning",
                "file_field_error"
            )
        }
        else if (inputData.author === "" && inputData.author.length <= 0) {
            handleShowSnackbar(
                "Author is required.",
                "warning",
                "author_field_error"
            )
        }
        else {
            const _data = {
                title: inputData.title,
                author: inputData.author
            }

            dispatch(addBook(auth.currentUser.uid, inputFile, _data))
                .then(() => {
                    setInputData({
                        title: "",
                        author: ""
                    });
                    setInputFile(null);
                    handleShowSnackbar(
                        "Book uploaded successfully.",
                        "success",
                        "upload_success",
                        true
                    );

                }).catch((err) => {
                    handleShowSnackbar(
                        err.message,
                        "error",
                        "upload_error"
                    );
                });
        }
    }

    return (
        <div className="page-container" id="add-book">

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
                        Upload a book
                    </div>

                    <div className="form-item">
                        <label htmlFor="title">Title *</label>
                        <input type="text"
                            placeholder="Title"
                            name="title"
                            required
                            disabled={library.adding}
                            value={inputData.title}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="author">File *</label>
                        <input type="file"
                            disabled={library.adding}
                            accept=".pdf"
                            onChange={
                                (evt) => onFileChange(evt)
                            }
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="author">Author *</label>
                        <input type="text"
                            placeholder="Author"
                            name="author"
                            required
                            disabled={library.adding}
                            value={inputData.author}
                            onChange={handleOnChange}
                        />
                    </div>

                    <button className="rounded-filled-btn"
                        style={{
                            margin: "auto",
                            marginTop: "40px"
                        }}
                        disabled={library.adding}
                        onClick={handleSubmit}>
                        {
                            library.adding ?
                                "Uploading..." :
                                "Save"
                        }
                    </button>

                </div>

            </div>

        </div>
    )
}

export default AddBookPage
