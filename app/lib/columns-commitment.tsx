"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from 'next/link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Commitment = {
  ID: number
  commitment: string
  date: Date
  clientId: number
  clientName: string
  adminName: string
};

export const columnsCommitment: ColumnDef<Commitment>[] = [
  {
    accessorKey: "ID",
    header: "ID",
  },
  {
    accessorKey: "commitment",
    header: "Commitment",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "clientName",
    header: "Client name",
  },
  {
    accessorKey: "adminName",
    header: "Admin name",
  },
  {
    accessorKey: 'ID', // assuming 'id' is the unique identifier for each reminder
    header: 'Actions',    
    cell: ({ row }) => (
      <Link href={`/admin/commitments?id=${row.getValue("ID")}`}>
        View
      </Link>
    ),
  },  
]
