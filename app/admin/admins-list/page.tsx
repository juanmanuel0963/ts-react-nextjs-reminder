"use client"
import { Admin, columnsAdmin } from "@/lib/columns-admin";
import { DataTable } from "@/components/ui/data-table";
import Link from 'next/link';
import React from "react";
import { getSessionForClient } from "@/lib/actions"

// Async function to fetch data from the API
async function getMyData(): Promise<Admin[]> {
  try {
    const session = await getSessionForClient()
    const jsonSession = JSON.parse(session)   
    const adminId = jsonSession.adminId
    console.log("adminId: ", adminId);

    const response = await fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_admins', {
      method: 'GET',
    });
    
    const data = await response.json();
    console.log("API data received:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Error fetching data. " + error);
    return [];
  }
}

// Component to display admins
export default function ClientsList() {
  const [data, setData] = React.useState<Admin[]>([]);

  React.useEffect(() => {
    getMyData().then(setData);
  }, []);

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight my-4">Admins Directory</h2>
      <div className="flex-1 space-y-4">
        <Link className="text-purple-500 font-semibold" href="../admin/admins">Create Admin</Link>
        {data.length > 0 ? (
          <DataTable columns={columnsAdmin} data={data} />
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </>
  );
}