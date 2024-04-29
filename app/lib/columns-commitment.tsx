"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Commitment = {
  ID: number
  commitment: string
  date: Date
  clientId: number
};

export const columns: ColumnDef<Commitment>[] = [
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
    accessorKey: "ClientID",
    header: "Client Id",
  },     
]
