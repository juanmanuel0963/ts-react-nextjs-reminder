"use client"
import { Client, columnsClient } from "@/lib/columns-client"
import Link from 'next/link'
import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

async function getMyData(): Promise<Client[]> {

    let rows: never[] = [];

    const api = await fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_clients', {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {

            console.log("data: ", data);
            
            return data;

        })
        .catch((error) => {
            // Handle errors
            alert("Error loggin in. " + error);
            console.log(error);

            return rows;

        });

    return api;

};

export default async function Shadcn_Combobox_Gpt() {
    // Define your dynamic list
    const fruits = [
        {
            id: "1",
            label: "juan64",
        },
        // ... (other fruits)
    ];
    
    const datax = await getMyData();

    return (
        <>
            <h2 className="text-3xl font-bold tracking-tight my-4">Clients directory</h2>

            <div className="flex-1 space-y-4">
                <Link className="text-purple-500 font-semibold" href="../admin/clients">Create Client</Link>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            {/* Use map to loop over the dynamic list */}
                            {datax.map((data) => (
                                // Make sure to set a unique key for each SelectItem
                                <SelectItem key={data.firstName} value={data.surName}>
                                    {data.firstName}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

        </>
    );
};

