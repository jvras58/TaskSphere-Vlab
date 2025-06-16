"use client";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import { SheetMenu } from "./sheet-menu";
import { UserNav } from "./user-nav";
import { useSession } from "@/modules/auth/utils/sync-session";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  const path = usePathname();
  const { session } = useSession();

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold hidden md:block text-nowrap">{title}</h1>
        </div>

        <div
          className={`flex items-center space-x-2 justify-end ${
            path !== "/produtos" ? "w-full" : ""
          }`}
        >
          <ModeToggle />
          {session && <UserNav />}
        </div>
      </div>
    </header>
  );
}
