"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n"
import { useGame, INITIAL_CAPITAL, STREAK_KING_XP_THRESHOLD } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Wallet, Target, Flame, Trophy, Banknote, Sparkles, TrendingUp, ArrowDownToLine, Crown } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * WalletStats component displays the user's financial statistics,
 * quiz performance, and provides withdrawal functionality.
 */
export function WalletStats() {
  const { t } = useI18n()
  const {
    balance,
    questionsAnswered,
    correctAnswers,
    currentStreak,
    bestStreak,
    withdrawnCash,
    withdrawCash,
    getWithdrawableAmount,
    getNetWorth,
    xp,
    hasStreakKingBadge,
    getXpToNextBadge,
  } = useGame()

  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const accuracy = questionsAnswered > 0 ? Math.round((correctAnswers / questionsAnswered) * 100) : 0
  const withdrawable = getWithdrawableAmount()
  const netWorth = getNetWorth()
  const profit = netWorth - INITIAL_CAPITAL
  const hasBadge = hasStreakKingBadge()
  const xpProgress = getXpToNextBadge()

  const handleWithdraw = () => {
    const amount = Number.parseFloat(withdrawAmount)
    if (amount > 0 && withdrawCash(amount)) {
      setShowSuccess(true)
      setWithdrawAmount("")
      setTimeout(() => {
        setShowSuccess(false)
        setDialogOpen(false)
      }, 2000)
    }
  }

  const stats = [
    {
      icon: Wallet,
      label: t.virtualBalance,
      value: `₹${balance.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Trophy,
      label: t.netWorth,
      value: `₹${netWorth.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
      color: profit >= 0 ? "text-primary" : "text-destructive",
      bg: profit >= 0 ? "bg-primary/10" : "bg-destructive/10",
      badge: profit !== 0 ? `${profit >= 0 ? "+" : ""}${((profit / INITIAL_CAPITAL) * 100).toFixed(1)}%` : undefined,
      badgeColor: profit >= 0 ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive",
    },
    {
      icon: Target,
      label: t.accuracy,
      value: `${accuracy}%`,
      color: accuracy >= 70 ? "text-primary" : accuracy >= 40 ? "text-warning" : "text-destructive",
      bg: accuracy >= 70 ? "bg-primary/10" : accuracy >= 40 ? "bg-warning/10" : "bg-destructive/10",
    },
    {
      icon: Flame,
      label: t.streak,
      value: currentStreak.toString(),
      color: "text-destructive",
      bg: "bg-destructive/10",
      badge: bestStreak > 0 ? `Best: ${bestStreak}` : undefined,
      badgeColor: "bg-warning/20 text-warning",
    },
  ]

  return (
    <div className="space-y-4">
      {/* XP Progress Card - Shows progress to Streak King badge */}
      <Card className="border-border bg-card overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {hasBadge ? (
                <Crown className="h-5 w-5 text-warning" />
              ) : (
                <Sparkles className="h-5 w-5 text-primary" />
              )}
              <span className="font-semibold text-foreground">
                {hasBadge ? t.streakKing : t.xpProgress}
              </span>
            </div>
            {hasBadge && (
              <Badge className="bg-warning/20 text-warning border-warning/30">
                {t.badgeEarned}
              </Badge>
            )}
          </div>
          
          <div className="relative">
            <Progress 
              value={xpProgress.progress} 
              className={cn(
                "h-6",
                hasBadge && "[&>div]:bg-warning"
              )} 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground drop-shadow-sm">
                {xpProgress.current} / {xpProgress.required} XP
              </span>
            </div>
          </div>
          
          {!hasBadge && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {t.nextBadge}: {t.streakKing} ({STREAK_KING_XP_THRESHOLD - xp} XP remaining)
            </p>
          )}
        </CardContent>
      </Card>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border bg-card overflow-hidden group hover:shadow-lg transition-all">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className={cn("p-2 rounded-lg", stat.bg)}>
                  <stat.icon className={cn("h-4 w-4", stat.color)} />
                </div>
                {stat.badge && (
                  <Badge variant="secondary" className={cn("text-xs", stat.badgeColor)}>
                    {stat.badge}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className={cn("text-xl font-bold", stat.color)}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Withdraw Section */}
      <Card className="border-border bg-gradient-to-r from-primary/5 to-primary/10 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/20">
                <Banknote className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t.withdrawableCash}</p>
                <p className="text-2xl font-bold text-primary">
                  ₹{withdrawable.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </p>
                {withdrawnCash > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {t.withdrawnTotal}: ₹{withdrawnCash.toLocaleString("en-IN")}
                  </p>
                )}
              </div>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  disabled={withdrawable <= 0}
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  <ArrowDownToLine className="h-4 w-4" />
                  {t.withdraw}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    {t.withdrawCash}
                  </DialogTitle>
                  <DialogDescription>
                    {t.withdrawableAmount}: ₹{withdrawable.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </DialogDescription>
                </DialogHeader>

                {showSuccess ? (
                  <div className="py-8 text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 mb-4">
                      <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                    </div>
                    <p className="text-lg font-bold text-primary">{t.withdrawSuccess}</p>
                  </div>
                ) : (
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">{t.enterAmount}</label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        max={withdrawable}
                        className="text-lg font-bold"
                      />
                    </div>

                    <div className="flex gap-2">
                      {[25, 50, 75, 100].map((percent) => (
                        <Button
                          key={percent}
                          variant="outline"
                          size="sm"
                          onClick={() => setWithdrawAmount(Math.floor(withdrawable * (percent / 100)).toString())}
                          className="flex-1 bg-transparent"
                        >
                          {percent}%
                        </Button>
                      ))}
                    </div>

                    <Button
                      onClick={handleWithdraw}
                      disabled={!withdrawAmount || Number.parseFloat(withdrawAmount) <= 0 || Number.parseFloat(withdrawAmount) > withdrawable}
                      className="w-full gap-2"
                    >
                      <TrendingUp className="h-4 w-4" />
                      {t.withdrawButton}
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>

          {withdrawable <= 0 && (
            <p className="text-xs text-muted-foreground mt-3 text-center sm:text-left">
              Grow your net worth above ₹{INITIAL_CAPITAL.toLocaleString("en-IN")} to unlock withdrawals!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
