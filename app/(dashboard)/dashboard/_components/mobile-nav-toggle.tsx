// FIXME: NOT WORKING.
import React from "react"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

interface ILeftNavToggle {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
}

function LeftNavToggle({ isCollapsed, setIsCollapsed }: ILeftNavToggle) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        setIsCollapsed(!isCollapsed)
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          isCollapsed === true ? [4, 96] : [20, 80]
        )}`
      }}
    >
      <HamburgerMenuIcon className="h-4 w-4" />
    </Button>
  )
}

export default LeftNavToggle
