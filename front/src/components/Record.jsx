// 'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import house from "../../public/img/House.png";

export default function RecordTab() {
  const [isIncome, setIsIncome] = useState(true);
  const [amount, setAmount] = useState('');
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8003/transactions");
      const fetchedRecords = response.data.map((transaction) => {
        const transactionType =
          transaction.transaction_type === "INC" ? "INC" : "EXP";

        return {
          transaction_type: transactionType,
          time: new Date().toLocaleTimeString(),
          amount:
            transactionType === "INC"
              ? `+${transaction.amount}`
              : `${transaction.amount}`,
        };
      });

      setRecords(fetchedRecords);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddRecord = async () => {
    try {
      const response = await axios.post("http://localhost:8003/transactions", {
        amount: isIncome ? amount : -amount,
        transaction_type: isIncome ? "INC" : "EXP",
      });

      const newRecord = {
        transaction_type: isIncome ? "Income" : "Expense",
        time: new Date().toLocaleTimeString(),
        amount: isIncome ? `+${amount}` : `-${amount}`,
      };

      setRecords((prevRecords) => [newRecord, ...prevRecords]);

      console.log("Transaction created:", response.data);
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };
  const SwitchTab = () => {
    setIsIncome(!isIncome);
    setRecords([]);
  };
  const ModalHandle = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="w-[1152px] flex justify-between items-center">
      <button onClick={ModalHandle}>modal</button>
      {showModal && (
        <div className="fixed top-[40%] left-[35%]  ">
          <div className="bg-white text-black w-[440px] flex-col flex rounded-3xl ">
            <p className="p-5">Add Record</p>
            <hr></hr>
            <div className="flex gap-3 p-4">
            <button onClick={SwitchTab}>
             Income
            </button>
            <button onClick={SwitchTab}>
              Expense
            </button>
            </div>
            <input
            className=" p-4 w-[316px] flex items-center ml-4 rounded-lg border-solid border-[1px] border-[#9CA3AF] bg-[#F3F4F6]"
            placeholder="₮000,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div>
              <select className="date">

              </select>
              <select className="time">

              </select>
            </div>
            <select>
              <option>
                Choose category
              </option>
            </select>
            <button onClick={handleAddRecord}>
              ADD {isIncome ? "Income" : "Expense"} record
            </button>
            
          </div>
        </div>
      )}

      <div className="flex flex-col  w-[1152px]">
        {records &&
          records.map((record, index) => (
            <div key={index} className="flex gap-6 mb-3  ">
              <div
                key={index}
                className={`bg-${
                  record.transaction_type === "INC" ? "green" : "red"
                }-600 w-[40px] h-[40px] flex justify-center items-center rounded-[20px]`}
              >
                <img
                  className="w-[20px] h-[20px]"
                  src={house.src}
                  alt="House Icon"
                />
              </div>
              <div className="flex justify-between w-[846px]">
                <div>
                  <p>{record.transaction_type}</p>
                  <p>{record.time}</p>
                </div>
                <div>
                  <p>{record.amount}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
