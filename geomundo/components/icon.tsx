import {
  Building2,
  CloudRain,
  Compass,
  Droplets,
  Flag,
  Globe,
  Map,
  Mountain,
  Network,
  Recycle,
  Trees,
  Users,
  Waves,
  Wheat,
  type LucideProps,
} from "lucide-react"
import type { IconKey } from "@/lib/data"

const map: Record<IconKey, React.ComponentType<LucideProps>> = {
  compass: Compass,
  globe: Globe,
  mountain: Mountain,
  "cloud-rain": CloudRain,
  trees: Trees,
  users: Users,
  building: Building2,
  wheat: Wheat,
  network: Network,
  recycle: Recycle,
  brazil: Flag,
  map: Map,
  waves: Waves,
  droplets: Droplets,
}

export function TerritoryIcon({ name, ...props }: { name: IconKey } & LucideProps) {
  const Cmp = map[name] ?? Globe
  return <Cmp {...props} />
}
