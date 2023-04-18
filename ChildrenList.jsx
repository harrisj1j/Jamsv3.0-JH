import React from "react";
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {db} from './firestore';
import { AiFillFileText } from 'react-icons/ai';
import 'reactjs-popup/dist/index.css';
import {Link, createSearchParams, useNavigate} from "react-router-dom"
import {doc, getDoc, getDocs, updateDoc, deleteDoc,  addDoc} from "firebase/firestore"

export function ChildrenList({ path }) {
    const query = collection(db, path);
    const [docs, loading, error] = useCollectionData(query);
  
    const navigate = useNavigate();
  
    const openInNewTab = (url) => {
      console.log(url);
      window.open(url);
    };
  
    const printDebits = (array) => {
      const listItems = array.map((d) => (
        <li key={d.debit}>${numberWithCommas(d.debit)}</li>
      ));
  
      return listItems;
    };
  
    const printCredits = (array) => {
      const listItems = array.map((d) => (
        <li key={d.credit}>${numberWithCommas(d.credit)}</li>
      ));
  
      return listItems;
    };
  
    const approveJournal = (docId) => {
      // Update the document in the Firestore collection to mark it as approved
      const jeDocRef = doc(db, path, docId);
      updateDoc(jeDocRef, {
        approved: true,
      });
    };
  
    const rejectJournalAndStore = async (docId, docData) => {
      // Create a new document in the rejected_journals collection
      const rejectedJournalsRef = collection(db, "rejected_journals");
      await addDoc(rejectedJournalsRef, docData);

      // Delete the rejected journal entry from the current collection
      const jeDocRef = doc(db, path, docId);
      await deleteDoc(jeDocRef);
    };
  
    const rejectJournal = (docId, docData) => {
      // Update the document in the Firestore collection to mark it as rejected
      const jeDocRef = doc(db, path, docId);
      updateDoc(jeDocRef, {
        approved: false,
      });
    };
  
    function numberWithCommas(x) {
      return ((Math.round(x * 100) / 100).toFixed(2))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  
    const openJournal = (path, id) => {
        navigate({
            pathname: "journalentry",
            search: createSearchParams({
                path: path,
                id: id
            }).toString()
        });
    };
    
    return (
        

        
      <>
        {docs?.map((doc, idx) => (
          <tr key={Math.random()}>
            <td>{idx + 1}</td>
            <td>{doc.user}</td>
            <td>{printDebits(doc.debits)}</td>
            <td>{printCredits(doc.credits)}</td>
            <td>{doc.description}</td>
            <td>{doc.dateTime}</td>
            <td>
              {doc.files.length > 0 && (
                <button
                  role="link"
                  className="custom-button-je"
                  onClick={() => openInNewTab(doc.files)}
                >
                  <AiFillFileText size={25} />
                </button>
              )}
            </td>
            <td>
              <button
                className="custom-button-je"
                onClick={() => openJournal(path, doc.jeNumber)}
              >
                {doc.pr}
              </button>
            </td>
            <td>
              {!doc.approved && (
                <>
                  <button
                    className="custom-button-je"
                    onClick={() => approveJournal(doc.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="custom-button-je"
                    onClick={() => rejectJournal(doc.id)}
                  >
                    Reject
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </>
    );
  }
  