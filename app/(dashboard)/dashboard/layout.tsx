import { cookies } from "next/headers"

import { DashboardShell } from "./_components/dashboard-shell"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  // const user = await currentUser();

  const layout = cookies().get("react-resizable-panels:layout")
  const collapsed = cookies().get("react-resizable-panels:collapsed")
  const defaultLayout =
    layout && layout.value !== "undefined"
      ? JSON.parse(layout.value)
      : undefined
  const defaultCollapsed =
    collapsed && collapsed.value !== "undefined"
      ? JSON.parse(collapsed.value)
      : undefined

  return (
    <>
      <DashboardShell
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
      >
        <main className={`flex min-h-full w-full`}>
          <div className="w-full bg-background p-4">{children}</div>
        </main>
      </DashboardShell>
    </>
  )
}

export default DashboardLayout
