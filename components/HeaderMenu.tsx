"use client";
import React from "react";
import Link from "next/link";
import {
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Student TimeMaster</span>
            </Link>
            <Link href="#" className="header-menu-item">
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link href="#" className="header-menu-item">
              <ShoppingCart className="h-5 w-5" />
              Orders
            </Link>
            <Link href="#" className="header-menu-item">
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link href="#" className="header-menu-item">
              <Users className="h-5 w-5" />
              Customers
            </Link>
            <Link href="#" className="header-menu-item">
              <LineChart className="h-5 w-5" />
              Analytics
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-row-reverse">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default HeaderMenu;
