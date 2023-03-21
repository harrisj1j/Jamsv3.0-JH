import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {db} from './firestore';
import {doc, getDoc} from "firebase/firestore"
import Table from 'react-bootstrap/Table';
import menuLogo from './img/JAMS_1563X1563.png'



export const Ledger = () => {
   
    const [searchparams] = useSearchParams();
    console.log(searchparams.get("id"))

    let accountID = searchparams.get("id")
    const [name, setName] = useState("")
    const [number, setNumber] = useState(0)
    const [category, setCategory] = useState("")
    const [credit, setCredit] = useState(0)
    const [debit, setDebit] = useState(0)
    const [initialBalance, setIB] = useState("")
    const [description, setDescription] = useState("")
    
    

    useEffect(() => {

        let id = accountID
        const getAccountName =  async (id) => {
            const accountDoc = doc(db, "accounts", id);
            
            const docSnap = await getDoc(accountDoc);
            const data = docSnap.data();
            const name = data.name;
            setName(name);
        
        }

        getAccountName(id);
    }, []);
 
 
    return (
        <>
        <div className ="ledger-container">
        <h2>Account Ledger</h2>
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                <th>Name</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{name}</td>
                </tr>
            </tbody>
        </Table>
        </div>
        </>
    )
    
  
}