"use client"

import { useI18n } from "@/lib/i18n"
import { INITIAL_CAPITAL } from "@/lib/store"
import { Gamepad2 } from "lucide-react"

/**
 * Disclaimer component for the educational game.
 * Displays a clean, minimal notice about the simulation nature of the app.
 */
export function Disclaimer() {
  const { t } = useI18n()

  return (
    <div className="bg-muted/50 border border-border rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Gamepad2 className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground text-sm">
            {t.disclaimer}
          </h3>
          <p className="text-xs text-muted-foreground">
            {t.disclaimerText} {t.initialCapital}: ₹{INITIAL_CAPITAL.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  )
}
