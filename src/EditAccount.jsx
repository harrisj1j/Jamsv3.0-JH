import React, {useState, useEffect} from 'react'
import { doc, updateDoc, getDoc } from "firebase/firestore";
import {db} from './firestore';
import { async } from "@firebase/util";
import { useSearchParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import menuLogo from './img/JAMS_1563X1563.png'



export function EditAccount(account, seteditbox){


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
        const getAccount =  async (id) => {
            const accountDoc = doc(db, "accounts", id);
            
            const docSnap = await getDoc(accountDoc);
            const data = docSnap.data();
            const name = data.name;
            const number = data.number;
            const category = data.category;
            const credit = data.credit;
            const debit = data.debit;
            const initialBalance = data.initialBalance;
            const description = data.description;
            setName(name);
            setNumber(number);
            setCategory(category);
            setCredit(credit);
            setDebit(debit);
            setIB(initialBalance);
            setDescription(description);
        }

        getAccount(id);
    }, []);



    const [newName, setNewName] = useState(name)
    const [newNumber, setNewNumber] = useState(number)
    const [newCategory, setNewCategory] = useState(category)
    const [newCredit, setNewCredit] = useState(credit)
    const [newDebit, setNewDebit] = useState(debit)
    const [newIB, setNewIB] = useState(initialBalance)
    const [newDescription, setNewDescription] = useState(description)

    const editName = async (id, name, newName) => {
        const accountDoc = doc(db, "accounts", id)
        const newFields = {name: newName}
        await updateDoc( accountDoc, newFields)
        
    }
    const editNumber = async (id, number, newNumber) => {
        const accountDoc = doc(db, "accounts", id)
        const newFields = {number: newNumber}
        await updateDoc( accountDoc, newFields)
        
    }
    const editCategory = async (id,category, newCategory) => {
        const accountDoc = doc(db, "accounts", id)
        const newFields = {category: newCategory}
        await updateDoc( accountDoc, newFields)
        
    }
    const editDebit = async (id, debit, newDebit) => {
        const accountDoc = doc(db, "accounts", id)
        const newFields = {debit: newDebit}
        await updateDoc( accountDoc, newFields)
        
    }
    const editCredit = async (id, credit, newCredit) => {
        const accountDoc = doc(db, "accounts", id)
        const newFields = {credit: newCredit}
        await updateDoc( accountDoc, newFields)
        
    }
    const editIB = async (id, initialBalance, newIB) => {
        const accountDoc = doc(db, "accounts", id)
        const newFields = {initialBalance: newIB}
        await updateDoc( accountDoc, newFields)
        
    }
    const editDescription = async (id, description, newDescription) => {
        const accountDoc = doc(db, "accounts", id)
        const newFields = {description: newDescription}
        await updateDoc( accountDoc, newFields)
        
    }
    function numberWithCommas(x) {

        let num = x;
        return ((Math.round(x * 100) / 100).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  //calculate the new balance on the account
    const calcBalance = (newIB, newCredit, newDebit) =>
        {
            let calc = parseFloat(newIB)+parseFloat(newCredit)+parseFloat(newDebit);
            return (calc)
        }

    return (

        <div className="edit-form-container">
            <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Credit</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr>
                            <td>{number} <br></br><input type="number" placeholder="edit number" onChange={(event) => {setNewNumber(event.target.value)}} />
                                <button onClick={()=> { 
                                            editNumber(accountID, number, newNumber)
                                        }}>update</button></td>
                            <td>{name} <br></br><input type ="text" placeholder="edit name" onChange={(event) => {setNewName(event.target.value)}} /><button onClick={()=> { 
                                            editName(accountID, name, newName)
                                        }}>update</button></td>
                            <td>{category} <br></br><input placeholder="edit category" onChange={(event) => {setNewCategory(event.target.value)}} /><button onClick={()=> { 
                                            editCategory(accountID, category, newCategory)
                                        }}>update</button></td>
                            <td>{numberWithCommas(credit)} <br></br> <input type="number" placeholder="edit credit" onChange={(event) => {setNewCredit(event.target.value)}}/><button onClick={()=> { 
                                            editCredit(accountID, credit, newCredit)
                                        }}>update</button></td>
                            </tr>
                        
                        </tbody>
                    </Table>
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                            <th>Debit</th>
                            <th>Initial Balance</th>
                            <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr>
                            <td>{numberWithCommas(debit)} <br></br><input type="number" placeholder="edit debit" onChange={(event) => {setNewDebit(event.target.value)}}/><button onClick={()=> { 
                                            editDebit(accountID, debit, newDebit)
                                        }}>update</button></td>
                            <td>{numberWithCommas(initialBalance)} <br></br><input type="text" placeholder="edit initial balance" onChange={(event) => {setNewIB(event.target.value)}}/><button onClick={()=> { 
                                            editIB(accountID, initialBalance, newIB)
                                        }}>update</button></td>
                            <td>{description}<br></br><input type="text" placeholder="edit description" onChange={(event) => {setNewDescription(event.target.value)}}/><button onClick={()=> { 
                                            editDescription(accountID, description, newDescription)
                                        }}>update</button></td>
                            </tr>
                        
                        </tbody>
                    </Table>
                    
           
            
            
    
   
        </div>

    )
}

