"use client"
import { Commitment, columns } from "@/lib/columns-commitment"
import { DataTable } from "@/components/ui/data-table"
import Link from 'next/link'
//import { getData } from "@/lib/actions"

async function getMyData(): Promise<Commitment[]> {

  let rows: never[] = [];

  const api = await fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_commitments?id=3', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {

      console.log("data");
      console.log(data);

      return data;

    })
    .catch((error) => {
      // Handle errors
      alert("Error loggin in. " + error);
      console.log(error);

      return rows;

    });

  return api;

};

export default async function CommitmentsList() {
  const data = await getMyData()

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight my-4">Commitments directory</h2>

      <div className="flex-1 space-y-4">
        <Link className="text-purple-500 font-semibold" href="../admin/commitments">Create Commitment</Link>
        <DataTable columns={columns} data={data} />
      </div>

    </>
  );
};

