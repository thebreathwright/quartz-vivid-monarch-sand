import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Field" },
  { to: "/train", label: "Train" },
  { to: "/hme", label: "HME" },
  { to: "/log", label: "Log" },
  { to: "/claims", label: "Claims" },
  { to: "/ass001", label: "ASS001" },
  { to: "/safety", label: "Safety" },
  { to: "/bench", label: "Runtime" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <Link to="/" className="block">
            <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">Brudo</p>
            <h1 className="font-display text-xl tracking-tight sm:text-2xl">Respiratory Adaptation</h1>
          </Link>
          <nav className="-mx-1 flex gap-1 overflow-x-auto pb-1">
            {NAV.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : item.to === "/bench"
                    ? ["/bench", "/admit", "/nullifier", "/ledger", "/assays", "/graph"].includes(pathname)
                    : pathname === item.to || pathname.startsWith(item.to + "/");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "min-h-11 shrink-0 rounded-sm px-3 py-2 text-sm transition-colors duration-150",
                    active ? "bg-raised text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
    </div>
  );
}

export function Panel({
  title,
  kicker,
  children,
  className,
}: {
  title: string;
  kicker?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-lg bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5", className)}>
      <header className="mb-4">
        {kicker ? <p className="font-mono text-xs tracking-wider text-muted uppercase">{kicker}</p> : null}
        <h2 className="text-base font-medium tracking-tight">{title}</h2>
      </header>
      {children}
    </section>
  );
}

export function StatusChip({
  tone,
  children,
}: {
  tone: "admit" | "reject" | "hold" | "mute";
  children: ReactNode;
}) {
  const map = {
    admit: "text-admit bg-admit/10",
    reject: "text-reject bg-reject/10",
    hold: "text-hold bg-hold/10",
    mute: "text-muted bg-raised",
  };
  return (
    <span className={cn("inline-flex min-h-7 items-center rounded-sm px-2 font-mono text-xs tabular-nums", map[tone])}>
      {children}
    </span>
  );
}
