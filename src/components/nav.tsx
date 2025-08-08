"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Grid3x3,
  Bell,
  Eye,
  HeartPulse,
  FileText,
  Search,
} from "lucide-react";

const menuItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/reminders", label: "Reminders", icon: Bell },
  { href: "/exercises", label: "Exercises", icon: Eye },
];

const learnItems = [
    { href: "/articles", label: "Articles", icon: FileText },
    { href: "/conditions", label: "Conditions", icon: HeartPulse },
];

const testItems = [
    { href: "/amsler-grid", label: "Amsler Grid", icon: Grid3x3 },
    { href: "/symptom-checker", label: "Symptom Checker", icon: Search },
]

export function Nav() {
  const pathname = usePathname();

  return (
    <div className="p-2 space-y-4">
      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      
      <div>
        <p className="px-2 text-xs font-semibold text-muted-foreground/80 tracking-wider">Learn</p>
         <SidebarMenu>
            {learnItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </div>

      <div>
        <p className="px-2 text-xs font-semibold text-muted-foreground/80 tracking-wider">Vision Tests</p>
         <SidebarMenu>
            {testItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </div>
    </div>
  );
}
