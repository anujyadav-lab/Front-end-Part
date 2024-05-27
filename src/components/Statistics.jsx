// src/components/Statistics.js
import React, { useState, useEffect } from 'react';
import { getStatistics } from '../api';

const Statistics = () => {
  const [statistics, setStatistics] = useState(null);
  console.log(statistics)
  const [month, setMonth] = useState('March');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getStatistics({ month });
      console.log('here is response:',response)
      setStatistics(response.data);
    } catch (error) {
      setError('Error fetching statistics');
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div>
      <h1>Statistics</h1>
      <div>
        <label>
          Select Month:
          <select value={month} onChange={handleMonthChange}>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </label>
      </div>
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
