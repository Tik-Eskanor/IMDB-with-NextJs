import * as React from "react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  
} from "@/components/ui/sidebar"
import Image from "next/image"

export function LogoSection() {
  return (
    <SidebarMenu> 
      <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
            >
              <div className="flex-1 flex gap-2 items-center justify-center"> 
                <div className="aspect-square size-8">
                 <div className="text-2xl text-blue-700"></div>
                </div>
                <div className="text-left text-lg leading-tight">
                 Eskanor
                </div>
              </div>
            </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
