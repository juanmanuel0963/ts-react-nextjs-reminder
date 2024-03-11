"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Commitment = {
  id: string
  admin: string
  client: string
  commitment: string
  date: string
}

export const columns: ColumnDef<Commitment>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "admin",
    header: "Admin",
  },  
  {
    accessorKey: "client",
    header: "Client",
  },
  {
    accessorKey: "commitment",
    header: "Commitment",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
]
