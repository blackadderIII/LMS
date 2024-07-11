import React ,{useState, useEffect} from 'react'
import './ReservedBooks.css'
import axios from "axios"
function ReservedBooks() {
    const API_URL = process.env.REACT_APP_API_URL;

    const [recentTransactions, setRecentTransactions] = useState([])

    /* Fetch Transactions */
    useEffect(() => {
        const getTransactions = async () => {
            try {
                const response = await axios.get(API_URL + "api/transactions/all-transactions")
                setRecentTransactions(response.data.slice(0, 5))
            }
            catch (err) {
                console.log("Error in fetching transactions")
            }

        }
        getTransactions()
    }, [API_URL])

    return (
        <div className='reservedbooks-container'>
            <h className='reservedbooks-title'>Books On Hold</h>
            <table className='reservedbooks-table'>
                <tr>
                    <th>Name</th>
                    <th>Book</th>
                    <th>Date</th>
                </tr>
                {
                    recentTransactions.map((transaction, index) => {
                        return (
                            <tr key={index}>
                                <td>{transaction.borrowerName}</td>
                                <td>{transaction.bookName}</td>
                                <td>{transaction.updatedAt.slice(0, 10)}</td>
                            </tr>
                        )
                    })
                }
                {/* <tr>
                    <td>Sheperd</td>
                    <td>The Subtle Art</td>
                    <td>10/7/2024</td>
                </tr>
                <tr>
                    <td>Placeholder</td>
                    <td>Wings Of Fire</td>
                    <td>15/9/2024</td>
                </tr>
                <tr>
                    <td>Placeholder</td>
                    <td>The Secret</td>
                    <td>02/9/2024</td>
                </tr>
                <tr>
                    <td>Placeholder</td>
                    <td>Bad Guys</td>
                    <td>21/7/2024</td>
                </tr>
                <tr>
                    <td>Placeholder</td>
                    <td>Giovanni Rovelli</td>
                    <td>02/7/2024</td>
                </tr> */}
            </table>
        </div>
    )
}

export default ReservedBooks
