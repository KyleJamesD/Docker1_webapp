import React, { useEffect, useState } from 'react';
import { DataItem } from '../api/utility/schema';




  interface setpropstype  {
    data: DataItem[];
    setData: React.Dispatch<React.SetStateAction<DataItem[]>>;
  }

export default function DataDisplay ({data, setData}: setpropstype) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/route');
        if (!res.ok) {
          throw new Error('Failed to fetch data from API');
        }
        const result: DataItem[] = await res.json();

        setData(result);
        console.log('the result is:',result);
        setLoading(false);
      } catch (error: any) {
        console.log(error);
      } 
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Data from Database</h1>
      <ul>
        {data ? data.map((item) => (
          <li key={item.student_id}>
            ID: {item.student_id}, Name: {item.fullname},Name: {item.coursename},Name: {item.date}
          </li> 
        )) : <div></div>}
      </ul>
    </div>
  );
};

