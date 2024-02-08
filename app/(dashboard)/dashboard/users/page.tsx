import { Metadata } from "next"
import { notFound } from "next/navigation"
import { UserRole } from "@prisma/client"

import { db } from "@/lib/db"
import { enumToKeyValueArray } from "@/lib/helper"
// import { getCurrentUser } from "@/lib/session"
import { DataTable } from "@/components/data-table/data-table"

import { columns } from "./_components/columns"
import CreateModal from "./_components/create-modal"
import { currentUser } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Users",
  description: "User Management",
}

async function getUsers() {
  const allUsers = await db.user.findMany({
    orderBy: { id: "desc" },
  })
  return allUsers
}

// export const revalidate = 0

export default async function UserPage() {
  // const user = await getCurrentUser()
  const user = await currentUser();
  // @ts-expect-error
  if (user.role !== "ADMIN") {
    // return notFound()
    return (
      <>
        <div className="h-[calc(100vh-64px-32px)] flex-1 flex-col space-y-4">
          <div className="h-full flex items-center justify-center">
            <h2 className="text-2xl font-bold tracking-tight">401 | Unauthorized</h2>
          </div>
        </div>
      </>
    )
  }

  const users = await getUsers()

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-4">
        <div className="flex flex-row flex-wrap items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <CreateModal />
        </div>
        <DataTable
          data={users}
          columns={columns}
          filter="email"
          facedFilters={[
            {
              column: "role",
              title: "Role",
              options: enumToKeyValueArray(UserRole),
            },
          ]}
        />
      </div>
    </>
  )
}
