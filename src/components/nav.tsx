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
  AlarmClock,
  Eye,
  Activity,
  FileText,
  Search
} from "lucide-react";

const menuItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/symptom-checker", label: "Symptom Checker", icon: Search },
  { href: "/amsler-grid", label: "Amsler Grid", icon: Grid3x3 },
  { href: "/reminders", label: "Reminders", icon: AlarmClock },
  { href: "/articles", label: "Articles", icon: FileText },
  { href: "/conditions", label: "Conditions", icon: Activity },
  { href: "/exercises", label: "Exercises", icon: Eye },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <div className="p-2">
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
    </div>
  );
}
