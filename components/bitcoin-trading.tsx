"use client"

import { useState, useCallback } from "react"
import { useI18n } from "@/lib/i18n"
import {
  type BitcoinGameState,
  type MinerType,
  createInitialState,
  advancePhase,
  upgradeLearning,
  upgradeElectricity,
  purchaseMiner,
  buyBtc,
  sellBtc,
  skipPhase,
  resetGame,
  clearError,
  calculateFinalScore,
  calculateMiningOutput,
  getTotalPowerUsage,
  getEffectiveElectricity,
  GAME_CONSTANTS,
  MINER_TYPES,
} from "@/lib/bitcoin-game"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Cpu,
  Zap,
  ZapOff,
  TrendingUp,
  TrendingDown,
  BookOpen,
  Pickaxe,
  ArrowRightLeft,
  Calendar,
  Coins,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  RotateCcw,
  Trophy,
  GraduationCap,
  Building,
  ScrollText,
  Wrench,
  Bitcoin,
} from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Bitcoin Learning Game Component
 * 
 * An educational simulation teaching Bitcoin mining, trading, and electricity management.
 * Turn-based gameplay with 10 rounds following a strict phase order.
 */
export function BitcoinTrading() {
  const { language, t } = useI18n()
  const [gameState, setGameState] = useState<BitcoinGameState>(createInitialState)
  const [tradeAmount, setTradeAmount] = useState<string>("0.1")
  const [showEventDialog, setShowEventDialog] = useState(false)

  // Game action handlers with state updates
  const handleAction = useCallback((action: (state: BitcoinGameState) => BitcoinGameState) => {
    setGameState(prev => action(prev))
  }, [])

  const handleAdvancePhase = useCallback(() => {
    setGameState(prev => {
      const newState = advancePhase(prev)
      // Show event dialog when entering event phase
      if (newState.currentPhase === "event" && newState.currentEvent) {
        setShowEventDialog(true)
      }
      return newState
    })
  }, [])

  const handleResetGame = useCallback(() => {
    setGameState(resetGame())
  }, [])

  const handleBuyBtc = useCallback(() => {
    const amount = Number.parseFloat(tradeAmount)
    if (!Number.isNaN(amount) && amount > 0) {
      handleAction(state => buyBtc(state, amount))
    }
  }, [tradeAmount, handleAction])

  const handleSellBtc = useCallback(() => {
    const amount = Number.parseFloat(tradeAmount)
    if (!Number.isNaN(amount) && amount > 0) {
      handleAction(state => sellBtc(state, amount))
    }
  }, [tradeAmount, handleAction])

  const handlePurchaseMiner = useCallback((type: MinerType) => {
    handleAction(state => purchaseMiner(state, type))
  }, [handleAction])

  // Get localized event text
  const getEventText = (key: "title" | "description") => {
    if (!gameState.currentEvent) return ""
    const langKey = key + (language === "en" ? "" : language.charAt(0).toUpperCase() + language.slice(1))
    return (gameState.currentEvent as Record<string, string>)[langKey] || (gameState.currentEvent as Record<string, string>)[key]
  }

  // Get event icon component
  const getEventIcon = () => {
    if (!gameState.currentEvent) return <AlertCircle className="h-8 w-8" />
    switch (gameState.currentEvent.icon) {
      case "chart-up": return <TrendingUp className="h-8 w-8 text-green-500" />
      case "chart-down": return <TrendingDown className="h-8 w-8 text-red-500" />
      case "cpu": return <Cpu className="h-8 w-8 text-blue-500" />
      case "wrench": return <Wrench className="h-8 w-8 text-orange-500" />
      case "zap": return <Zap className="h-8 w-8 text-yellow-500" />
      case "zap-off": return <ZapOff className="h-8 w-8 text-muted-foreground" />
      case "building": return <Building className="h-8 w-8 text-primary" />
      case "scroll": return <ScrollText className="h-8 w-8 text-amber-500" />
      default: return <AlertCircle className="h-8 w-8" />
    }
  }

  // Phase display info
  const phases = [
    { id: "learn", icon: BookOpen, label: "Learn" },
    { id: "mine", icon: Pickaxe, label: "Mine" },
    { id: "trade", icon: ArrowRightLeft, label: "Trade" },
    { id: "event", icon: Calendar, label: "Event" },
    { id: "costs", icon: Coins, label: "Costs" },
  ]

  const currentMiningOutput = calculateMiningOutput(gameState)
  const totalPowerUsage = getTotalPowerUsage(gameState.miners)
  const effectiveCapacity = getEffectiveElectricity(gameState)

  // Game Over Screen
  if (gameState.isGameOver) {
    const finalScore = calculateFinalScore(gameState)
    return (
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-amber-500/5">
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/10">
              <Trophy className="h-16 w-16 text-primary" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Game Complete!</h2>
            <p className="text-muted-foreground">You completed all 10 school years</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground">Final Coins</p>
              <p className="text-2xl font-bold text-foreground">{gameState.coins.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground">Final EduBTC</p>
              <p className="text-2xl font-bold text-amber-500">{gameState.eduBtc.toFixed(3)}</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground">BTC Price</p>
              <p className="text-2xl font-bold text-foreground">{gameState.btcPrice.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-amber-500/10 border border-primary/20">
            <p className="text-lg text-muted-foreground mb-2">Final Score</p>
            <p className="text-5xl font-bold text-primary">{finalScore.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-2">Coins + (EduBTC x BTC Price)</p>
          </div>
          
          <Button size="lg" onClick={handleResetGame} className="gap-2">
            <RotateCcw className="h-5 w-5" />
            Play Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Event Dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              {getEventIcon()}
              <span>{getEventText("title")}</span>
            </DialogTitle>
            <DialogDescription className="pt-4">
              {getEventText("description")}
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowEventDialog(false)} className="w-full">
            Continue
          </Button>
        </DialogContent>
      </Dialog>

      {/* Error Display */}
      {gameState.errorMessage && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm">{gameState.errorMessage}</p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleAction(clearError)}
            className="ml-auto"
          >
            Dismiss
          </Button>
        </div>
      )}

      {/* Game Header - Round & Phase Progress */}
      <Card className="border-border bg-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Bitcoin className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-foreground">Bitcoin Learning Game</h2>
                <p className="text-sm text-muted-foreground">Educational Simulation</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-1">
              Round {gameState.currentRound} / {GAME_CONSTANTS.TOTAL_ROUNDS}
            </Badge>
          </div>
          
          {/* Phase Progress Bar */}
          <div className="flex items-center gap-2">
            {phases.map((phase, index) => {
              const isActive = phase.id === gameState.currentPhase
              const isPast = phases.findIndex(p => p.id === gameState.currentPhase) > index
              return (
                <div key={phase.id} className="flex-1 flex items-center">
                  <div 
                    className={cn(
                      "flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-xs font-medium transition-all",
                      isActive && "bg-primary text-primary-foreground",
                      isPast && "bg-primary/20 text-primary",
                      !isActive && !isPast && "bg-muted text-muted-foreground"
                    )}
                  >
                    <phase.icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{phase.label}</span>
                  </div>
                  {index < phases.length - 1 && (
                    <ChevronRight className={cn(
                      "h-4 w-4 mx-1",
                      isPast ? "text-primary" : "text-muted-foreground/30"
                    )} />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Resource Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Coins className="h-4 w-4 text-amber-500" />
              <span className="text-xs">Coins</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {gameState.coins.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Bitcoin className="h-4 w-4 text-amber-500" />
              <span className="text-xs">EduBTC</span>
            </div>
            <p className="text-2xl font-bold text-amber-500">
              {gameState.eduBtc.toFixed(3)}
              <span className="text-sm text-muted-foreground ml-1">/ {GAME_CONSTANTS.MAX_EDUBTC_HOLDING}</span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-xs">BTC Price</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {gameState.btcPrice.toLocaleString()}
              <span className="text-sm text-muted-foreground ml-1">CC</span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-xs">Power</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {totalPowerUsage}
              <span className="text-sm text-muted-foreground ml-1">/ {effectiveCapacity}</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Phase Content */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {gameState.currentPhase === "learn" && <BookOpen className="h-5 w-5 text-primary" />}
            {gameState.currentPhase === "mine" && <Pickaxe className="h-5 w-5 text-amber-500" />}
            {gameState.currentPhase === "trade" && <ArrowRightLeft className="h-5 w-5 text-green-500" />}
            {gameState.currentPhase === "event" && <Calendar className="h-5 w-5 text-blue-500" />}
            {gameState.currentPhase === "costs" && <Coins className="h-5 w-5 text-red-500" />}
            <span className="capitalize">{gameState.currentPhase} Phase</span>
          </CardTitle>
          <CardDescription>
            {gameState.currentPhase === "learn" && "Upgrade your knowledge, electricity, or purchase a miner"}
            {gameState.currentPhase === "mine" && "Your miners are working. Review your mining operation."}
            {gameState.currentPhase === "trade" && "Buy or sell EduBTC at the current market price"}
            {gameState.currentPhase === "event" && "A random event has occurred this round"}
            {gameState.currentPhase === "costs" && "Review and pay operational costs"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* LEARN PHASE */}
          {gameState.currentPhase === "learn" && (
            <div className="space-y-6">
              {/* Learning Level Upgrade */}
              <div className="p-4 rounded-xl border border-border bg-muted/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span className="font-medium">Learning Level</span>
                  </div>
                  <Badge variant="secondary">
                    Level {gameState.learningLevel} / {GAME_CONSTANTS.MAX_LEARNING_LEVEL}
                  </Badge>
                </div>
                <Progress 
                  value={(gameState.learningLevel / GAME_CONSTANTS.MAX_LEARNING_LEVEL) * 100} 
                  className="h-2 mb-3"
                />
                <Button
                  onClick={() => handleAction(upgradeLearning)}
                  disabled={
                    gameState.learnActionUsedThisRound ||
                    gameState.learningLevel >= GAME_CONSTANTS.MAX_LEARNING_LEVEL ||
                    gameState.coins < GAME_CONSTANTS.LEARNING_UPGRADE_COST
                  }
                  className="w-full gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  Upgrade Learning ({GAME_CONSTANTS.LEARNING_UPGRADE_COST.toLocaleString()} Coins)
                </Button>
              </div>

              {/* Electricity Upgrade */}
              <div className="p-4 rounded-xl border border-border bg-muted/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Electricity Capacity</span>
                  </div>
                  <Badge variant="secondary">
                    {gameState.electricityCapacity} / {GAME_CONSTANTS.MAX_ELECTRICITY_CAPACITY} units
                  </Badge>
                </div>
                <Progress 
                  value={(gameState.electricityCapacity / GAME_CONSTANTS.MAX_ELECTRICITY_CAPACITY) * 100} 
                  className="h-2 mb-3"
                />
                <Button
                  onClick={() => handleAction(upgradeElectricity)}
                  disabled={
                    gameState.learnActionUsedThisRound ||
                    gameState.electricityCapacity >= GAME_CONSTANTS.MAX_ELECTRICITY_CAPACITY ||
                    gameState.coins < GAME_CONSTANTS.POWER_UPGRADE_COST
                  }
                  variant="outline"
                  className="w-full gap-2 bg-transparent"
                >
                  <Zap className="h-4 w-4" />
                  Upgrade Power ({GAME_CONSTANTS.POWER_UPGRADE_COST.toLocaleString()} Coins)
                </Button>
              </div>

              {/* Purchase Miner */}
              <div className="p-4 rounded-xl border border-border bg-muted/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Purchase Miner</span>
                  </div>
                  <Badge variant="secondary">
                    {gameState.miners.length} / {GAME_CONSTANTS.MAX_MINERS} miners
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {(["basic", "advanced", "smart"] as MinerType[]).map((type) => {
                    const miner = MINER_TYPES[type]
                    const canAfford = gameState.coins >= miner.cost
                    const canPurchase = !gameState.minerPurchasedThisRound && 
                      gameState.miners.length < GAME_CONSTANTS.MAX_MINERS &&
                      !gameState.learnActionUsedThisRound
                    return (
                      <button
                        key={type}
                        onClick={() => handlePurchaseMiner(type)}
                        disabled={!canAfford || !canPurchase}
                        className={cn(
                          "p-3 rounded-xl border-2 transition-all text-center",
                          canAfford && canPurchase
                            ? "border-border hover:border-primary/50 hover:bg-primary/5"
                            : "border-muted opacity-50 cursor-not-allowed"
                        )}
                      >
                        <Cpu className={cn(
                          "h-6 w-6 mx-auto mb-2",
                          type === "basic" && "text-muted-foreground",
                          type === "advanced" && "text-blue-500",
                          type === "smart" && "text-primary"
                        )} />
                        <p className="font-medium text-sm capitalize">{type}</p>
                        <p className="text-xs text-muted-foreground">{miner.btcPerRound} BTC/round</p>
                        <p className="text-xs text-muted-foreground">{miner.powerUsage} power</p>
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {miner.cost.toLocaleString()} Coins
                        </Badge>
                      </button>
                    )
                  })}
                </div>
              </div>

              {gameState.learnActionUsedThisRound && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Action completed for this round</span>
                </div>
              )}
            </div>
          )}

          {/* MINE PHASE */}
          {gameState.currentPhase === "mine" && (
            <div className="space-y-4">
              {gameState.miningDisabledNextRound && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">Mining disabled this round due to unpaid costs</span>
                </div>
              )}
              
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Mining Output This Round</span>
                  <span className="text-2xl font-bold text-amber-500">
                    +{currentMiningOutput.toFixed(3)} EduBTC
                  </span>
                </div>
              </div>

              <div className="grid gap-3">
                {gameState.miners.map((miner, index) => (
                  <div 
                    key={miner.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl border",
                      miner.isActive ? "border-border bg-card" : "border-muted bg-muted/30 opacity-60"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Cpu className={cn(
                        "h-8 w-8",
                        miner.type === "basic" && "text-muted-foreground",
                        miner.type === "advanced" && "text-blue-500",
                        miner.type === "smart" && "text-primary"
                      )} />
                      <div>
                        <p className="font-medium">{miner.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {miner.btcPerRound} BTC/round | {miner.powerUsage} power
                        </p>
                      </div>
                    </div>
                    <Badge variant={miner.isActive ? "default" : "secondary"}>
                      {miner.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TRADE PHASE */}
          {gameState.currentPhase === "trade" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Current BTC Price</span>
                  <span className="text-2xl font-bold text-foreground">
                    {gameState.btcPrice.toLocaleString()} Coins
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Trading limits: {GAME_CONSTANTS.MAX_TRADE_PER_ROUND} BTC max per action</span>
                  <span>Holding: {gameState.eduBtc.toFixed(3)} / {GAME_CONSTANTS.MAX_EDUBTC_HOLDING} BTC</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Input
                  type="text"
                  inputMode="decimal"
                  value={tradeAmount}
                  onChange={(e) => {
                    // Allow any numeric input - validation happens in logic
                    const value = e.target.value
                    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
                      setTradeAmount(value)
                    }
                  }}
                  className="flex-1"
                  placeholder="Amount (e.g., 0.1)"
                />
                <div className="flex gap-2">
                  {[0.1, 0.25, 0.5].map((amt) => (
                    <Button
                      key={amt}
                      variant="outline"
                      size="sm"
                      onClick={() => setTradeAmount(amt.toString())}
                      className="bg-transparent"
                    >
                      {amt}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={handleBuyBtc}
                  disabled={
                    Number.parseFloat(tradeAmount) <= 0 ||
                    Number.parseFloat(tradeAmount) > GAME_CONSTANTS.MAX_TRADE_PER_ROUND - gameState.btcBoughtThisRound ||
                    gameState.eduBtc + Number.parseFloat(tradeAmount) > GAME_CONSTANTS.MAX_EDUBTC_HOLDING ||
                    Number.parseFloat(tradeAmount) * gameState.btcPrice > gameState.coins
                  }
                  className="h-14 bg-green-600 hover:bg-green-700 gap-2"
                >
                  <TrendingUp className="h-5 w-5" />
                  Buy EduBTC
                  <span className="text-xs opacity-80">
                    ({(Number.parseFloat(tradeAmount || "0") * gameState.btcPrice).toLocaleString()} Coins)
                  </span>
                </Button>
                <Button
                  onClick={handleSellBtc}
                  disabled={
                    Number.parseFloat(tradeAmount) <= 0 ||
                    Number.parseFloat(tradeAmount) > GAME_CONSTANTS.MAX_TRADE_PER_ROUND - gameState.btcSoldThisRound ||
                    Number.parseFloat(tradeAmount) > gameState.eduBtc
                  }
                  variant="outline"
                  className="h-14 border-red-500 text-red-500 hover:bg-red-500/10 gap-2 bg-transparent"
                >
                  <TrendingDown className="h-5 w-5" />
                  Sell EduBTC
                  <span className="text-xs opacity-80">
                    (+{(Number.parseFloat(tradeAmount || "0") * gameState.btcPrice).toLocaleString()} Coins)
                  </span>
                </Button>
              </div>

              <div className="text-sm text-muted-foreground text-center">
                Bought: {gameState.btcBoughtThisRound.toFixed(2)} | Sold: {gameState.btcSoldThisRound.toFixed(2)} this round
              </div>
            </div>
          )}

          {/* EVENT PHASE */}
          {gameState.currentPhase === "event" && gameState.currentEvent && (
            <div className="p-6 rounded-xl bg-muted/50 border border-border text-center">
              <div className="flex justify-center mb-4">
                {getEventIcon()}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {getEventText("title")}
              </h3>
              <p className="text-muted-foreground">
                {getEventText("description")}
              </p>
              <Badge 
                variant="secondary" 
                className={cn(
                  "mt-4",
                  gameState.currentEvent.modifier > 1 && "bg-green-500/10 text-green-600",
                  gameState.currentEvent.modifier < 1 && gameState.currentEvent.effect !== "electricity" && "bg-red-500/10 text-red-600",
                  gameState.currentEvent.modifier < 0 && "bg-red-500/10 text-red-600",
                  gameState.currentEvent.modifier > 0 && gameState.currentEvent.effect === "electricity" && "bg-green-500/10 text-green-600"
                )}
              >
                {gameState.currentEvent.effect === "electricity"
                  ? `${gameState.currentEvent.modifier > 0 ? "+" : ""}${gameState.currentEvent.modifier} power unit`
                  : `${((gameState.currentEvent.modifier - 1) * 100).toFixed(0)}% effect`}
              </Badge>
            </div>
          )}

          {/* COSTS PHASE */}
          {gameState.currentPhase === "costs" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">Electricity Cost</span>
                  <span className="font-medium">
                    {totalPowerUsage} units x {GAME_CONSTANTS.ELECTRICITY_COST_PER_UNIT} Coins = {(totalPowerUsage * GAME_CONSTANTS.ELECTRICITY_COST_PER_UNIT).toLocaleString()} Coins
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">Miner Maintenance</span>
                  <span className="font-medium">
                    {gameState.miners.length} miners x {GAME_CONSTANTS.MINER_MAINTENANCE_COST} Coins = {(gameState.miners.length * GAME_CONSTANTS.MINER_MAINTENANCE_COST).toLocaleString()} Coins
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <span className="font-medium text-foreground">Total Costs</span>
                  <span className="text-xl font-bold text-primary">
                    {(totalPowerUsage * GAME_CONSTANTS.ELECTRICITY_COST_PER_UNIT + gameState.miners.length * GAME_CONSTANTS.MINER_MAINTENANCE_COST).toLocaleString()} Coins
                  </span>
                </div>
              </div>
              
              {gameState.miningDisabledNextRound && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">Cannot pay costs - Mining will be disabled next round</span>
                </div>
              )}
            </div>
          )}

          {/* Phase Navigation */}
          <div className="flex gap-3 pt-4 border-t border-border">
            {gameState.currentPhase === "trade" && (
              <Button
                variant="outline"
                onClick={() => handleAction(skipPhase)}
                className="flex-1 bg-transparent"
              >
                Skip Trading
              </Button>
            )}
            <Button
              onClick={handleAdvancePhase}
              className="flex-1 gap-2"
            >
              {gameState.currentPhase === "costs" 
                ? (gameState.currentRound >= GAME_CONSTANTS.TOTAL_ROUNDS ? "Finish Game" : "Next Round")
                : "Continue"
              }
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Round History */}
      {gameState.roundHistory.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base">Round History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {gameState.roundHistory.slice().reverse().map((round) => (
                <div 
                  key={round.round}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/50 text-sm"
                >
                  <span className="font-medium">Round {round.round}</span>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span>+{round.btcMined.toFixed(3)} BTC</span>
                    <span>-{round.costsPaid.toLocaleString()} Coins</span>
                    {round.event && (
                      <Badge variant="secondary" className="text-xs">
                        {round.event.effect}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
