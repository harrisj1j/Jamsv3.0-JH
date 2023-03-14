import { useState, useEffect } from "react";
import {db} from './firestore';
import { collection, getDocs, addDoc} from "firebase/firestore"
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';

export const accountsCollectionRef = collection(db,  "accounts");

export const AddAccount = () =>{

   const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState(0)
    const [newCategory, setNewCategory] = useState("")
    const [newCredit, setNewCredit] = useState(0)
    const [newDebit, setNewDebit] = useState(0)
    const [newIB, setNewIB] = useState(0)
    const [newDescription, setNewDescription] = useState("")
    const [newBalance, setNewBalance] = useState(0)
    const navigate = useNavigate();
    const numCheck = new RegExp(/^\+?(0*[1-9]\d*(?:[\., ]\d+)*) *(?:\p{Sc}|°[FC])?$/mg) //regular expression for checking if input is a positive integer


    //check that account number is a positive integer
    const accntnumChk = (e) => {
        
        if (numCheck.test(e)) 
            setNewNumber(e)
      };

    //calculate the new balance on the account
    const calcBalance = (newIB, newCredit, newDebit) =>
        {
            let calc = parseFloat(newIB)+parseFloat(newCredit)+parseFloat(newDebit);
            return (calc)
        }

    const [accounts, setAccounts] = useState([]);
   
    const createAccount = async () => {
        
        //check to make sure valid entries for name and number have been entered, if so create account
        if(newName !== '' && newNumber !== 0){
            await addDoc(accountsCollectionRef, {name: newName, number: newNumber, category: newCategory, credit: newCredit, debit: newDebit, initialBalance: newIB, balance: parseFloat(calcBalance(newIB, newCredit, newDebit)), description: newDescription})
            navigate("/adminhome/viewaccounts");}
        else{
            alert("enter valid name and/or number")}

    }


    
   

    return(
        <>
    
        <div className="aa-form-container">
        
            <h2>Add Account</h2>
            <form className="addaccount-form" > 
                <input placeholder="Name..." onChange={(event) => {setNewName(event.target.value)}} />
                <input type="number" placeholder="Number..."  onChange={(event) => {accntnumChk(event.target.value)}}  />
                <input placeholder="category..." onChange={(event) => {setNewCategory(event.target.value)}} />
     
                <input type="credit" placeholder="credit amount..." onChange={(event) => {setNewCredit(event.target.value)}}/>
                <input type="debit" placeholder="debit amount..." onChange={(event) => {setNewDebit(event.target.value)}}/>
                <input type="ib" placeholder="initial balance..." onChange={(event) => {setNewIB(event.target.value)}}/>
                <input type="description" placeholder="description" onChange={(event) => {setNewDescription(event.target.value)}}/>
            </form>
            <button onClick={()=> { 
                createAccount()
                }
                }>Add Account</button>
            
        </div>
        
        </>

    )
}
