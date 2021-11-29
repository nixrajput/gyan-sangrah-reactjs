import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const mapState = ({ auth, userData, library }) => ({
    auth: auth,
    userData: userData,
    library: library
})

function DetailsPage() {

    const { library } = useSelector(mapState);

    const { book_id } = useParams();

    const [pdfFile, setPdfFile] = useState(null);

    useEffect(() => {

        if (book_id) {
            let book = library.books.find(item => item.id === book_id)
            setPdfFile(book.url)
        }

        return () => { }
    }, [
        book_id,
        library.books
    ])

    return (
        <div className="page-container" id="home"
            style={{
                marginTop: "110px"
            }}>

            <iframe
                title="padf-viewer"
                src={pdfFile}
                width="100%"
                height="100%"
                loading="lazy"
                style={{
                    minHeight: "calc(85vh + 20px)"
                }}
            />

        </div>
    )
}

export default DetailsPage;
