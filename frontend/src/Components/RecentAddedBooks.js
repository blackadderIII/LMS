import React, { useEffect, useState } from 'react'
import './RecentAddedBooks.css'
import axios from 'axios'

function RecentAddedBooks() {
    const API_URL = process.env.REACT_APP_API_URL
    const [recentBook,setrecentBook] = useState([])
    useEffect(()=>{
            const getRecentBooks = async ()=>{
                try{
                    const response = await axios.get(API_URL+'api/books/allbooks');
                    setrecentBook(response.data)
                    return
                }
                catch(error){
                    console.log(error)
                }
            }
            getRecentBooks()
    },[API_URL])

    return (
        <div className='recentaddedbooks-container'>
            <h className='recentbooks-title'>Recent Uploads</h>
            <div className='recentbooks'>
                <div className='images'>
                {recentBook.map((book)=> <img className='recent-book' key={book._id} src={book.bookCoverImage ? `data:image/jpeg;base64,${book.bookCoverImage}` : "assets/coverImages/default.png"} alt=''></img> )}
                </div>
                <div className='images'>
                {recentBook.map((book)=> <img className='recent-book' key={book._id} src={book.bookCoverImage ? `data:image/jpeg;base64,${book.bookCoverImage}` : "assets/coverImages/default.png"} alt=''></img> )}
                </div>
            </div>
        </div>
    )
}

export default RecentAddedBooks