"use client"

import { ColumnDef } from "@tanstack/react-table";
import Link from 'next/link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Commitment = {
  ID: number;
  commitment: string;
  date: Date;
  clientId: number;
  clientName: string;
  adminName: string;
};

export const columnsCommitment: ColumnDef<Commitment>[] = [
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
      <Link href={`/admin/commitments?id=${row.getValue("ID")}`}>
        View
      </Link>
    ),
  },
];
