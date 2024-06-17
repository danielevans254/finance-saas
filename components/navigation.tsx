'use client';

import { navRoutes } from "@/constants/nav-routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useMedia } from 'react-use';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const isMobile = useMedia('(max-width: 1024px)', false);
  console.log({ isMobile });
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  }

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="p-2 text-white font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none focus:bg-white/30 transition">
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetClose />
          </SheetHeader>
          <SheetDescription>
            <div className="flex flex-col gap-y-2">
              {navRoutes.map((route) => (
                <Button key={route.href} variant={route.href === pathname ? "default" : "ghost"} onClick={() => onClick(route.href)} className={cn(isActive(route.href) ? "text-white" : "text-black/80")}>
                  {route.label}
                </Button>
              ))}
            </div>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="hidden lg:flex items-center justify-center gap-x-2 overflow-x-auto text-white">
      {navRoutes.map((route) => (
        <Link key={route.href} href={route.href} className={cn("w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus:bg-white/30 transition p-2", isActive(route.href) ? "bg-white/10 text-white" : "bg-transparent")}>
          {route.label}
        </Link>
      ))}
    </div>
  );
}

export default Navigation;
