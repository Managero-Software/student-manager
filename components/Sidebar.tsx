"use client";
import React from "react";
import Link from "next/link";
import {
  CircleHelp,
  Home,
  LogOut,
  Package2,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/actions/user.actions";

const Sidebar = () => {
  const router = useRouter();
  const logOut = async () => {
    const userExists = await logoutUser();
    if (userExists) {
      router.push("/");
    }
  };
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
            <Link href="/about" className="sidebar-menu-item">
              <ShoppingCart className="h-4 w-4" />
              About
            </Link>

            <div className="sidebar-menu-item cursor-pointer" onClick={logOut}>
              <LogOut className="h-4 w-4" />
              Logout
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
