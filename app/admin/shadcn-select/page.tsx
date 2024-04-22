"use client"
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Client } from "@/lib/columns-client";

const FormSchema = z.object({
  email: z.string({
    required_error: "Please select an email to display.",
  }).email(),
})

const getClients = async (): Promise<Client[]> => {
  try {
    const response = await fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_clients', {
      method: 'GET',
    });
    const data = await response.json();
    console.log("Data fetched: ", data);
    return data;
  } catch (error) {
    console.error("Error fetching clients: ", error);
    alert("Error fetching clients: " + error);
    return [];
  }
};

export default function Shadcn_Select() {
  const [results, setResults] = useState<Client[]>([]);

  useEffect(() => {
    async function fetchClients() {
      const clients = await getClients();
      setResults(clients);
    }

    fetchClients();
  }, []);

  return (
    <div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a client" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Clients</SelectLabel>
            {results.map(client => (
              <SelectItem key={client.ID} value={client.firstName}>
                {client.firstName + ' ' + client.surName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}