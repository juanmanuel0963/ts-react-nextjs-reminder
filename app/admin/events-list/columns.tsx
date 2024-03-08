"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Event = {
  id: string
  admin: string
  client: string
  event_name: string
  date: string
}

export const columns: ColumnDef<Event>[] = [
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
    accessorKey: "event_name",
    header: "Event name",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
]
