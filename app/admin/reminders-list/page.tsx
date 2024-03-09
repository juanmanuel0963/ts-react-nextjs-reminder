"use client"
import { Reminder, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import Link from 'next/link'

async function getData(): Promise<Reminder[]> {
  // Fetch data from your API here.
  return [
    {
      id: "d8rf45t1",
      client: "Magda Duarte",
      event: "Póliza de auto URS573",
      title: "Recordatorio Póliza Auto URS573",
      message: "El vencimiento del pago de su póliza es el día de hoy.",
      days_before: "0",
      frequency: "Monthly"      
    },
    {
      id: "45df3485",
      client: "Magda Duarte",
      event: "Póliza de auto URS573",
      title: "Recordatorio Póliza Auto URS573",
      message: "El vencimiento del pago de su póliza es el día de mañana.",
      days_before: "1",
      frequency: "Monthly"            
    },    
    {
      id: "4rt56y7u",
      client: "Magda Duarte",
      event: "Póliza de auto URS573",
      title: "Recordatorio Póliza Auto URS573",
      message: "El vencimiento del pago de su póliza es el próximo día 30 de mes.",
      days_before: "5",
      frequency: "Monthly"            
    },        
    {
      id: "4rt56y7u",
      client: "Magda Duarte",
      event: "Póliza de auto URS573",
      title: "Renovación Póliza Auto Magda Duarte",
      message: "La Renovación de la póliza de auto URS573 vence el próximo día 30 de mes.",
      days_before: "30",
      frequency: "Yearly"            
    },          
    {
      id: "er52fg1g",
      client: "",
      event: "Recibo de Gas apartamento",
      title: "Recordatorio Pagar recibo gas apartamento",
      message: "El vencimiento del recibo de gas es hoy.",
      days_before: "0",
      frequency: "Monthly"            
    },    
    // ...
  ]
}

export default async function RemindersList() {
  const data = await getData()

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight my-4">Reminders directory</h2>

      <div className="flex-1 space-y-4">
        <Link className="text-purple-500 font-semibold" href="../admin/reminders">Create Reminder</Link>
        <DataTable columns={columns} data={data} />
      </div>
      
    </>
  );
};

