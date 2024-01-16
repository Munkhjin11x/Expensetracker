'use client'
import RecordTab from './Record';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function RecordADDcategory({ records, setRecords }) {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [recordModal, setRecordModal] = useState(false);
    const [amountRange, setAmountRange] = useState(0);
    const [isIncome, setIsIncome] = useState(true);
    const [amount, setAmount] = useState('');

    const loadCategories = async () => {
        const data = await axios.get('http://localhost:8003/categories');
        setCategories(data.data);
    };
    useEffect(() => {
        loadCategories();
    }, []);

    const modalHandle = () => {
        setShowModal(!showModal);
    }

    const recordModalHandler = () => {
        setRecordModal(!recordModal)
    }
    const handleAddRecord = async () => {
        try {
            const response = await axios.post("http://localhost:8003/transactions", {
                amount: isIncome ? amount : -amount,
                transaction_type: isIncome ? "INC" : "EXP",
            });

            const newRecord = {
                transaction_type: isIncome ? "INC" : "EXP",
                time: new Date().toLocaleTimeString(),
                amount: isIncome ? `+${amount}` : `-${amount}`,
            };

            setRecords((prevRecords) => [newRecord, ...prevRecords]);

            console.log("Transaction created:", response.data);
        } catch (error) {
            console.error("Error creating transaction:", error);
        }
    };

    const handleAddCategory = async () => {
        try {
            const createdCategory = await axios.post('http://localhost:8003/categories', { name: newCategory });
            setCategories([...categories, createdCategory.data]);
            setNewCategory('');
            setShowModal(false);

        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const switchTab = () => {
        setIsIncome(!isIncome);
    };

    return (
        <div className='flex px-[120px] mt-5  gap-6 '>
            <div className="flex flex-col bg-white rounded-lg">
                <div className='flex flex-col gap-6 p-[16px]'>
                    <h1>Records</h1>
                    <button className='w-[226px] px-[12px] bg-blue-600 text-white rounded-3xl h-8 record' onClick={recordModalHandler}>+Add</button>
                    {recordModal && (
                        <div className="fixed top-[30%] left-[40%]  ">
                            <div className="bg-white text-black w-[440px] flex-col flex rounded-3xl border-solid border-[1px] ">
                                <div className='flex justify-between'>
                                <p className="p-5">Add Record</p>
                                <p onClick={ () => recordModalHandler(false)} className='p-5'>x</p>
                                </div>
                                <hr></hr>
                                <div className="flex gap-3 p-4">
                                    <button onClick={switchTab}>
                                        Income
                                    </button>
                                    <button onClick={switchTab}>
                                        Expense
                                    </button>
                                </div>
                                <input
                                    className=" p-4 w-[316px] flex items-center ml-4 rounded-lg border-solid border-[1px] border-[#9CA3AF] bg-[#F3F4F6]"
                                    placeholder="₮000,00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                <div className='flex'>
                                <div className="flex flex-col gap-1 p-5">
                                        <h1>Date</h1>
                                        <input type="date" className="border rounded-md p-1"/>
                                    </div>
                                    <div className="flex flex-col gap-1 p-5">
                                        <h1>Date</h1>
                                        <input type="time" className="border rounded-md p-1"/>
                                    </div>

                                </div>
                                <select className='p-5'>
                                    <option>
                                        Choose category
                                    </option>
                                </select>
                                <button className='p-5' onClick={handleAddRecord}>
                                    ADD {isIncome ? "Income" : "Expense"} record
                                </button>

                            </div>
                        </div>
                    )}
                    <input className='w-[226px] p-[16px] h-[32px] rounded-3xl border-solid border-[1px] border-[#E5E7EB]' placeholder="search" type="search" />

                    <div className='flex gap-2 flex-col'>
                        <p>Types</p>
                        <div className="flex">
                            <input type="checkbox" className="checkbox" />
                            <p>All</p>
                        </div>
                        <div className="flex">
                            <input type="checkbox" className="checkbox" />
                            <p>Income</p>
                        </div>
                        <div className="flex">
                            <input type="checkbox" className="checkbox" />
                            <p>Expense</p>
                        </div>
                    </div>
                </div>
                <div className=' mt-6 p-[16px]'>
                    <h2>Category</h2>
                    <div className="flex">
                        <button onClick={modalHandle}>+ Add Category</button>
                    </div>
                    <ul>
                        {categories.length && categories.map((category) => (
                            <li key={category.id}>{category.name}</li>
                        ))}
                    </ul>

                    {showModal && (
                        <div className="fixed top-[40%] left-[35%] ">
                            <div className="bg-white text-black w-[440px] flex-col flex rounded-3xl ">
                                <div className='flex justify-between p-[20px]'>
                                    <p className='text-20px] font-semibold'>Add Category</p>
                                    <span className='text-[20px] cursor-pointer' onClick={() => setShowModal(false)}>
                                        x
                                    </span>
                                </div>
                                <div className='flex  flex-col gap-[32px] py-[24px] '>
                                    <div className=' gap-5 px-[20px] flex'>
                                        <div className='flex items-center border-solid border-[1px] p-[8px] rounded-lg bg-[#F9FAFB]'>
                                            <p>d</p>
                                            <select className='bg-white '>
                                                <option>

                                                </option>
                                            </select>
                                        </div>
                                        <input
                                            className='w-[318px] h-[42px] p-4 rounded-lg bg-[#F9FAFB] border-solid border-[1px] border-[#D1D5DB]'
                                            placeholder='name'
                                            type="text"
                                            id="newCategory"
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex justify-center '>
                                        <button className=' w-[400px] bg-green-600 text-white rounded-[20px] h-[40px]' onClick={handleAddCategory}>Add Category</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                    <div className='mt-6'>
                        <h1>Amount range</h1>
                        <div>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={1000}
                            value={amountRange}
                            className="range w-[234px]"
                            onChange={(e) => setAmountRange(parseInt(e.target.value, 10))}
                        />
                        <p>Selected Amount: {amountRange}</p>
                    </div>
                </div>
            </div>
            <RecordTab records={records} />
        </div>
    );
}
