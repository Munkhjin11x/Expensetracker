import {
    getTransactions,
     getOneTransaction,
      createTransaction,
       deleteTransaction, 
       updateTransaction 
} from "../Controller/transaction.js"
import express  from "express"
import { user } from "./user.js";
const transaction = express.Router()
transaction.route("/").get(getTransactions).post(createTransaction);
user.route("/tran").get(getOneTransaction).delete(deleteTransaction).put(updateTransaction)
export {transaction}