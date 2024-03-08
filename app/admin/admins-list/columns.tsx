"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Admin = {
  id: string
  first_name: string
  sur_name: string
  email: string
  country_code: string
  phone_number: string
}

export const columns: ColumnDef<Admin>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "first_name",
    header: "First name",
  },
  {
    accessorKey: "sur_name",
    header: "Sur name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "country_code",
    header: "Country code",
  },
  {
    accessorKey: "phone_number",
    header: "Phone number",
  },
]
