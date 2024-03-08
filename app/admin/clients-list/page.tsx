"use client"
import { Client, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import Link from 'next/link'

async function getData(): Promise<Client[]> {
  // Fetch data from your API here.
  return [
    {
      id: "d8rf45t1",
      admin: "Luz Coronado",
      first_name: "Magda",
      sur_name: "Duarte",
      email: "magdaduarte@gmail.com",
      country_code: "57",
      phone_number: "3209939019"      
    },
    {
      id: "er52fg1g",
      admin: "Luz Coronado",
      first_name: "Nelson",
      sur_name: "González",
      email: "nelsongonzalez@gmail.com",
      country_code: "57",
      phone_number: "3212408192"   
    },
    // ...
  ]
}

export default async function ClientsList() {
  const data = await getData()

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight my-4">Clients directory</h2>

      <div className="flex-1 space-y-4">
        <Link className="text-purple-500 font-semibold" href="../admin/clients">Create Client</Link>
        <DataTable columns={columns} data={data} />
      </div>
      
    </>
  );
};

