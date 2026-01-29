"use client"

import { useState } from "react"
import { I18nProvider, useI18n } from "@/lib/i18n"
import { GameProvider, INITIAL_CAPITAL } from "@/lib/store"
import { Header } from "@/components/header"
import { EarnMode } from "@/components/earn-mode"
import { InvestMode } from "@/components/invest-mode"
import { Disclaimer } from "@/components/disclaimer"

/**
 * Main app content component.
 * Handles mode switching between Quiz and Trade modes.
 */
function AppContent() {
  const [activeMode, setActiveMode] = useState<"earn" | "invest">("earn")
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <Header activeMode={activeMode} setActiveMode={setActiveMode} />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <Disclaimer />

        {activeMode === "earn" ? <EarnMode /> : <InvestMode />}
      </main>

      <footer className="border-t border-border bg-card/50 mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-primary font-bold">M</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">{t.appName}</p>
                <p className="text-xs text-muted-foreground">{t.disclaimer}</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                {t.initialCapital}: ₹{INITIAL_CAPITAL.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

/**
 * Root page component with providers.
 * Wraps the app with I18n and Game state providers.
 */
export default function Home() {
  return (
    <I18nProvider>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </I18nProvider>
  )
}
