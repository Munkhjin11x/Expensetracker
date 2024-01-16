'use client'
import Navbar from "@/components/Navbar";
import RecordADDcategory from "@/components/RecordSection";
import axios from "axios"
import { useState, useEffect, Suspense } from "react";
export default function RecordPage() {
    const [records, setRecords] = useState();
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
                        created_at: transaction.created_at, 
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
    return (
        <main className=" bg-[#E5E7EB] h-full">
            <Navbar />
            <RecordADDcategory records={records} setRecords={setRecords} />
        </main>
    )
}