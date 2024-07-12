import React, { useEffect,useState } from "react";
import "./Allbooks.css";
import axios from "axios";

function Allbooks() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [books,setBooks] = useState([]);
  const [loading,setLoading] = useState(true);

    useEffect(()=>{
      const getBooks = async () => {
      try {
        const result = await axios.get(
          API_URL + "api/books/allbooks"
        );
        setBooks(result.data);
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getBooks()
    })


  return (
    <div className="books-page">
      <div className="books">

      {loading ? (<div className="loading"></div>):(
        books.map((book)=>(
          <div className="book-card" key={book._Id}>
          <img
             src={book.bookCoverImage ? `data:image/jpeg;base64,${book.bookCoverImage}` : "assets/coverImages/default.png"}
            alt=""
          ></img>
          <p className="bookcard-title">{book.bookName}</p>
          <p className="bookcard-author">{book.author}</p>
          <div className="bookcard-category">
            <p>{book.language}</p>
            <span>Available Copies : {book.bookCountAvailable}</span>
          </div>
          <div className="bookcard-emptybox"></div>
          </div>
        ))

      )}
      </div>
    </div>
  );
}

export default Allbooks;
