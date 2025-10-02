// import type { ReactNode } from "react"
// import { cn } from "@/lib/utils"

// export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
//   return <section className={cn("mx-auto w-full max-w-6xl px-4 py-8", className)}>{children}</section>
// }
// components/section.tsx
import { forwardRef, type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("mx-auto w-full max-w-6xl px-4 py-8", className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";
