"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Reminder = {
  id: string
  client: string
  event: string
  title: string
  message: string
  days_before: string
  frequency: string
}

export const columns: ColumnDef<Reminder>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "client",
    header: "Client",
  },    
  {
    accessorKey: "event",
    header: "Event",
  },  
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "days_before",
    header: "Days before",
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
  },
]
