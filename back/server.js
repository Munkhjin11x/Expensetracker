import express from "express";
import dotenv from 'dotenv'
import pool from "pg";
dotenv.config()
const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL
const app = express()
app.get("/", (req,res)=>{
    res.send("hello")
})
app.listen(PORT,()=>{
    console.log("ready");
})
