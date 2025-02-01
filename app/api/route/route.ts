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
      const { student_id, fullname, coursename, date } = await req.json();
  
      // Basic validation (enhance as needed)
      if (!student_id || !fullname || !coursename || !date) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
  
      // Specify column names explicitly
      const insertQuery = `
        INSERT INTO student_info (student_id, fullname, coursename, date)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`; // RETURNING * returns the newly inserted row
  
      // Use parameterized queries to prevent SQL injection
      const result = await pool.query(insertQuery, [student_id, fullname, coursename, date]);
  
      return NextResponse.json(result.rows[0], { status: 201 }); // Respond with the newly created record
    } catch (error) {
      console.error('Insert error:', error);
      return NextResponse.json({ error: 'Error inserting data into database' }, { status: 500 });
    }
  }

