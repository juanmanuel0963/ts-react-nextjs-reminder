"use client"
import { Event, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import Link from 'next/link'

async function getData(): Promise<Event[]> {
  // Fetch data from your API here.
  return [
    {
      id: "d8rf45t1",
      admin: "Luz Coronado",
      client: "Magda Duarte",
      event_name: "Expedición Póliza de auto URS573",
      date: "01-Mar-2024"
    },
    {
      id: "er52fg1g",
      admin: "Luz Coronado",
      client: "",
      event_name: "Pagar recibo gas apartamento",
      date: "15-Mar-2024"
    },
    // ...
  ]
}

export default async function EventsList() {
  const data = await getData()

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight my-4">Events directory</h2>

      <div className="flex-1 space-y-4">
        <Link className="text-purple-500 font-semibold" href="../admin/events">Create Event</Link>
        <DataTable columns={columns} data={data} />
      </div>
      
    </>
  );
};

