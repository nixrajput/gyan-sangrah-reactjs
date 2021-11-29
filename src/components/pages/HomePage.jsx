import './HomePage.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BookIcon from '@mui/icons-material/Book';
import {
    getAllBooks
} from '../../redux/actions';

const mapState = ({ auth, userData, library }) => ({
    auth: auth,
    userData: userData,
    library: library
})

function HomePage() {

    const { auth, library } = useSelector(mapState);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        const anchor = document.querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return () => { }

    }, [])

    useEffect(() => {
        if (auth.authenticated && auth.currentUser !== null) {

            dispatch(getAllBooks())
                .then(() => {
                    console.log("fetched all books")
                })
                .catch((err) => {
                    console.log(err.message)
                })

        }
        return () => { }
    }, [
        auth.authenticated, dispatch,
        auth.currentUser
    ])

    return (
        <div className="page-container" id="home">

            <div className="row row-padding"
                style={{
                    paddingBottom: 40
                }}>

                <div className="col-xl-10 col-md-12">

                    <div style={{
                        marginTop: "20px",
                        marginBottom: "30px",
                        fontSize: "20px",
                        fontWeight: "700",
                        textAlign: "center",
                        textTransform: "capitalize",
                        textDecoration: "underline"
                    }}>
                        All Book List
                    </div>

                    {
                        library.fetching &&
                        <div style={{
                            margin: "auto",
                            textAlign: "center",
                            color: "var(--activeColor)",
                            fontWeight: "600",
                            marginBottom: "10px"
                        }}>
                            Loading...
                        </div>
                    }

                    {
                        library.fetched &&
                        (Array.isArray(library.books) &&
                            library.books.length > 0) &&
                        library.books.map((item, index) => {
                            return (
                                <div key={index}
                                    className="book-item"
                                    onClick={
                                        () => navigate(`/${item.id}`)
                                    }>

                                    <BookIcon />

                                    <div className="details">

                                        <div className="title">
                                            {item.title}
                                        </div>

                                        <div className="author">
                                            Author : {item.author}
                                        </div>

                                    </div>

                                </div>
                            )
                        })
                    }

                </div>

            </div>

        </div>
    )
}

export default HomePage;
