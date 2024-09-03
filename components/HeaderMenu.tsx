"use client";
import React from "react";
import Link from "next/link";
import {
  CircleHelp,
  CircleUser,
  Home,
  LogOut,
  Menu,
  Package2,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { logoutUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const HeaderMenu = () => {
  const router = useRouter();
  const logOut = async () => {
    const userExists = await logoutUser();
    if (userExists) {
      router.push("/");
    }
  };
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Student TimeMaster</span>
            </Link>
            <Link href="/dashboard" className="header-menu-item">
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link href="/about" className="header-menu-item">
              <ShoppingCart className="h-5 w-5" />
              About
            </Link>
            <div className="header-menu-item cursor-pointer" onClick={logOut}>
              <LogOut className="h-5 w-5" />
              Logout
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default HeaderMenu;
