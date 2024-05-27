// src/components/CombinedData.js
import React, { useState, useEffect } from 'react';
import { getCombinedData } from '../api';

const CombinedData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCombinedData();
  }, []);

  const fetchCombinedData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCombinedData();
      setData(response.data);
    } catch (error) {
      setError('Error fetching combined data');
      console.error('Error fetching combined data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Combined Data</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};

export default CombinedData;
