import React, {useRef, useState, useEffect}from 'react'
import { doc, setDoc, updateDoc, getCountFromServer, collection} from "@firebase/firestore";
import {db} from './firestore';
import {storage,} from "./firebase.js"
import { Container } from '@mui/material';
import { TextField } from '@mui/material';
import { AiOutlinePlusSquare} from "react-icons/ai";
import { AiOutlineMinusSquare} from "react-icons/ai";
import { BiUpload } from 'react-icons/bi';
import { IoIosCreate } from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';




import {
    ref,
    uploadBytesResumable,
    getDownloadURL, 
}from "firebase/storage"


export function CreateJE({path, id, calcBalance, calcCredit, calcDebit}) {

const number = useRef();
const [debits, setDebits] = useState([]);
const [credits, setCredits] = useState([]);
const [debitsTotal, setDT] = useState(0);
const [creditsTotal, setCT] = useState(0);
const credit = useRef(); 
const debit = useRef();
const description = useRef();
const [file, setFile]= useState("")
const [percent, setPercent] = useState(0);
const [attachedFile, setAttachedFile] = useState("")
const [refid, setrefid] = useState('')
const [newDateTime, setNewDateTime] = useState(Date)
const [refidString, setrefidString] = useState("")


useEffect(() => {

    const getCount =  async () => {
        
        const coll = collection(db, path);
        const snapshot = await getCountFromServer(coll);
        console.log(snapshot.data());
        
        console.log(snapshot.data().count);
        setrefid(snapshot.data().count.toString());
        console.log("the new ref id is ", refid)
        
        
       
    }
    getCount();
    
}, [refid]); 


//////////// debits form ///////////////
const [debitInputs, setDebitInput] = useState([
    { id: uuidv4(), debit: 0.00},
   
]);

const handleChangeDebit = (index, event) => {
    const values = [...debitInputs];
    values[index][event.target.debit] = event.target.value;
    setDebitInput(values);
}

const submitDebits = (e) => {
    e.preventDefault();
    alert("debits: ", debitInputs)
}

const handleAddDeb = (e) => {
    e.preventDefault();
    setDebitInput([...debitInputs, {debit: 0}])
}
const handleRemDeb = (e, id) => {
    e.preventDefault();
    const values = [...debitInputs];
    values.splice(values.findIndex(value => value.id === id), 1);    setDebitInput(values);

}
//////////// credits form ///////////////
const [creditInputs, setCreditInput] = useState([
    {id: uuidv4(), credit: 0.00},
   
]);

const handleChangeCredit = (index, event) => {
    const values = [...creditInputs];
    values[index][event.target.credit] = event.target.value;
    setCreditInput(values);
}

const submitCredits = (e) => {
    e.preventDefault();
    alert("credits: ", creditInputs)
}

const handleAddCred = (e) => {
    e.preventDefault();
    setCreditInput([...creditInputs, {credit: 0}])
}
const handleRemCred = (e, id) => {
    e.preventDefault();
    const values = [...creditInputs];
    values.splice(values.findIndex(value => value.id === id), 1);
    setCreditInput(values);

}

//takes the summed credits and debits from the account ledger and updates the account balance, credit, and debit
const editBalance = async (id, newBalance, newCredit, newDebit) => {
    const accountDoc = doc(db, "accounts", id)
    const newFields = {balance: parseFloat(newBalance), credit: parseFloat(newCredit), debit: parseFloat(newDebit)}
    await updateDoc( accountDoc, newFields)
    
}
//////////////////document upload functionality////////////////////

function handleChange(event){
    setFile(event.target.files[0]);
}
function handleUpload(){
    
    const storageRef = ref(storage, `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            //update progress
            setPercent(percent);
        },
        (err)=>console.log(err),
        ()=> {
            //download url
            getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                console.log(url);
                setAttachedFile("url");
            })
        }
    )
}


//when add button is clicked, new journal entry is created and the account balance is updated
    async function handeSubmit(e) {
        e.preventDefault();


        const docRef=doc(db, path, refid);
        await setDoc(docRef, {jeNumber: refid, debit: parseFloat(debit.current.value), credit: parseFloat(credit.current.value), description: description.current.value, files: attachedFile, dateTime: newDateTime});
        if(file)
            {handleUpload();}
        editBalance(id, parseFloat(calcBalance), parseFloat(calcCredit), parseFloat(calcDebit))
        e.target.reset();
    }

    return (
        <>
        <form  onSubmit={handeSubmit}>
        <div className='je-container'>
        <h3>Add New Journal Entry</h3>
            <div className="je-form-input">
                <div className="je-box-1">
                   
                    <div className="debit-form">

                        <Container>
                            
                            <form > 
                                <button className="custom-button" onClick={(e)=>submitDebits(e)}>add debits &nbsp;&nbsp;&nbsp;&nbsp;<IoIosCreate/></button>
                                { debitInputs.map((debitInput, index)=>(
                                    <div key={index}>
                                         <TextField 
                                            name="debit"
                                            label="debit"
                                            variant="filled"
                                            type="number"
                                            ref={debit}
                                            defaultValue={debitInput.debit}
                                            onChange={event=> handleChangeDebit(index, event)}
                                         />
                                         
                                         <button className='custom-button-je' onClick={(e)=> handleAddDeb(e)}><AiOutlinePlusSquare/></button>
                                         <button className='custom-button-je'disabled={debitInputs.length === 1} onClick={(e)=> handleRemDeb(e, debitInput.id)}><AiOutlineMinusSquare/></button>
                                    </div>
                                ))}
                              
                            </form>    
                        </Container>
                        
                    </div>
                    <div className="debit-form">

                        <Container>
                            
                            <form > 
                            <button onClick={(e)=>submitCredits(e)} className="custom-button" type="submit">add credits &nbsp;&nbsp;&nbsp;&nbsp;<IoIosCreate/></button>
                                { creditInputs.map((creditInput, index)=>(
                                    <div key={index}>
                                        <TextField 
                                            name="credit"
                                            label="credit"
                                            variant="filled"
                                            type="number"
                                            ref={credit}
                                            defaultValue={creditInput.credit}
                                            onChange={event=> handleChangeCredit(index, event)}
                                        />
                                        
                                        <button className='custom-button-je' onClick={(e)=> handleAddCred(e)}><AiOutlinePlusSquare/></button>
                                        <button className='custom-button-je'disabled={creditInputs.length === 1} onClick={(e)=> handleRemCred(e, creditInput.id)}><AiOutlineMinusSquare/></button>
                                    </div>
                                ))}
                            
                            </form>    
                        </Container>

                    </div>
                       
                </div>
             
                <div className='je-box-2'>
                    <label htmlFor="description">Description</label>
                    <input ref={description}/>
                    <label htmlFor="file">Attach Doc</label>
                    
                    <input  className="custom-button"type="file" accept=".pdf, .png, .jpg,.docx, .csv, .xls" onChange={handleChange}/>
                    <p>{percent} % done</p>
                   
                   
                </div>
              
           </div>
           <button className="custom-button" type="submit" >Post Journal Entry&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<BiUpload size={25}/></button>
        </div>
       
            
            
        </form>

            
        </>

    )
}