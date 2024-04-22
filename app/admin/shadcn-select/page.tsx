"use client"
import { Client, columns } from "@/lib/columns-client"
import { z } from "zod"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import React, { useEffect, useState } from 'react';

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
})

const getClients = (): Client[] => {

  let rows: never[] = [];

  const api = fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_clients', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {

      console.log("data: ", data);
      return (data);

    })
    .catch((error) => {
      // Handle errors
      alert("Error loggin in. " + error);
      console.log(error);

    }).finally(() => {

    });

  return rows;
};

export default function Shadcn_Select() {

  const [results, setResults] = useState<Client[]>([])

  useEffect(() => {
    const  res = getClients();
    console.log("results: ", res);
    setResults(res);
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
            {/* Use map to loop over the dynamic list */}
            {results.map((data) => (
              // Make sure to set a unique key for each SelectItem
              <SelectItem key={data.firstName} value={data.surName}>
                {data.firstName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
