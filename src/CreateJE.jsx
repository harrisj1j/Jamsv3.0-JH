import React, {useRef, useState}from 'react'
import { doc, setDoc, updateDoc, getCountFromServer, collection} from "@firebase/firestore";
import {db} from './firestore';
import {storage,} from "./firebase.js"



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

        const coll = collection(db, path);
        const snapshot = await getCountFromServer(coll);
        setrefid(snapshot.data().count)
        let refidString = refid.toString()
       

        const docRef=doc(db, path,  refidString);
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
                        <label htmlFor="debit">Debit</label>
                        <input ref={debit}/>
                        </div>
                        
                        <div className="credit-form">
                        <label htmlFor="credit">Credit</label>
                        <input ref={credit}/>
                    </div>
                </div>
             
                <div className='je-box-2'>
                    <label htmlFor="description">Description</label>
                    <input ref={description}/>
                    <div className='custom-button'>
                    <p>{percent} % done</p>
                    <input  type="file" accept=".pdf, .png, .jpg,.docx, .csv, .xls" onChange={handleChange}/>
                    </div>
                   
                    
                    
                    <button className="custom-button" type="submit" >Post Journal Entry</button>
                </div>
              
           </div>
        </div>
       
            
            
        </form>

            
        </>

    )
}