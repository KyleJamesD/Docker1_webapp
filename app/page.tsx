'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {


  function handleSubmit () {
    console.log ("handle submit pressed")
  }

const [studentId, setStudentId] = useState('');
const [fullname, setFullName] = useState('');
const [courseName, setCourseName] = useState('');
const [date, setDate] = useState('');


  



  return (
    <div className={styles.page}>
      <h1>Add New Student</h1>
      <form onSubmit={handleSubmit} className={styles.page}>
        <label>
        <input type="text" 
        name="username" 
        placeholder="Student ID"
        value={studentId} 
        onChange={(event) =>(setStudentId(event.target.value))}></input>
        </label>
        <label>
        <input type="text" 
        name="username" 
        placeholder="Full Name"
        value={fullname} 
        onChange={(event) =>(setFullName(event.target.value))}></input>
        </label>
        <label>
        <input type="text" 
        name="username" 
        placeholder="Couse Name"
        value={courseName} 
        onChange={(event) =>(setCourseName(event.target.value))}></input>
        </label>
        <label>
        <input type="text" 
        name="username" 
        placeholder="Date (dd/mm/yyyy)"
        value={date} 
        onChange={(event) =>(setDate(event.target.value))}></input>
        </label>
        <button className={styles.submitButton} type="submit">Add Student</button>
      </form>

    </div>
  );
}
