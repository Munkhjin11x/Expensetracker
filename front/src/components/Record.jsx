'use client'
import axios from 'axios'; 
import house from "../../public/img/House.png";
import { useState } from 'react';

export default function RecordTab() {
    const [isIncome, setIsIncome] = useState(true);
    const [amount, setAmount] = useState(0);
    const [records, setRecords] = useState([]);
  
    const handleAddRecord = async () => {
      try {
        const response = await axios.post('http://localhost:8003/transactions', {
          amount: setIsIncome ? amount : -amount,
          transaction_type: setIsIncome ? 'INC' : 'EXP',
        });
  
        const newRecord = {
          transaction_type: isIncome ? "Income" : "Expense",
          time: new Date().toLocaleTimeString(),
          amount: isIncome ? `+${amount}` : `-${amount}`,
        };
  
        setRecords(prevRecords => [newRecord, ...prevRecords]);
  
        console.log("Transaction created:", response.data);
      } catch (error) {
        console.error("Error creating transaction:", error);
      }
    };
  
    return (
      <div className="w-[1152px] flex justify-between items-center">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleAddRecord}>
          ADD {isIncome ? "Income" : "Expense"} record
        </button>
  
        {records && records.map((record, index) => (
          <div key={index} className="flex gap-3">
            <div className={`bg-${isIncome ? "green" : "red"}-600 w-[40px] h-[40px] flex justify-center items-center rounded-[20px]`}>
              <img className="w-[20px] h-[20px]" src={house.src} alt="House Icon" />
            </div>
            <div>
              <p>{record.transaction_type}</p>
              <p>{record.time}</p>
            </div>
            <div>
              <p>{record.amount}</p>
            </div>
          </div>
        ))}
  
      </div>
    );
  }
  