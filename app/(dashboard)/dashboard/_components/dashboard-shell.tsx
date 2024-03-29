"use client"

import { useState } from "react"

import { administrationLinks, primaryLinks } from "@/config/links"
import { cn } from "@/lib/utils"
import { useCurrentUser } from "@/hooks/use-current-user"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"

import Logo from "./logo"
import { MobileNav } from "./mobile-nav"
import { Nav } from "./nav"
import NavToggle from "./nav-toggle"

interface IDashboardShell {
  children: React.ReactNode
}

export function DashboardShell({ children }: IDashboardShell) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const user = useCurrentUser()

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-full items-stretch">
        <div
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out",
            !isCollapsed && "min-w-64",
            "hidden lg:block"
          )}
        >
          <Logo isCollapsed={isCollapsed} />
          <Separator />
          <Nav isCollapsed={isCollapsed} links={primaryLinks} />
          <Separator />
          <Nav isCollapsed={isCollapsed} links={administrationLinks} />
        </div>
        <Separator orientation="vertical" className="hidden lg:block" />
        <div className="w-full">
          <div className={cn("h-full overflow-y-auto", "bg-muted")}>
            <div
              className={cn(
                "sticky top-0 z-10",
                "h-[52px]",
                "bg-background",
                // "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
                "flex items-center justify-between px-2"
              )}
            >
              <div className="hidden lg:block">
                <NavToggle
                  isCollapsed={isCollapsed}
                  setIsCollapsed={setIsCollapsed}
                />
              </div>
              <div className="block lg:hidden">
                <MobileNav />
              </div>
              <div className="block lg:hidden">
                <Logo isCollapsed={true} />
              </div>
              <div className="flex items-center space-x-4 lg:ml-auto">
                <ModeToggle />
                <UserNav
                  user={{
                    name: user?.name ?? "N/A",
                    email: user?.email ?? "N/A",
                  }}
                />
              </div>
            </div>
            <Separator className="sticky top-[52px]" />
            <div className={cn("overflow-y-auto")}>{children}</div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
