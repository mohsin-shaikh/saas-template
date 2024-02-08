"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { links } from "@/config/nav"
import { cn } from "@/lib/utils"

interface IMainNav extends React.HTMLAttributes<HTMLElement> {
  userRole: string
}

export const MainNav = ({ className, userRole, ...props }: IMainNav) => {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4", className)} {...props}>
      {links.map((item, index) =>
        !item?.isNotAllowed?.includes(userRole) ? (
          <Link
            key={index}
            href={item.link}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              "transition-colors hover:text-foreground/80",
              pathname === item.link
                ? "font-semibold text-foreground"
                : "text-foreground/60"
              // "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              // pathname !== item.link && "text-muted-foreground"
            )}
          >
            {item.name}
          </Link>
        ) : null
      )}
    </nav>
  )
}
