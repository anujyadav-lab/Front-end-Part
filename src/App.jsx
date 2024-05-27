// src/App.js
import React from 'react';
import Transactions from './components/Transactions';
import Statistics from './components/Statistics';
import CombinedData from './components/CombinedData';
import Charts from './components/Charts';

const App = () => {
  return (
    <div>
      <Transactions />
      <Statistics />
      <Charts />
      <CombinedData />
    </div>
  );
};

export default App;
