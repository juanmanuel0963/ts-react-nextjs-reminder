"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from 'next/link';
import React from "react";
import { Button } from "@/components/ui/button";

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
  clientName: string
  adminName: string
};

export const columnsReminder = (handleDelete: (id: number) => void): ColumnDef<Reminder>[] => [
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
    accessorKey: "clientName",
    header: "Client name",
  },
  {
    accessorKey: "adminName",
    header: "Admin name",
  },
  {
    accessorKey: 'ID', // assuming 'ID' is the unique identifier for each reminder
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Link href={`/admin/reminders?id=${row.getValue("ID")}`}>
          View
        </Link>
        <Button onClick={() => handleDelete(row.getValue("ID"))}>
          Delete
        </Button>
      </div>
    ),
  },
];