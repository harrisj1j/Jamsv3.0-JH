import React, {useState, useEffect} from 'react'
import { doc, updateDoc, getDoc } from "firebase/firestore";
import {db} from './firestore';

import { async } from "@firebase/util";
import { useSearchParams, Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';

import * as CreateJe from "./CreateJE"
import * as AddAccount from "./AddAccount"
import * as EditAccount from "./EditAccount"
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';

export const EventLog = () => {
    
    

    const [name, setName] = useState("")
    const [newName, setNewName] = useState("")

    const [number, setNumber] = useState(0)
    const [newNumber, setnewNumber] = useState(0)

    const [category, setCategory] = useState("")
    const [newCategory, setnewCategory] = useState("")

    const [credit, setCredit] = useState(0)
    const [newCredit, setnewCredit] = useState(0)

    const [debit, setDebit] = useState(0)
    const [newDebit, setnewDebit] = useState(0)

    const [balance, setBalance] = useState(0)
    const [newbalance, newsetBalance] = useState(0)

    const [netbalance, setNetBalance] = useState(0)
    const [newNetbalance, setnewNetBalance] = useState(0)

    const [description, setDescription] = useState("")
    const [newDescription, setNewDescription] = useState("")

    const [jeNum, setjeNum] = useState(0);
    const [newJeNum, setnewJeNum] = useState(0);
    
    const [initialBalance, setInitialBalance] = useState(0)
    const [newInitialBalance, setnewInitialBalance] = useState(0)
    
    


const accountsRef =  getDoc(collection(db,  "accounts"));
const journalsRef =  getDoc(db, "accounts", accountID, "journalEntries");
const eventRef = getDoc((collection(db, "events")));

accountsRef.forEach((doc) => {
    console.log(doc.id, "=> ", doc.data())

});
};






/*
const generateEventLog = (userId, eventType, beforeImage, afterImage) => {
    const newEvent = {
        eventID : newEvent.key,
        userId,
        timestamp : firebase.database.ServerValue.timestamp,
        eventType,
        beforeImage,
        afterImage,
    };
    
}
*/