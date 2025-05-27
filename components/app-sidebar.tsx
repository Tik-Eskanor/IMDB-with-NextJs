"use client"

import * as React from "react"
import {
  BookOpen,
  Settings2,
} from "lucide-react"
import { TbLayoutGridRemove } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { RiUserLine } from "react-icons/ri";

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { LogoSection } from "@/components/logo-section"
import { BsCartPlus } from "react-icons/bs";
import { IoWarningOutline } from "react-icons/io5";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: TbLayoutGridRemove,
      isActive: true
    },
    {
      title: "User Management",
      url: "#",
      icon: IoWarningOutline 
    },
    {
      title: "Order",
      url: "#",
      icon: BsCartPlus
    },
    {
      title: "Dispute",
      url: "#",
      icon: IoWarningOutline,
      // items: [
      //   {
      //     title: "General",
      //     url: "#",
      //   },
      //   {
      //     title: "Team",
      //     url: "#",
      //   },
      //   {
      //     title: "Billing",
      //     url: "#",
      //   },
      //   {
      //     title: "Limits",
      //     url: "#",
      //   },
      // ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="!bg-violet-700">
      <SidebarHeader className="mt-3 mb-5">
        <LogoSection/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
