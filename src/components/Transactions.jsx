// src/components/Transactions.js
import React, { useState, useEffect } from 'react';
import { getTransactions } from '../api';

const Transactions = ({month}) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 

  useEffect(() => {
    fetchTransactions();
  }, [month, search, page]);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTransactions({ month, search, page, perPage: 10 });
      setTransactions(response.data);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      setError('Error fetching transactions');
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };



  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search change
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <h1>Transactions</h1>
      <div>
        
        <input
          type="text"
          placeholder="Search transactions"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
            <th>Date Of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? 'Yes' : 'No'}</td>
              <td><img src={transaction.image} alt={transaction.title} width="50" /></td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Transactions;
