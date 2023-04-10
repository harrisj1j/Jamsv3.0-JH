import React from "react";
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {db} from './firestore';
import { AiFillFileText } from 'react-icons/ai';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



export function ChildrenList({path}){

    const query = collection(db, path)
    const [docs, loading, error] = useCollectionData (query);
    
    

     //function for displaying cash amounts with commas where appropriate. Math.round...tofixed(2) makes it display two decimal points
     function numberWithCommas(x) {

        return ((Math.round(x * 100) / 100).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
       <>
       {docs?.map((doc)=>(
        <tr key={Math.random()}>
           
                <td >{doc.jeNumber}</td>
                <td >{numberWithCommas(doc.debit)}</td>
                <td >{numberWithCommas(doc.credit)}</td>
                <td >{doc.description}</td>
                <td>{toString(doc.date)}</td>
                <td>{doc.files != "" || doc.files != null &&

                        <AiFillFileText size={25}/>

                    }</td>
                
                
        </tr>
        ))}
       </>
        
    );
}
      
