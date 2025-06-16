"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UseQueryProviders } from "./queryProviders";


export function RootAppProvider({ children }: PropsWithChildren) {
  return (
    <NuqsAdapter>
      <UseQueryProviders>
        <TooltipProvider delayDuration={120}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TooltipProvider>
      </UseQueryProviders>
    </NuqsAdapter>
  );
}
