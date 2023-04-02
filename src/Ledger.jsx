import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {db} from './firestore';
import {doc, getDoc, getDocs} from "firebase/firestore"
import Table from 'react-bootstrap/Table';
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {ChildrenList} from "./ChildrenList"
const jeRef = collection(db, "journalEntries");






export const Ledger = () => {
   
    //get data from view accounts screen
    const [searchparams] = useSearchParams();

    
    let accountID = searchparams.get("id")

    const query = collection(db, "accounts")
    const [docs, loading, error] = useCollectionData (query);
    console.log(docs);

    const [name, setName] = useState("")
    const [number, setNumber] = useState(0)
    const [category, setCategory] = useState("")
    const [credit, setCredit] = useState(0)
    const [debit, setDebit] = useState(0)
    const [balance, setBalance] = useState("")
    const [description, setDescription] = useState("")
    const [jeNumber, setJENumber] = useState(0);
    const [jeCredit, setJECredit] = useState(0);
    const [jeDebit, setJEDebit] = useState(0);
    const [jeDescription, setJEDescription] = useState("")
    const [jeDate, setJEDate] = useState(Date);


    
    

    useEffect(() => {

        let id = accountID
        const getAccount =  async (id) => {
            const accountDoc = doc(db, "accounts", id);
          
            const docSnap = await getDoc(accountDoc);
            const data = docSnap.data();
            const name = data.name;
            const number = data.number;
            const category = data.category;
            const credit = data.credit;
            const debit = data.debit;
            const balance = data.balance;
            const description = data.description;
            setName(name);
            setNumber(number);
            setCategory(category);
            setCredit(credit);
            setDebit(debit);
            setBalance(balance)
            setDescription(description);
            
           
        }

        getAccount(id);
    }, []);

 

   
 
 
    return (
        <>
        <div className ="ledger-container">
        <h2>Account Ledger</h2>
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Balance</th>
                <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{number}</td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{balance}</td>
                    <td>{description}</td>
                </tr>
            </tbody>
        </Table>
        <h3>Journal Entries</h3>

        {loading && "Loading..."}
        <Table  responsive striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Description</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                
            <ChildrenList path={`accounts/${accountID}/journalEntries`}/>
                      
                  
               
            </tbody>
        </Table>
        </div>
        </>
    )
    
  
}