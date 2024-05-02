"use client"
import { Commitment, columns } from "@/lib/columns-commitment";
import { DataTable } from "@/components/ui/data-table";
import Link from 'next/link';
import React from "react";
import { getSessionForClient } from "@/lib/actions"

// Async function to fetch data from the API
async function getMyData(): Promise<Commitment[]> {
  try {
    const session = await getSessionForClient()
    const jsonSession = JSON.parse(session)   
    const adminId = jsonSession.adminId
    console.log("adminId: ", adminId);

    const response = await fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_commitments?adminId=' + adminId);
    const data = await response.json();
    console.log("API data received:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Error fetching data. " + error);
    return [];
  }
}

// Component to display commitments
export default function CommitmentsList() {
  const [data, setData] = React.useState<Commitment[]>([]);

  React.useEffect(() => {
    getMyData().then(setData);
  }, []);

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight my-4">Commitments Directory</h2>
      <div className="flex-1 space-y-4">
        <Link className="text-purple-500 font-semibold" href="../admin/commitments">Create Commitment</Link>
        {data.length > 0 ? (
          <DataTable columns={columns} data={data} />
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </>
  );
}