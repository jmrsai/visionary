"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Nav } from "@/components/nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <Button variant="ghost" size="icon" className="p-0" asChild>
                <Link href="/">
                  <Eye className="size-6 text-primary" />
                </Link>
              </Button>
              <h2 className="text-lg font-semibold tracking-tight">Visionary</h2>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <Nav />
          </SidebarContent>

          <SidebarFooter>
            <ThemeToggle />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className="flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:hidden">
            <SidebarTrigger />
            <h2 className="text-lg font-semibold tracking-tight">Visionary</h2>
          </div>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
