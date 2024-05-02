"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Commitment = {
  ID: number
  commitment: string
  date: Date
  clientId: number
  clientFirstName: string
  clientSurName: string
  adminFirstName: string
  adminSurName: string
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
  {
    accessorKey: "clientFirstName",
    header: "Client First name",
  },
  {
    accessorKey: "clientSurName",
    header: "Client Sur name",
  },
  {
    accessorKey: "adminFirstName",
    header: "Admin First name",
  },
  {
    accessorKey: "adminSurName",
    header: "Admin Sur name",
  },
]
