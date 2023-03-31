import React, {useState, useEffect} from 'react'
import { doc, updateDoc, getDoc } from "firebase/firestore";
import {db} from './firestore';
import { async } from "@firebase/util";
import { useSearchParams, Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import menuLogo from './img/JAMS_1563X1563.png'
import { BiUpload } from 'react-icons/bi';





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
    const [balance, setBalance] = useState(0)
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
            const balance = data.balance;
            setName(name);
            setNumber(number);
            setCategory(category);
            setCredit(credit);
            setDebit(debit);
            setIB(initialBalance);
            setBalance(balance);
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
    const [newBalance, setNewBalance] = useState(balance)
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
    const editBalance = async (id, balance, newBalance) => {
        const accountDoc = doc(db, "accounts", id)
        const newFields = {balance: newBalance}
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
            <h2>Edit Account</h2>
            
            <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                            <th>Number</th>
                            <th>Update</th>
                            <th>Name</th>
                            <th>Update</th>
                            <th>Category</th>
                            <th>Update</th>
                            <th>Credit</th>
                            <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr>
                            <td>{number} <br></br><input type="number" placeholder="edit number" onChange={(event) => {setNewNumber(event.target.value)}} /></td>
                            <td><button className="custom-button" onClick={()=> { 
                                            editNumber(accountID, number, newNumber)
                                        }}><BiUpload size={25}/></button></td>
                            <td>{name} <br></br><input type ="text" placeholder="edit name" onChange={(event) => {setNewName(event.target.value)}} /></td>
                            <td><button className="custom-button" onClick={()=> { 
                                            editName(accountID, name, newName)
                                        }}><BiUpload size={25}/></button></td>
                            <td>{category}<br/><select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                                      
                                    <option value="asset">asset</option>
                                    <option value="liability">liability</option>
                                    <option value="expense">expense</option>
                                    <option value="equity">equity</option>
                                </select>
                            </td>
                            <td><button className="custom-button" onClick={()=> { 
                                            editCategory(accountID, category, newCategory)
                                        }}><BiUpload size={25}/></button></td>
                            <td>{numberWithCommas(credit)} <br></br> <input type="number" placeholder="edit credit" onChange={(event) => {setNewCredit(event.target.value)}}/></td>
                            <td><button className="custom-button" onClick={()=> { 
                                            editCredit(accountID, credit, newCredit)
                                        }}><BiUpload size={25}/></button></td>
                            </tr>
                        
                        </tbody>
                    </Table>
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                            <th>Debit</th>
                            <th>Update</th>
                            <th>Initial Balance</th>
                            <th>Update</th>
                            <th>Description</th>
                            <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr>
                            <td>{numberWithCommas(debit)} <br></br><input type="number" placeholder="edit debit" onChange={(event) => {setNewDebit(event.target.value)}}/><Link>
                            </Link></td>
                            <td>
                            <button className="custom-button"  onClick={()=> { 
                                            editDebit(accountID, debit, newDebit)
                                        }}><BiUpload size={25}/></button>
                            </td>
                            <td>{numberWithCommas(initialBalance)} <br></br><input type="text" placeholder="edit initial balance" onChange={(event) => {setNewIB(event.target.value)}}/></td>
                            <td><button className="custom-button"  onClick={()=> { 
                                            editIB(accountID, initialBalance, newIB)
                                        }}><BiUpload size={25}/></button>
                            </td>
                            <td>{description}<br></br><input type="text" placeholder="edit description" onChange={(event) => {setNewDescription(event.target.value)}}/></td>
                            <td><button className="custom-button" onClick={()=> { 
                                            editDescription(accountID, description, newDescription)
                                        }}><BiUpload size={25}/></button></td>
                            </tr>
                        
                        </tbody>
                    </Table>
                    <button onClick={()=> { 
                                            editBalance(accountID, balance, calcBalance(1, 2, 3))
                                            alert("balance is "+calcBalance(1, 2, 3))
                                        }}>Calculate Balance</button>
                    
           
            
            
    
   
        </div>

    )
}

