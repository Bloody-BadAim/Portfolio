"use client";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
  size?: "md" | "lg";
  align?: "left" | "center";
  children?: React.ReactNode;
};

export function SectionHeader({
  kicker,
  title,
  subtitle,
  size = "md",
  align = "left",
  children,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        children ? "md:flex-row md:items-end md:justify-between" : null,
        align === "center" ? "items-center text-center" : "items-start text-left",
      )}
    >
      <div className={cn("space-y-3", align === "center" ? "mx-auto" : null)}>
        {kicker ? (
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
            {kicker}
          </p>
        ) : null}
        <h2
          className={cn(
            "font-display font-semibold",
            size === "lg" ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl sm:text-3xl",
          )}
        >
          {title}
        </h2>
        {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {children ? (
        <div className="mt-4 flex flex-wrap items-center gap-3 md:mt-0">{children}</div>
      ) : null}
    </div>
  );
}
