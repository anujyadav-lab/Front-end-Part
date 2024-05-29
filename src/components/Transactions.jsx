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
    <div className='flex flex-col items-center m-2'>
  <h1 className="text-2xl font-bold mb-4">Transactions</h1>
  <div className='justify-center p-2 m-2'>
    <div>
      <label htmlFor="search" className="sr-only">Search transactions</label>
      <input
        type="text"
        id="search"
        placeholder="Search transactions"
        value={search}
        onChange={handleSearchChange}
        className="p-2 border rounded-md"
      />
    </div>
  </div>
  <div className='flex justify-center bg-orange-200 w-full'>
  <table className="border-collapse border border-gray-400">
    <thead>
      <tr className="bg-gray-200">
        <th className="border border-gray-400 px-4 py-2">ID</th>
        <th className="border border-gray-400 px-4 py-2">Title</th>
        <th className="border border-gray-400 px-4 py-2">Description</th>
        <th className="border border-gray-400 px-4 py-2">Price</th>
        <th className="border border-gray-400 px-4 py-2">Category</th>
        <th className="border border-gray-400 px-4 py-2">Sold</th>
        <th className="border border-gray-400 px-4 py-2">Image</th>
        <th className="border border-gray-400 px-4 py-2">Date Of Sale</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map((transaction) => (
        <tr key={transaction._id} className="bg-white">
          <td className="border border-gray-400 px-4 py-2">{transaction.id}</td>
          <td className="border border-gray-400 px-4 py-2">{transaction.title}</td>
          <td className="border border-gray-400 px-4 py-2">{transaction.description}</td>
          <td className="border border-gray-400 px-4 py-2">{transaction.price}</td>
          <td className="border border-gray-400 px-4 py-2">{transaction.category}</td>
          <td className="border border-gray-400 px-4 py-2">{transaction.sold ? 'Yes' : 'No'}</td>
          <td className="border border-gray-400 px-4 py-2"><img src={transaction.image} alt={transaction.title} width="50" /></td>
          <td className="border border-gray-400 px-4 py-2">{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  <div className='mt-4'>
    <button onClick={handlePreviousPage} disabled={page === 1}>
      Previous
    </button>
    <span className="mx-2">
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
