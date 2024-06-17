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
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { motion } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const isMobile = useMedia('(max-width: 1024px)', false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  }

  const variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="p-2 text-white font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none focus:bg-white/30 transition">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full max-w-full">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold">Menu</SheetTitle>
            <SheetClose />
          </SheetHeader>
          <SheetDescription>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                exit: { opacity: 0 }
              }}
              className="flex flex-col gap-y-4 mt-4"
            >
              {navRoutes.map((route) => (
                <motion.div
                  key={route.href}
                  variants={variants}
                >
                  <Button
                    key={route.href}
                    variant={route.href === pathname ? "default" : "ghost"}
                    onClick={() => onClick(route.href)}
                    className={cn(isActive(route.href) ? "text-white bg-indigo-600" : "text-gray-800 bg-transparent", "text-lg font-medium hover:bg-indigo-500 hover:text-white transition-colors duration-300 w-full text-left px-4 py-2")}
                  >
                    {route.label}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <motion.div
      className="hidden lg:flex items-center justify-center gap-x-4 text-white"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        exit: { opacity: 0 }
      }}
    >
      {navRoutes.map((route) => (
        <motion.div
          key={route.href}
          variants={variants}
        >
          <Link
            href={route.href}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-colors duration-300",
              isActive(route.href) ? "bg-indigo-600 text-white" : "bg-transparent hover:bg-indigo-500 hover:text-white"
            )}
          >
            {route.label}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default Navigation;
