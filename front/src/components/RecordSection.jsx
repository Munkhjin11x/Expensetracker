'use client'
import RecordTab from './Record';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function RecordADDcategory() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [amountRange, setAmountRange] = useState(0);

    const loadCategories = async () => {
        const data = await axios.get('http://localhost:8003/categories');
        setCategories(data.data);
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const Modalhandle = () => {
        setShowModal(!showModal);
    }

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

    return (
        <div className="flex flex-col">
            <div className='flex flex-col gap-6'>
                <h1>Records</h1>
                <button className='w-[226px] px-[12px] bg-blue-600 text-white rounded-3xl h-8 record'>+Add</button>
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
            <div className=' mt-6'>
                <h2>Category</h2>
                <div className="flex">
                    <button onClick={Modalhandle}>+ Add Category</button>
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
                <RecordTab />
            </div>
        </div>
    );
}
