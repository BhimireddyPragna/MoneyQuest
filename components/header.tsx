"use client"

import { useState } from "react"
import { useI18n, languageNames } from "@/lib/i18n"
import { useGame, INITIAL_CAPITAL, STREAK_KING_XP_THRESHOLD } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { BookOpen, TrendingUp, Wallet, Globe, Trophy, Menu, Banknote, Crown } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  activeMode: "earn" | "invest"
  setActiveMode: (mode: "earn" | "invest") => void
}

export function Header({ activeMode, setActiveMode }: HeaderProps) {
  const { language, setLanguage, t, availableLanguages } = useI18n()
  const { 
    balance, 
    level, 
    xp, 
    currentStreak, 
    getNetWorth, 
    getWithdrawableAmount, 
    withdrawCash,
    getXpToNextBadge,
    hasStreakKingBadge,
    achievements,
  } = useGame()
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [withdrawSuccess, setWithdrawSuccess] = useState(false)

  const netWorth = getNetWorth()
  const profit = netWorth - INITIAL_CAPITAL
  const withdrawable = getWithdrawableAmount()
  const xpProgress = getXpToNextBadge()
  const hasBadge = hasStreakKingBadge()

  // Get unlocked badges count
  const unlockedBadges = achievements.filter(a => a.unlocked).length

  const handleWithdraw = () => {
    const amount = Number.parseFloat(withdrawAmount)
    if (amount > 0 && amount <= withdrawable && amount <= balance) {
      if (withdrawCash(amount)) {
        setWithdrawSuccess(true)
        setWithdrawAmount("")
        setTimeout(() => {
          setWithdrawSuccess(false)
          setWithdrawOpen(false)
        }, 2000)
      }
    }
  }

  /**
   * Cycle through available languages on click.
   */
  const cycleLanguage = () => {
    const currentIndex = availableLanguages.indexOf(language)
    const nextIndex = (currentIndex + 1) % availableLanguages.length
    setLanguage(availableLanguages[nextIndex])
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo & Brand with XP Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary/60 text-secondary-foreground font-bold text-lg shadow-lg">
              {hasBadge ? <Crown className="h-5 w-5" /> : <span className="text-lg">M</span>}
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-foreground">{t.appName}</h1>
              {hasBadge && (
                <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30 text-xs">
                  {t.streakKing}
                </Badge>
              )}
            </div>
            {/* XP Progress Bar with current/required XP inside */}
            <div className="relative mt-1">
              <Progress 
                value={xpProgress.progress} 
                className={cn(
                  "h-4 w-32",
                  hasBadge && "[&>div]:bg-warning"
                )} 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary-foreground drop-shadow-sm">
                  {xpProgress.current}/{xpProgress.required} XP
                </span>
              </div>
            </div>
            {!hasBadge && (
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {t.nextBadge}: {t.streakKing}
              </p>
            )}
          </div>
        </div>

        {/* Mode Tabs - Desktop */}
        <nav className="hidden md:flex items-center gap-2 bg-muted/50 p-1 rounded-xl">
          <Button
            variant={activeMode === "earn" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveMode("earn")}
            className={cn("gap-2 rounded-lg transition-all", activeMode === "earn" && "shadow-md", activeMode !== "earn" && "bg-transparent")}
          >
            <BookOpen className="h-4 w-4" />
            {t.earnMode}
          </Button>
          <Button
            variant={activeMode === "invest" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveMode("invest")}
            className={cn("gap-2 rounded-lg transition-all", activeMode === "invest" && "shadow-md", activeMode !== "invest" && "bg-transparent")}
          >
            <TrendingUp className="h-4 w-4" />
            {t.investMode}
          </Button>
        </nav>

        {/* Stats & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak - Only show if > 0 */}
          {currentStreak > 0 && (
            <Badge variant="secondary" className="hidden sm:flex gap-1 bg-orange-500/10 text-orange-600 border-orange-500/20">
              🔥 {currentStreak}
            </Badge>
          )}

          {/* Level & Badges */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">{t.level}</span>
              <span className="font-bold text-sm text-foreground">{level}</span>
            </div>
            {unlockedBadges > 0 && (
              <Badge variant="secondary" className="text-xs bg-warning/10 text-warning">
                🏅 {unlockedBadges}
              </Badge>
            )}
          </div>

          {/* Net Worth */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
            <Trophy className="h-4 w-4 text-warning" />
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground">{t.netWorth}</p>
              <p className="font-bold text-sm text-foreground">
                ₹{netWorth.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </p>
            </div>
            {profit !== 0 && (
              <Badge
                variant="secondary"
                className={cn(
                  "text-xs",
                  profit >= 0 ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                )}
              >
                {profit >= 0 ? "+" : ""}
                {((profit / INITIAL_CAPITAL) * 100).toFixed(1)}%
              </Badge>
            )}
          </div>

          {/* Cash Balance with Withdraw */}
          <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors">
                <Wallet className="h-4 w-4 text-primary" />
                <span className="font-bold text-primary text-sm">
                  ₹{balance.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {t.withdrawCash}
                </DialogTitle>
                <DialogDescription>
                  Withdraw your profits! Only amounts above your initial capital (₹{INITIAL_CAPITAL.toLocaleString("en-IN")}) can be withdrawn.
                </DialogDescription>
              </DialogHeader>
              {withdrawSuccess ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <p className="text-xl font-bold text-green-600">{t.withdrawSuccess}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-muted/50 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Net Worth</span>
                      <span className="font-bold text-foreground">₹{netWorth.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Initial Capital</span>
                      <span className="text-foreground">₹{INITIAL_CAPITAL.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-2">
                      <span className="text-muted-foreground font-medium">{t.withdrawableAmount}</span>
                      <span className="font-bold text-primary">₹{withdrawable.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">{t.enterAmount}</label>
                    <Input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="0"
                      className="mt-1 text-lg font-bold"
                      max={Math.min(withdrawable, balance)}
                    />
                  </div>
                  <div className="flex gap-2">
                    {[25, 50, 100].map((percent) => {
                      const amount = Math.floor(Math.min(withdrawable, balance) * (percent / 100))
                      return (
                        <Button
                          key={percent}
                          variant="outline"
                          size="sm"
                          onClick={() => setWithdrawAmount(amount.toString())}
                          disabled={amount <= 0}
                          className="flex-1 bg-transparent"
                        >
                          {percent}%
                        </Button>
                      )
                    })}
                  </div>
                  <Button
                    onClick={handleWithdraw}
                    disabled={!withdrawAmount || Number.parseFloat(withdrawAmount) <= 0 || Number.parseFloat(withdrawAmount) > withdrawable || Number.parseFloat(withdrawAmount) > balance}
                    className="w-full h-12"
                  >
                    <Banknote className="h-4 w-4 mr-2" />
                    {t.withdrawButton}
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Language Toggle - Now cycles through all 4 languages */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 bg-transparent"
              >
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {availableLanguages.map((lang) => (
                <DropdownMenuItem 
                  key={lang} 
                  onClick={() => setLanguage(lang)}
                  className={cn(language === lang && "bg-primary/10 text-primary")}
                >
                  {languageNames[lang]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="h-9 w-9 bg-transparent">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setActiveMode("earn")} className="gap-2">
                <BookOpen className="h-4 w-4" />
                {t.earnMode}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveMode("invest")} className="gap-2">
                <TrendingUp className="h-4 w-4" />
                {t.investMode}
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Trophy className="h-4 w-4" />
                {t.level} {level} | XP: {xp}/{STREAK_KING_XP_THRESHOLD}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
