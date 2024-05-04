"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Admin = {
  ID: number
  firstName: string
  surName: string
  email: string
  countryCode: string
  phoneNumber: string
  isSuperAdmin: string
  isAdmin: string
};

export const columnsAdmin: ColumnDef<Admin>[] = [
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
    accessorKey: "isSuperAdmin",
    header: "Is SuperAdmin",
  },  
  {
    accessorKey: "isAdmin",
    header: "Is Admin",
  },    
]
