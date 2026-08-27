import { ChevronRight } from "lucide-react"
import { youAreHere } from "@/lib/data"

export function YouAreHere() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {youAreHere.map((item) => (
        <details
          key={item.title}
          className="group rounded-2xl border border-border bg-card p-5 shadow-sm [&_svg]:open:rotate-90"
        >
          <summary className="flex cursor-pointer list-none items-start gap-3">
            <span className="text-2xl" aria-hidden="true">
              {item.emoji}
            </span>
            <span className="flex-1">
              <span className="block font-display font-bold text-foreground">{item.title}</span>
              <span className="mt-0.5 block text-sm text-secondary">{item.question}</span>
            </span>
            <ChevronRight
              className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  )
}
