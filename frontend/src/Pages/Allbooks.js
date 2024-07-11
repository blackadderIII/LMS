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
    },[])


  return (
    <div className="books-page">
      <div className="books">

      {loading ? (<div className="loading"></div>):(
        books.map((book)=>(
          <div className="book-card" key={book._Id}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp16xiXu1ZtTzbLy-eSwEK4Ng6cUpUZnuGbQ&usqp=CAU"
            alt=""
          ></img>
          <p className="bookcard-title">{book.bookName}</p>
          <p className="bookcard-author">{book.
            author}</p>
          <div className="bookcard-category">
            <p>{book.language}</p>
            <span>Available Copies : {book.bookCountAvailable}</span>
          </div>
          <div className="bookcard-emptybox"></div>
          </div>
        ))

      )}
        {/* <div className="book-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp16xiXu1ZtTzbLy-eSwEK4Ng6cUpUZnuGbQ&usqp=CAU"
            alt=""
          ></img>
          <p className="bookcard-title">Wings Of Fire</p>
          <p className="bookcard-author">By Pranavdhar</p>
          <div className="bookcard-category">
            <p>Auto Biography</p>
          </div>
          <div className="bookcard-emptybox"></div>
        </div> */}
        {/* <div className="book-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Rb2t6jA5ml7n57qdTZbAOWX1qSfsLCbaOA&usqp=CAU"
            alt=""
          ></img>
          <p className="bookcard-title">The Power Of Your Subconscious Mind</p>
          <p className="bookcard-author">By Joseph</p>
          <div className="bookcard-category">
            <p>Psychology</p>
          </div>
          <div className="bookcard-emptybox"></div>
        </div>
        <div className="book-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRFiDRQ7a-Oo-CnMmnbIMApP1Cq9B5bYx-UA&usqp=CAU"
            alt=""
          ></img>
          <p className="bookcard-title">Elon Musk</p>
          <p className="bookcard-author">By Elon</p>
          <div className="bookcard-category">
            <p>Auto Biography</p>
          </div>
          <div className="bookcard-emptybox"></div>
        </div>
        <div className="book-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Rb2t6jA5ml7n57qdTZbAOWX1qSfsLCbaOA&usqp=CAU"
            alt=""
          ></img>
          <p className="bookcard-title">The Subtle Art Of Not Giving A Fuck</p>
          <p className="bookcard-author">By Mark Manson</p>
          <div className="bookcard-category">
            <p>COMIC</p>
          </div>
          <div className="bookcard-emptybox"></div>
        </div> */}
      </div>
    </div>
  );
}

export default Allbooks;
