import React, { useEffect,useState } from "react";
import "./Allbooks.css";
import axios from "axios";
import { useContext } from 'react';
import { SearchContext } from '../Context/searchContext.js';

function Allbooks() {
  const API_URL = process.env.REACT_APP_API_URL;
  const { searchResult } = useContext(SearchContext);
  const [books,setBooks] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const result = await axios.get(API_URL + "api/books/allbooks");
        setBooks(result.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getBooks(); // call getBooks function when component mounts
  }, [API_URL]); // empty dependency array

  useEffect(() => {
    if (!searchResult) {
        
    } else {
      setBooks(searchResult);
    }
  }, [searchResult]);


  return (
    <div className="books-page">
      <div className="books">
        {loading? (
          <div className="loading"></div>
        ) : (
          books.length === 0 ? (
            <div className="no-books-container">
            <img src='assets/images/empty.png' alt='No books' />
              <h2 className="no-books">No books found</h2>
            </div>
          ) : (
            books.map((book)=>(
              <div className="book-card" key={book._Id}>
                <img
                  src={book.bookCoverImage? `data:image/jpeg;base64,${book.bookCoverImage}` : "assets/coverImages/default.png"}
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
          )
        )}
      </div>
    </div>
  );
}

export default Allbooks;
