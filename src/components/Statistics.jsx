// src/components/Statistics.js
import React, { useState, useEffect } from 'react';
import { getStatistics } from '../api';

const Statistics = ({month}) => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getStatistics({ month });
      setStatistics(response.data);
    } catch (error) {
      setError('Error fetching statistics');
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="flex justify-center bg-orange-200 w-full p-8">
  <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
    <h1 className="text-2xl font-bold mb-4">Statistics</h1>
    {loading && <p className="text-center">Loading...</p>}
    {error && <p className="text-center text-red-500">{error}</p>}
    {statistics && (
      <div>
        <p className="mb-4">Total Sale Amount: ${statistics.totalSaleAmount}</p>
        <p className="mb-4">Total Sold Items: {statistics.totalSoldItems}</p>
        <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
      </div>
    )}
  </div>
</div>

  );
};

export default Statistics;
