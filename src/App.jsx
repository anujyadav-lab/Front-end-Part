// src/App.js
import React, {useState} from 'react';
import Transactions from './components/Transactions';
import Statistics from './components/Statistics';
import CombinedData from './components/CombinedData';
import Charts from './components/Charts';
import Dropdown from './components/Dropdown';

const App = () => {
  const [month, setMonth] = useState(3);

  return (
    <div>

      <Dropdown  month = {month} setMonth = {setMonth}/>
      <Transactions month = {month}  />
      <Statistics month = {month}/>
      <Charts month = {month}/>
      <CombinedData month = {month} />
      {/* <PieChart month={month}/> */}

    </div>
  );
};

export default App;
