import { useSearchParams } from "react-router-dom";


import {db} from './firestore';
import {doc, getDoc} from "firebase/firestore"


export const Ledger = () => {
   
    const [searchparams] = useSearchParams();
    console.log(searchparams.get("id"))
    let accountID = searchparams.get("id")

          

    return (
        <>
        <div>Name: {accountID}</div>
        
        </>
    )
    
  
}