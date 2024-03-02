import { cookies } from "next/headers"

import { DashboardShell } from "./_components/dashboard-shell"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  // const user = await currentUser();

  return (
    <>
      <DashboardShell>
        <main className={`flex min-h-full w-full p-2`}>
          <div className="w-full bg-background p-2 rounded shadow">
            {children}
          </div>
        </main>
      </DashboardShell>
    </>
  )
}

export default DashboardLayout
