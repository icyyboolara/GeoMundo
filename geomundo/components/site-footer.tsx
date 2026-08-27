import Link from "next/link"
import { Globe } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-extrabold">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Globe className="size-4" aria-hidden="true" />
            </span>
            GEO<span className="-ml-2 text-primary">MUNDO</span>
          </div>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground text-pretty">
            Explore o mundo. Descubra a Geografia. Uma jornada de aprendizado para o Ensino Fundamental II.
          </p>
        </div>
        <nav aria-label="Links do rodapé" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/explorar" className="text-muted-foreground hover:text-primary">
            Explorar
          </Link>
          <Link href="/conteudos" className="text-muted-foreground hover:text-primary">
            Conteúdos
          </Link>
          <Link href="/geolab" className="text-muted-foreground hover:text-primary">
            GeoLab
          </Link>
          <Link href="/progresso" className="text-muted-foreground hover:text-primary">
            Meu progresso
          </Link>
        </nav>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        Sem cadastro, sem login. Seu progresso fica salvo apenas neste navegador.
      </div>
    </footer>
  )
}
