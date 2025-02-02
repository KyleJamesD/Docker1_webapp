import { NextRequest, NextResponse } from "next/server";
import pool from "../db/client";

export async function GET(req: NextRequest) {
    try{
        const result = await pool.query('SELECT * FROM "student_info";');
        return NextResponse.json(result.rows);
    }
    catch (error){
        console.log('Database Query error:', error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
    }
}


export async function POST(req: NextRequest) {
    try {
      const { studentID, studentName, course, presentDate } = await req.json();
  
      // Basic validation 
      if (!studentID || !studentName || !course || !presentDate) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
  
      // Column names  must be in quotes in order to be Case-sensitive
      const insertQuery = `
        INSERT INTO student_info ("studentID", "studentName", "course", "presentDate")
        VALUES ($1, $2, $3, $4)
        RETURNING *;`; // RETURNING * returns the newly inserted row
  
      // Use parameterized queries to prevent SQL injection
      const result = await pool.query(insertQuery, [studentID, studentName, course, presentDate]);
  
      return NextResponse.json(result.rows[0], { status: 201 }); // Respond with the newly created record
    } catch (error) {
      //because we know the details of the errors, we will create a error type 
      // and cast the error so we can access those types
      //error in this case returns an object(promise? reject?)  with 17 attributes, but we only need these two
      interface ErrorType {
        code?: string;
        detail?: string;
      }
      //cast the error to our defined error type
      const dbError = error as ErrorType;
      console.error('Insert error:', error);
      //Now we can make error codes as we wish.
      //We were using db.detail, but tis exposes the names of our columns in SQL, 
      // we should use a custom error code instead.
      if ( dbError.code == '23505')
      {
        return NextResponse.json({error: 'student already exists!' }, { status: 409 });
      }
      else {
        return NextResponse.json({ error: 'Error inserting data into database' }, { status: 500 });
      }
      
    }
  }

