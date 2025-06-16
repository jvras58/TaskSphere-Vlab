
import Navbar from "./Navbar";
import Link from "next/link"
import { LogoComponent } from "./logo-component";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <LogoComponent />
          </Link>
        </div>
        <Navbar />
      </div>
    </header>
  );
}