'use client'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function RecordADDcategory(params) {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const data = await axios.get('http://localhost:8003/categories');
        setCategories(data.data);
    };

    const handleAddCategory = async () => {
        try {
            const createdCategory = await axios.post('http://localhost:8003/categories', { name: newCategory });
            setCategories([...categories, createdCategory.data]);
            console.log(createdCategory)
            setNewCategory('');
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <div className="flex flex-col">
            <h1>Records</h1>
            <input placeholder="search" type="search" />
            <button>Add+</button>

            <div>
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

            <div>
                <h2>Category</h2>
                <div className="flex">
                    <input
                        type="text"
                        placeholder="New Category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <button onClick={handleAddCategory}>+ Add Category</button>
                </div>
                <ul>
                    {categories.length && categories.map((category) => (
                        <li key={category.id}>{category.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
