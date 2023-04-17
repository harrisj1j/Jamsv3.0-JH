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
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';





import {
    ref,
    uploadBytesResumable,
    getDownloadURL, 
}from "firebase/storage"


export function CreateJE({path, id, calcBalance, calcCredit, calcDebit}) {

const ref2 = useRef();

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
const [approved, setApproved] = useState(false);
const [postReference, setPostReference] = useState("")
const [dateFilter, setdateFilter] = useState('');
const [amountFilter, setAmountFilter] = useState(0)


useEffect(() => {

    const getCount =  async () => {
        
        const coll = collection(db, path);
        const snapshot = await getCountFromServer(coll);
        console.log(snapshot.data());
        
        console.log(snapshot.data().count);
        setrefid(snapshot.data().count.toString());
        console.log("the new ref id is ", refid)
        setPostReference(uuidv4().toString());
        console.log("The PR is ", postReference)
        
        
       
    }
    getCount();
    
}, [refid]); 

  const close = () => ref2.current.close();

//////////// debits form ///////////////
const [debitInputs, setDebitInput] = useState([
    { id: uuidv4(), debit: 0.00},
   
]);

const handleChangeDebit = (id, event) => {
   const newDebitInputs = debitInputs.map(i => {
    if(id === i.id) {
        i[event.target.name] = event.target.value
        
    }
    
    return i;
   })
   
   setDebitInput(newDebitInputs)
   console.log("the debit inputs are now: ",debitInputs)
}

const submitDebits = (e) => {
    e.preventDefault();
    console.log("submitted debits: ", debitInputs)
    alert("Added debits: ", debitInputs[0])
}

const handleAddDeb = (e) => {
    e.preventDefault()
    setDebitInput([...debitInputs, {id: uuidv4(), debit: 0}])
}
const handleRemDeb = (e, id) => {
    e.preventDefault();
    const values = [...debitInputs];
    values.splice(values.findIndex(value => value.id === id), 1);    setDebitInput(values);

}
//////////// credits form ///////////////
const [creditInputs, setCreditInput] = useState([
    { id: uuidv4(), credit: 0.00},
   
]);

const handleChangeCredit = (id, event) => {
   const newcreditInputs = creditInputs.map(i => {
    if(id === i.id) {
        i[event.target.name] = event.target.value
        
    }
    
    return i;
   })
   console.log("the credit inputs are:", newcreditInputs)
   setCreditInput(newcreditInputs)
   
}

const submitCredits = (e) => {
    e.preventDefault();
    console.log("submitted credits: ", creditInputs)
    alert("Added credits: ", creditInputs[0])
}

const handleAddCred = (e) => {
    e.preventDefault()
    setCreditInput([...creditInputs, {id: uuidv4(), credit: 0}])
}
const handleRemCred= (e, id) => {
    e.preventDefault();
    const values = [...creditInputs];
    values.splice(values.findIndex(value => value.id === id), 1);    setCreditInput(values);


    
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
                setAttachedFile(url);
                console.log("attached file url is ", attachedFile)
            })
        }
    )
}


//when add button is clicked, new journal entry is created and the account balance is updated
    async function handleSubmit(e) {
        e.preventDefault();

        
        const docRef=doc(db, path, refid);
        await setDoc(docRef, {jeNumber: refid,  debits: debitInputs, credits: creditInputs, description: description.current.value, files: attachedFile, dateTime: newDateTime, approved: approved, pr: postReference});
        if(file)
            {handleUpload();}
        alert("Journal Entry Posted")
        e.target.reset();
    }

    return (
        <>
        <form id="je-form" onSubmit={handleSubmit}>
        <div className='je-container'>
        <h3>Add New Journal Entry</h3>
            <div className="je-form-input">
                <div className="je-box-1">
                   
                    <div className="debit-form">

                        <Container>
                            
                           
                                <button className="custom-button" onClick={(e)=>submitDebits(e)}>add debits &nbsp;&nbsp;&nbsp;&nbsp;<IoIosCreate/></button>
                                { debitInputs.map((debitInput)=>(
                                    <div key={debitInput.id}>
                                         <TextField 
                                            name="debit"
                                            label="debit"
                                            variant="filled"

                                            onChange={event => handleChangeDebit(debitInput.id, event)}
                                         />
                                         
                                         <button className='custom-button-je' onClick={(e)=> handleAddDeb(e)}><AiOutlinePlusSquare/></button>
                                         <button className='custom-button-je'disabled={debitInputs.length === 1} onClick={(e)=> handleRemDeb(e, debitInput.id)}><AiOutlineMinusSquare/></button>
                                    </div>
                                ))}
                              
                           
                        </Container>
                        
                    </div>
                    <div className="debit-form">

                        <Container>
                            
                            
                            <button onClick={(e)=>submitCredits(e)} className="custom-button" type="submit">add credits &nbsp;&nbsp;&nbsp;&nbsp;<IoIosCreate/></button>
                                { creditInputs.map((creditInput)=>(
                                    <div key={creditInput.id}>
                                        <TextField 
                                            name="credit"
                                            label="credit"
                                            variant="filled"

                                            onChange={event=> handleChangeCredit(creditInput.id, event)}
                                        />
                                        
                                        <button className='custom-button-je' onClick={(e)=> handleAddCred(e)}><AiOutlinePlusSquare/></button>
                                        <button className='custom-button-je'disabled={creditInputs.length === 1} onClick={(e)=> handleRemCred(e, creditInput.id)}><AiOutlineMinusSquare/></button>
                                    </div>
                                ))}
                            
                             
                        </Container>

                    </div>
                       
                </div>
             
                <div className='je-box-2'>
                    <label htmlFor="description">Description</label>
                    <input ref={description}/>

                    <label htmlFor="file">Attach Doc</label>
                    <input  className="custom-button" type="file" accept=".pdf, .png, .jpg,.docx, .csv, .xls" onChange={handleChange}/>
                    <p>{percent} % done</p>
                   
                   
                </div>
              
           </div>
           <Popup ref={ref2} trigger={open => (   <button type="button" className="custom-button" >Post Journal Entry&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<BiUpload size={25}/></button>  )} position='center center'  arrow={false} modal closeOnDocumentClick>
            <h4>Post Journal Entry?</h4>
                <button form="je-form" className="custom-button" type="submit" >Submit</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={()=>close()} className="custom-button">Cancel</button>
            </Popup>;

            
           
        </div>
       
            
            
        </form>

            
        </>

    )
}