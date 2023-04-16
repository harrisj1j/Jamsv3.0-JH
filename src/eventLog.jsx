import React, {useState, useEffect} from 'react'
import { doc, updateDoc, getDoc } from "firebase/firestore";
import {db} from './firestore';
import { async } from "@firebase/util";
import { useSearchParams, Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import menuLogo from './img/JAMS_1563X1563.png'
import { BiUpload } from 'react-icons/bi';


const eventRef = database.ref('events')

const generateEventLog = (userId, eventType, beforeImage, afterImage) => {
    const newEventRef = eventRef.push();
    const newEvent = {
        eventID : newEvent.key,
        userId,
        timestamp : firebase.database.ServerValue.timestamp,
        eventType,
        beforeImage,
        afterImage,
    };
    
}