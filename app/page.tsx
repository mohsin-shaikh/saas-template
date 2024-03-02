import { Poppins } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Announcement } from "@/components/announcement"
import { LoginButton } from "@/components/auth/login-button"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
})

export default function Home() {
  return (
    <div className="">
      <div className="container relative">
        <div
          className={cn(
            "sticky top-4 z-10",
            "h-[52px]",
            "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            "flex items-center justify-between",
            "border rounded-full px-4 mt-4 shadow"
          )}
        >
          <div className="flex justify-center items-center">
            <Icons.logo className="w-4 h-4 mr-2" />
            SaaS Template
          </div>
          <div className="flex items-center space-x-4 lg:ml-auto">
            <ModeToggle />
          </div>
        </div>
        <PageHeader>
          <Announcement />
          <PageHeaderHeading>Build your SaaS Application</PageHeaderHeading>
          <PageHeaderDescription>
            Beautifully designed SaaS Application. Accessible. Customizable.
            Open Source.
          </PageHeaderDescription>
          <PageActions>
            <Link href="/dashboard" className={cn(buttonVariants())}>
              Get Started
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.github}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <Icons.gitHub className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </PageActions>
        </PageHeader>
        <section
          className={cn(
            "overflow-hidden rounded-lg border bg-background shadow-md md:shadow-xl flex justify-center items-center",
            "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100 to-teal-100"
          )}
        >
          <Image
            src="/dark.png"
            width={1280}
            height={727}
            alt="Mail"
            className="hidden dark:block"
          />
          <Image
            src="/light.png"
            width={1280}
            height={727}
            alt="Mail"
            className="block dark:hidden"
          />
        </section>
      </div>
    </div>
  )
}
