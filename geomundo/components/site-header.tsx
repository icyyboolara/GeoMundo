"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Globe, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useProgress } from "@/lib/progress"
import { getLevel } from "@/lib/data"

const nav = [
  { href: "/", label: "Início" },
  { href: "/explorar", label: "Explorar" },
  { href: "/conteudos", label: "Conteúdos" },
  { href: "/desafios", label: "Desafios" },
  { href: "/geolab", label: "GeoLab" },
  { href: "/mapas", label: "Mapas" },
  { href: "/conquistas", label: "Conquistas" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { xp, ready } = useProgress()
  const level = getLevel(xp)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-extrabold text-foreground">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Globe className="size-5" aria-hidden="true" />
          </span>
          <span>
            GEO<span className="text-primary">MUNDO</span>
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/progresso"
            className="hidden items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:border-primary sm:flex"
            aria-label={`Seu progresso: nível ${level.name}, ${xp} XP`}
          >
            <span aria-hidden="true">{level.emoji}</span>
            <span className="tabular-nums">{ready ? xp : 0} XP</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-lg border border-border text-foreground lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Navegação mobile" className="border-t border-border bg-card lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-3">
            {[...nav, { href: "/progresso", label: "Meu progresso" }].map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-3 text-base font-medium",
                      active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </header>
  )
}
