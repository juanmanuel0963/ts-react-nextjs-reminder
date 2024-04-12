"use client"
import { Admin, columns } from "../../lib/columns"
import { DataTable } from "@/components/ui/data-table"
import Link from 'next/link'
//import { getData } from "@/lib/actions"

async function getMyData(): Promise<Admin[]> {

  let rows: never[] = [];
  console.log("My rows 1");
  console.log(rows);

  const api = await fetch('https://j3aovbsud0.execute-api.us-east-1.amazonaws.com/rmdx_admins', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {

      console.log("data");
      console.log(data);

      return data;
      /*
            // Fetch data from your API here.
            const dataFake = [
              {
                ID: 1,
                first_name: "Juan",
                sur_name: "Diaz",
                email: "juanmanuel0963@gmail.com",
                country_code: "57",
                phone_number: "3209939019"
              },
              {
                ID: 2,
                first_name: "Luz Mery",
                sur_name: "Coronado",
                email: "luzmerycoronado@gmail.com",
                country_code: "57",
                phone_number: "3212408192"
              },
            ];
      
            return dataFake;
      */
    })
    .catch((error) => {
      // Handle errors
      alert("Error loggin in. " + error);
      console.log(error);

      return rows;

    });



  return api;

};

export default async function AdminsList() {
  const data = await getMyData()

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight my-4">Admins directory</h2>

      <div className="flex-1 space-y-4">
        <Link className="text-purple-500 font-semibold" href="../admin/admins">Create Admin</Link>
        <DataTable columns={columns} data={data} />
      </div>

    </>
  );
};

