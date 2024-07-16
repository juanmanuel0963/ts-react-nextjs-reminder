"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from 'next/link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Client = {
  ID: number
  firstName: string
  surName: string
  email: string
  countryCode: string
  phoneNumber: string
  adminId: number
  adminFirstName: string
  adminSurName: string
};

export const columnsClient: ColumnDef<Client>[] = [
  {
    accessorKey: "ID",
    header: "ID",
  },
  {
    accessorKey: "firstName",
    header: "First name",
  },
  {
    accessorKey: "surName",
    header: "Sur name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "countryCode",
    header: "Country code",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone number",
  },
  {
    accessorKey: "AdminID",
    header: "Admin Id",
  },    
  {
    accessorKey: "adminFirstName",
    header: "Admin First name",
  },
  {
    accessorKey: "adminSurName",
    header: "Admin Sur name",
  },  
  {
    accessorKey: 'actions', // Use a unique accessorKey for the Actions column
    header: 'Actions',
    cell: ({ row }) => (
      <Link href={`/admin/clients?id=${row.getValue("ID")}`}>
        View
      </Link>
    ),
  },  
]
