import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Sora } from 'next/font/google'
import './globals.css'
import { ProgressProvider } from '@/lib/progress'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { AchievementToast } from '@/components/achievement-toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' })

export const metadata: Metadata = {
  title: 'GeoMundo — Explore o mundo. Descubra a Geografia.',
  description:
    'Plataforma educacional interativa de Geografia para o Ensino Fundamental II (6º ao 9º ano). Explore mapas, resolva desafios, ganhe XP e desbloqueie conquistas. Sem cadastro.',
  generator: 'v0.app',
  keywords: ['geografia', 'ensino fundamental', 'educação', 'mapas', 'gamificação', 'GeoMundo'],
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#16A34A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body className={`${inter.variable} ${sora.variable} antialiased`}>
        <ProgressProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <AchievementToast />
        </ProgressProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
