import React from 'react'
import { useState } from 'react';

const Dropdown = ({month,setMonth}) => {
    
     // Default to March (key: 3)

    const months = {
        1: 'January', 
        2: 'February', 
        3: 'March', 
        4: 'April', 
        5: 'May', 
        6: 'June',
        7: 'July', 
        8: 'August', 
        9: 'September', 
        10: 'October', 
        11: 'November', 
        12: 'December',
      };

    const handleMonthChange = (e) => {
        setMonth(parseInt(e.target.value)); // Convert value to integer
      };

  return (
    <div>
    <label>
      Select Month:
      <select value={month} onChange={handleMonthChange}>
        {Object.entries(months).map(([key, monthName]) => (
          <option key={key} value={key}>
            {monthName}
          </option>
        ))}
      </select>
    </label>
  </div>
  )
}

export default Dropdown
