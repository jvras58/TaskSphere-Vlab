import { Navbar } from "./navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ContentLayout({
  title,
  children,
  className = "container pt-8 pb-8 px-4 sm:px-8",
}: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} />
      <div className={className}>{children}</div>
    </div>
  );
}
