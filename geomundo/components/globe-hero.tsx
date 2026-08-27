import Image from "next/image"

const chips = [
  { label: "Mapas", emoji: "🗺️", className: "left-0 top-6", delay: "0s" },
  { label: "Planeta", emoji: "🌎", className: "right-2 top-0", delay: "0.8s" },
  { label: "Clima", emoji: "🌦️", className: "-left-2 bottom-16", delay: "1.6s" },
  { label: "Cidades", emoji: "🏙️", className: "right-0 bottom-6", delay: "1.1s" },
  { label: "Biomas", emoji: "🌳", className: "left-16 -bottom-2", delay: "2s" },
]

export function GlobeHero() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* halo */}
      <div className="absolute inset-6 rounded-full bg-gradient-to-br from-primary/20 via-secondary/15 to-sky/20 blur-2xl" />
      {/* orbita */}
      <div
        className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-secondary/30"
        aria-hidden="true"
      />
      <div className="absolute inset-8 flex items-center justify-center">
        <div className="animate-float">
          <Image
            src="/images/geomundo-globe.png"
            alt="Globo terrestre estilizado do GeoMundo com continentes verdes e oceanos azuis"
            width={420}
            height={420}
            priority
            className="drop-shadow-2xl"
          />
        </div>
      </div>

      {chips.map((chip) => (
        <div
          key={chip.label}
          className={`absolute ${chip.className} animate-float`}
          style={{ animationDelay: chip.delay }}
        >
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 shadow-lg">
            <span className="text-lg" aria-hidden="true">
              {chip.emoji}
            </span>
            <span className="text-sm font-semibold text-foreground">{chip.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
