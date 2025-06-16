import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="ml-auto flex items-center gap-4 md:gap-6">
      <Link href="/dashboard" className="text-sm font-medium text-foreground hover:text-primary">
        Dashboard
      </Link>
      <Link href="#" className="text-sm font-medium text-foreground hover:text-primary">
        Relatórios
      </Link>
      <Button className="rounded-full bg-primary hover-primary">Nova Projeto</Button>
      <ModeToggle />
    </nav>
  );
}