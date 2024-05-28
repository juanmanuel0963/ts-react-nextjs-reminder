"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Reminder = {
  ID: number
  title: string
  message: string
  daysBefore: number
  frequency: string
  recipients: string
  channels: string
  clientSchedule: string
  adminSchedule: string
  clientFirstName: string
  clientSurName: string
  adminFirstName: string
  adminSurName: string  
};

export const columnsReminder: ColumnDef<Reminder>[] = [
  {
    accessorKey: "ID",
    header: "ID",
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
    accessorKey: "daysBefore",
    header: "Days Before",
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
  },
  {
    accessorKey: "recipients",
    header: "Recipients",
  },
  {
    accessorKey: "channels",
    header: "Channels",
  },
  {
    accessorKey: "clientSchedule",
    header: "Client Schedule",
  },
  {
    accessorKey: "adminSchedule",
    header: "Admin Schedule",
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
