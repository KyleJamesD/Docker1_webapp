'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import DataDisplay from "./components/DataDisplay";
import { DataItem } from "./api/utility/schema";



export default function Home() {


  function handleSubmit (event:any) {
    event.preventDefault(); 
    const  newStudent : DataItem = {
      student_id : studentId,
      fullname : fullName,
      coursename : courseName,
      date : date

    }
    addStudent(newStudent);
  }

const [studentId, setStudentId] = useState('');
const [fullName, setFullName] = useState('');
const [courseName, setCourseName] = useState('');
const [date, setDate] = useState('');
const [data, setData] = useState<DataItem[]>([]);

const addStudent = async (student: { student_id: string; fullname: string; coursename: string; date:string;  }) => {
  
  try {
    const res = await fetch('/api/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });

    if (!res.ok) {
      throw new Error('Failed to insert data');
    }

    const newStudent = await res.json();
    // Optionally, update the state to add the new student
    setData((prev) => [...prev, newStudent]);
    setStudentId('')
    setFullName('')
    setCourseName('')
    setDate('')
    fetchData();
    console.log('Successfully added:', newStudent);
  } catch (error) {
    console.error('Error adding student:', error);
  }
};

const fetchData = async () => {
      try {
        const res = await fetch('/api/route');
        if (!res.ok) {
          throw new Error('Failed to fetch data from API');
        }
        const result: DataItem[] = await res.json();

        setData(result);
        console.log('the result is:',result);
      } catch (error) {
        console.log(error);
      } 
    };

  return (
    <div className={styles.page}>
      <h1>Add New Student</h1>
      <form onSubmit={handleSubmit} method="POST" className={styles.page}>
        <label>
        <input type="text" 
        name="student_id" 
        placeholder="Student ID"
        value={studentId} 
        onChange={(event) =>(setStudentId(event.target.value))}></input>
        </label>
        <label>
        <input type="text" 
        name="fullname" 
        placeholder="Full Name"
        value={fullName} 
        onChange={(event) =>(setFullName(event.target.value))}></input>
        </label>
        <label>
        <input type="text" 
        name="coursename" 
        placeholder="Couse Name"
        value={courseName} 
        onChange={(event) =>(setCourseName(event.target.value))}></input>
        </label>
        <label>
        <input type="text" 
        name="date" 
        placeholder="Date (dd/mm/yyyy)"
        value={date} 
        onChange={(event) =>(setDate(event.target.value))}></input>
        </label>
        <button className={styles.submitButton} type="submit">Add Student</button>
      </form>
      <DataDisplay data={data} setData={setData}></DataDisplay>
    </div>
  );
}
