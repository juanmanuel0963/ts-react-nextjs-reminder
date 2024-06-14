"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from 'next/link';
import React from "react";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Reminder = {
  ID: number;
  title: string;
  message: string;
  daysBefore: number;
  frequency: string;
  recipients: string;
  channels: string;
  clientSchedule: string;
  adminSchedule: string;
  clientName: string;
  adminName: string;
};

export const columnsReminder = (
  handleDelete: (id: number, clientSchedule: string, adminSchedule: string) => void,
  showLink: boolean
): ColumnDef<Reminder>[] => [
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
    header: "Client Name",
  },
  {
    accessorKey: "adminName",
    header: "Admin Name",
  },
  {
    accessorKey: 'actions', // Use a unique accessorKey for the Actions column
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        {showLink && (
          <Link href={`/admin/reminders?id=${row.getValue("ID")}`}>
            View
          </Link>
        )}
        <Button onClick={() => handleDelete(row.getValue("ID"), row.getValue("clientSchedule"), row.getValue("adminSchedule"))}>
          Delete
        </Button>
      </div>
    ),
  },
];
