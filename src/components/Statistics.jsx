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
    <div>
      <h1>Statistics</h1>
     
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {statistics && (
        <div>
          <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
          <p>Total Sold Items: {statistics.totalSoldItems}</p>
          <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
        </div>
      )}
    </div>
  );
};

export default Statistics;
