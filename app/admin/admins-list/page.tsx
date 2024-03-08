"use client"
import { Admin, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import Link from 'next/link'

async function getData(): Promise<Admin[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      first_name: "Juan",
      sur_name: "Diaz",
      email: "juanmanuel0963@gmail.com",
      country_code: "57",
      phone_number: "3209939019"      
    },
    {
      id: "598egh7i",
      first_name: "Luz Mery",
      sur_name: "Coronado",
      email: "luzmerycoronado@gmail.com",
      country_code: "57",
      phone_number: "3212408192"   
    },
    // ...
  ]
}

export default async function AdminsList() {
  const data = await getData()

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight my-4">Admins directory</h2>

      <div className="flex-1 space-y-4">
        <Link className="text-purple-500 font-semibold" href="../admin/admins">Create Admin</Link>
        <DataTable columns={columns} data={data} />
      </div>
      
    </>
  );
};

