"use client";

import { Reminder, columnsReminder } from "@/lib/columns-reminder";
import { DataTable } from "@/components/ui/data-table";
import Link from 'next/link';
import React from "react";
import { getSessionForClient } from "@/lib/actions";
import { deleteReminder } from "@/lib/delete-reminder";
import { deleteSchedule } from "@/lib/delete-schedule";

// Async function to fetch data from the API
async function getMyData(): Promise<Reminder[]> {
  try {
    const session = await getSessionForClient();
    const jsonSession = JSON.parse(session);
    const adminId = jsonSession.adminId;
    console.log("adminId: ", adminId);

    const response = await fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_reminders?adminId=' + adminId, {
      method: 'GET',
    });

    const data = await response.json();
    console.log("API data received:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Error fetching data. " + error);
    return [];
  }
}

// Component to display reminders
export default function RemindersList() {
  const [data, setData] = React.useState<Reminder[]>([]);

  React.useEffect(() => {
    getMyData().then(setData);
  }, []);

  const handleDelete = async (id: number, clientSchedule: string, adminSchedule: string) => {
    await deleteReminder(id);

    console.log("*" + clientSchedule + "*");
    console.log("*" + adminSchedule + "*");

    if (clientSchedule !== "") {
      await deleteSchedule(clientSchedule);
    } else {
      console.log("No clientSchedule");
    }

    if (adminSchedule !== "") {
      await deleteSchedule(adminSchedule);
    } else {
      console.log("No adminSchedule");
    }

    setData((prevData) => prevData.filter((reminder) => reminder.ID !== id));
  };

  const showLink = true; // Set this based on your condition

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight my-4">Reminders Directory</h2>
      <div className="flex-1 space-y-4">
        <Link className="text-purple-500 font-semibold" href="../admin/reminders">Create Reminder</Link>
        {data.length > 0 ? (
          <DataTable columns={columnsReminder(handleDelete, showLink)} data={data} />
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </>
  );
}
