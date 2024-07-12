import React,{useState,useEffect} from "react";
import "./PopularBooks.css";
import axios from "axios";

function PopularBooks() {

  const API_URL = process.env.REACT_APP_API_URL
    const [popularBook,setpopularBook] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    const getPopularBooks = async ()=>{
        try{
            const response = await axios.get(API_URL+'api/books/allbooks');
            setpopularBook(response.data)
            setLoading(false)
            return
        }
        catch(error){
            console.log(error)
            setLoading(false)
        }
    }
    getPopularBooks()
},[API_URL])

  return (
    <div className="popularbooks-container">
      <h className="popularbooks-title">Popular Books</h>
      <div className="popularbooks">
        {loading ? (
          <div className='loading-mini'></div>
        ) : popularBook.length > 0 ? (
          <div className='popularbook-images'>
            {popularBook.map((book) => (
              <img
                className="popular-book"
                key={book._id}
                src={
                  book.bookCoverImage
                    ? `data:image/jpeg;base64,${book.bookCoverImage}`
                    : 'assets/coverImages/default.png'
                }
                alt=''
              />
            ))}
          </div>
        ) : (
          <div className='no-books'>
            <img src='assets/images/empty.png' alt='No recent books' />
            <p className="popularbook">No popular books yet!</p>
          </div>
        )}
        {/* <div className="popularbook-images">
          <img
            className="popular-book"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS34iIDoKVXOhKhdwsiGSLc9RJmtq_lSQDig&usqp=CAU"
            alt=""
          ></img>
          <img
            className="popular-book"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRHNwRyPkTxnMOzOvv5dOK4OS_lq4-2Yugg&usqp=CAU"
            alt=""
          ></img>
          <img
            className="popular-book"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
            alt=""
          ></img>
          <img
            className="popular-book"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS34iIDoKVXOhKhdwsiGSLc9RJmtq_lSQDig&usqp=CAU"
            alt=""
          ></img>
          <img
            className="popular-book"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRHNwRyPkTxnMOzOvv5dOK4OS_lq4-2Yugg&usqp=CAU"
            alt=""
          ></img>
          <img
            className="popular-book"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
            alt=""
          ></img>
        </div> */}
      </div>
    </div>
  );
}

export default PopularBooks;
