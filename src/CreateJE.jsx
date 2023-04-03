import React, {useRef}from 'react'
import { doc, setDoc, updateDoc} from "@firebase/firestore";
import {db} from './firestore';

export function CreateJE({path, id, calcBalance, calcCredit, calcDebit}) {

const number = useRef();
const debit = useRef();
const credit = useRef();
const description = useRef();
const newDateTime = Date


const editBalance = async (id, newBalance, newCredit, newDebit) => {
    const accountDoc = doc(db, "accounts", id)
    const newFields = {balance: newBalance, credit: newCredit, debit: newDebit}
    await updateDoc( accountDoc, newFields)
    
}

    async function handeSubmit(e) {
        e.preventDefault();

        const docRef=doc(db, path, number.current.value);
        await setDoc(docRef, {jeNumber: number.current.value, debit: debit.current.value, credit: credit.current.value, description: description.current.value, date: newDateTime});
        
        editBalance(id, calcBalance, calcCredit, calcDebit)
        e.target.reset();
    }

    return (
        <>
        <form onSubmit={handeSubmit}>
            <div className="je-form-input">
                <h3>Add New Journal Entry</h3>
                <label htmlFor="number">Number</label>
                <input ref={number}/>

                <label htmlFor="debit">Debit</label>
                <input ref={debit}/>
           
                <label htmlFor="credit">Credit</label>
                <input ref={credit}/>
          
                <label htmlFor="debit">Description</label>
                <input ref={description}/>
                <button className="custom-button" type="submit">Add</button>
           </div>
            
            
        </form>

            
        </>

    )
}