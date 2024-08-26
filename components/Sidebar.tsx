import React from "react";
import Link from "next/link";
import {
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";

const Sidebar = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="">TimeMaster</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link href="/dashboard" className="sidebar-menu-item">
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link href="/profile" className="sidebar-menu-item">
              <ShoppingCart className="h-4 w-4" />
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
