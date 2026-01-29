"use client"

import { useState, useEffect } from "react"
import { useI18n } from "@/lib/i18n"
import { useGame, type Stock, INITIAL_CAPITAL } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  PieChart,
  Newspaper,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Zap,
  Trophy,
  Target,
  Bot,
  Clock,
  Calendar,
  CalendarDays,
  Sparkles,
  Bitcoin,
} from "lucide-react"
import { BitcoinTrading } from "@/components/bitcoin-trading"
import { cn } from "@/lib/utils"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"

type TimeFilter = "hourly" | "weekly" | "monthly"

export function InvestMode() {
  const { language, t } = useI18n()
  const {
    balance,
    stocks,
    holdings,
    news,
    buyStock,
    sellStock,
    getPortfolioValue,
    getTotalInvested,
    getTotalPL,
    getNetWorth,
    lastTradeResult,
    clearTradeResult,
    getAISuggestion,
    achievements,
  } = useGame()

  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy")
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("hourly")
  const [showTradePopup, setShowTradePopup] = useState(false)
  const [tradeMode, setTradeMode] = useState<"stocks" | "bitcoin">("stocks")

  const portfolioValue = getPortfolioValue()
  const totalInvested = getTotalInvested()
  const totalPL = getTotalPL()
  const totalPLPercent = totalInvested > 0 ? (totalPL / totalInvested) * 100 : 0
  const netWorth = getNetWorth()

  // Show trade popup when trade completes
  useEffect(() => {
    if (lastTradeResult) {
      setShowTradePopup(true)
    }
  }, [lastTradeResult])

  const handleTrade = () => {
    if (!selectedStock) return

    if (tradeType === "buy") {
      buyStock(selectedStock.id, quantity)
    } else {
      sellStock(selectedStock.id, quantity)
    }
    setQuantity(1)
  }

  const closeTradePopup = () => {
    setShowTradePopup(false)
    clearTradeResult()
  }

  const getHolding = (stockId: string) => holdings.find((h) => h.stockId === stockId)

  const getChartData = (stock: Stock) => {
    if (timeFilter === "hourly") {
      return stock.priceHistory.slice(-12).map((h, i) => ({
        time: h.time.split(":")[0] + ":00",
        price: Math.round(h.price),
      }))
    }
    if (timeFilter === "weekly") {
      return Array.from({ length: 7 }, (_, i) => ({
        time: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
        price: Math.round(stock.price * (0.92 + Math.random() * 0.16)),
      }))
    }
    return Array.from({ length: 12 }, (_, i) => ({
      time: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
      price: Math.round(stock.price * (0.85 + Math.random() * 0.3)),
    }))
  }

  const aiSuggestion = selectedStock ? getAISuggestion(selectedStock.id) : null

  return (
    <div className="space-y-6">
      {/* Trade Result Popup */}
      <Dialog open={showTradePopup} onOpenChange={closeTradePopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              {lastTradeResult?.success ? (
                lastTradeResult.type === "buy" ? (
                  <span className="text-green-600">🎉 {t.boughtSuccessfully}</span>
                ) : (
                  <span className="text-blue-600">💰 {t.soldSuccessfully}</span>
                )
              ) : (
                <span className="text-red-600">❌ {t.tradeFailed}</span>
              )}
            </DialogTitle>
            <DialogDescription className="text-center space-y-4 pt-4">
              {lastTradeResult?.success && (
                <div className="space-y-3">
                  <div className="text-4xl">
                    {lastTradeResult.type === "buy" ? "📈" : "💸"}
                  </div>
                  <div className="bg-muted p-4 rounded-xl space-y-2">
                    <p className="font-semibold text-lg text-foreground">
                      {lastTradeResult.quantity} × {lastTradeResult.stockSymbol}
                    </p>
                    <p className="text-muted-foreground">
                      @ ₹{lastTradeResult.price.toLocaleString("en-IN")} each
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      Total: ₹{lastTradeResult.total.toLocaleString("en-IN")}
                    </p>
                    {lastTradeResult.type === "sell" && lastTradeResult.profit !== undefined && (
                      <p className={cn(
                        "font-bold text-lg",
                        lastTradeResult.profit >= 0 ? "text-green-600" : "text-red-600"
                      )}>
                        {lastTradeResult.profit >= 0 ? "📈 Profit" : "📉 Loss"}: 
                        {lastTradeResult.profit >= 0 ? " +" : " "}
                        ₹{lastTradeResult.profit.toLocaleString("en-IN")} 
                        ({lastTradeResult.profitPercent?.toFixed(1)}%)
                      </p>
                    )}
                  </div>
                </div>
              )}
              {!lastTradeResult?.success && (
                <p className="text-muted-foreground">{t.insufficientFunds}</p>
              )}
            </DialogDescription>
          </DialogHeader>
          <Button onClick={closeTradePopup} className="w-full">
            {lastTradeResult?.success ? "🚀 Continue Trading" : "Got it"}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Hero Section with Trade Mode Tabs */}
      <div className="text-center py-2 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground">
          <BarChart3 className="h-4 w-4" />
          <span className="text-sm font-medium">{t.investTitle}</span>
        </div>
        
        {/* Trade Mode Selector */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-xl bg-muted p-1">
            <button
              onClick={() => setTradeMode("stocks")}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all",
                tradeMode === "stocks"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <BarChart3 className="h-4 w-4" />
              {t.stocks}
            </button>
            <button
              onClick={() => setTradeMode("bitcoin")}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all",
                tradeMode === "bitcoin"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Bitcoin className="h-4 w-4" />
              {t.bitcoinTrading}
            </button>
          </div>
        </div>
      </div>

      {/* Bitcoin Trading Section */}
      {tradeMode === "bitcoin" && <BitcoinTrading />}

      {/* Stock Trading Section */}
      {tradeMode === "stocks" && (
        <>
          {/* Portfolio Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-border bg-card overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <PieChart className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-xs">{t.portfolioValue}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  ₹{portfolioValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Target className="h-4 w-4 text-blue-500" />
                  </div>
                  <span className="text-xs">{t.totalInvested}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  ₹{totalInvested.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <div className={cn("p-2 rounded-lg", totalPL >= 0 ? "bg-green-500/10" : "bg-red-500/10")}>
                    {totalPL >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <span className="text-xs">{t.totalPL}</span>
                </div>
                <p className={cn("text-2xl font-bold", totalPL >= 0 ? "text-green-500" : "text-red-500")}>
                  {totalPL >= 0 ? "+" : ""}₹{totalPL.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  <span className="text-sm ml-1">({totalPLPercent >= 0 ? "+" : ""}{totalPLPercent.toFixed(1)}%)</span>
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-primary/5 border-primary/20 overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Wallet className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-xs">{t.availableCash}</span>
                </div>
                <p className="text-2xl font-bold text-primary">
                  ₹{balance.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Stocks List */}
            <div className="lg:col-span-1">
              <Card className="border-border bg-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-foreground flex items-center gap-2 text-lg">
                      📊 {t.stocks}
                    </CardTitle>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                      🟢 Live
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 max-h-[500px] overflow-y-auto">
                  {stocks.map((stock) => {
                    const holding = getHolding(stock.id)
                    return (
                      <button
                        key={stock.id}
                        onClick={() => setSelectedStock(stock)}
                        className={cn(
                          "w-full p-3 rounded-xl border-2 transition-all text-left group",
                          selectedStock?.id === stock.id
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:border-muted-foreground/30 hover:bg-muted/50"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{stock.logo}</div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-foreground text-sm">{stock.symbol}</span>
                                {holding && (
                                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary">
                                    {holding.quantity}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{stock.sector}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-foreground">
                              ₹{stock.price.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                            </p>
                            <div className={cn(
                              "flex items-center justify-end gap-0.5 text-xs font-medium",
                              stock.change >= 0 ? "text-green-500" : "text-red-500"
                            )}>
                              {stock.change >= 0 ? "↑" : "↓"}
                              <span>{Math.abs(stock.changePercent).toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Stock Detail & Trade Panel */}
            <div className="lg:col-span-2 space-y-4">
              {selectedStock ? (
                <>
                  {/* Stock Graph */}
                  <Card className="border-border bg-card overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{selectedStock.logo}</span>
                          <div>
                            <CardTitle className="text-foreground">{selectedStock.symbol}</CardTitle>
                            <CardDescription>{selectedStock.name}</CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-foreground">
                            ₹{selectedStock.price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                          </p>
                          <div className={cn(
                            "flex items-center justify-end gap-1 font-medium",
                            selectedStock.change >= 0 ? "text-green-500" : "text-red-500"
                          )}>
                            {selectedStock.change >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                            <span>{selectedStock.change >= 0 ? "+" : ""}{selectedStock.changePercent.toFixed(2)}%</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {/* Time Filter */}
                      <div className="flex gap-2 mb-4">
                        {[
                          { id: "hourly" as TimeFilter, label: t.hourly, icon: Clock },
                          { id: "weekly" as TimeFilter, label: t.weekly, icon: Calendar },
                          { id: "monthly" as TimeFilter, label: t.monthly, icon: CalendarDays },
                        ].map((filter) => (
                          <Button
                            key={filter.id}
                            variant={timeFilter === filter.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTimeFilter(filter.id)}
                            className={cn("gap-1", timeFilter !== filter.id && "bg-transparent")}
                          >
                            <filter.icon className="h-3 w-3" />
                            {filter.label}
                          </Button>
                        ))}
                      </div>

                      {/* Chart */}
                      <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={getChartData(selectedStock)}>
                            <defs>
                              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={selectedStock.change >= 0 ? "#22c55e" : "#ef4444"} stopOpacity={0.3}/>
                                <stop offset="95%" stopColor={selectedStock.change >= 0 ? "#22c55e" : "#ef4444"} stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                            <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="#a3a3a3" />
                            <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10 }} stroke="#a3a3a3" />
                            <Tooltip 
                              contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e5e5', borderRadius: '8px' }}
                              formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Price"]}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="price" 
                              stroke={selectedStock.change >= 0 ? "#22c55e" : "#ef4444"} 
                              strokeWidth={2}
                              fillOpacity={1} 
                              fill="url(#colorPrice)" 
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      {/* High/Low Stats */}
                      <div className="grid grid-cols-3 gap-4 mt-4 p-3 bg-muted/50 rounded-xl">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">{t.high24h}</p>
                          <p className="font-bold text-green-600">₹{selectedStock.high24h.toLocaleString("en-IN")}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">{t.low24h}</p>
                          <p className="font-bold text-red-600">₹{selectedStock.low24h.toLocaleString("en-IN")}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">{t.trend}</p>
                          <p className={cn("font-bold", selectedStock.change >= 0 ? "text-green-600" : "text-red-600")}>
                            {selectedStock.change >= 0 ? "↑ Bullish" : "↓ Bearish"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Suggestion */}
                  <Card className="border-border bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-blue-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          <Bot className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-foreground">{t.aiSuggestion}</h4>
                            <Badge 
                              variant="secondary" 
                              className={cn(
                                "text-xs",
                                aiSuggestion?.action === "buy" ? "bg-green-500/10 text-green-600" :
                                aiSuggestion?.action === "sell" ? "bg-red-500/10 text-red-600" :
                                "bg-yellow-500/10 text-yellow-600"
                              )}
                            >
                              {aiSuggestion?.action === "buy" ? "🟢 BUY" : 
                               aiSuggestion?.action === "sell" ? "🔴 SELL" : "⏸️ HOLD"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {language === "en" ? aiSuggestion?.reason : aiSuggestion?.reasonHi}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Trade Panel */}
                  <Card className="border-border bg-card">
                    <CardContent className="p-4">
                      <Tabs value={tradeType} onValueChange={(v) => setTradeType(v as "buy" | "sell")}>
                        <TabsList className="grid w-full grid-cols-2 h-12 mb-4">
                          <TabsTrigger
                            value="buy"
                            className="text-base data-[state=active]:bg-green-500 data-[state=active]:text-white"
                          >
                            🟢 {t.buy}
                          </TabsTrigger>
                          <TabsTrigger
                            value="sell"
                            className="text-base data-[state=active]:bg-red-500 data-[state=active]:text-white"
                          >
                            🔴 {t.sell}
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="buy" className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm text-muted-foreground">{t.quantity}</label>
                              <Input
                                type="number"
                                min={1}
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                                className="mt-1 text-lg font-bold"
                              />
                            </div>
                            <div className="flex flex-col justify-end gap-2">
                              <div className="flex gap-2">
                                {[1, 5, 10].map((q) => (
                                  <Button key={q} variant="outline" size="sm" onClick={() => setQuantity(q)} className="flex-1 bg-transparent">
                                    {q}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                            <span className="text-muted-foreground">Total Cost</span>
                            <span className="font-bold text-xl text-foreground">
                              ₹{(selectedStock.price * quantity).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                            </span>
                          </div>
                          <Button
                            className="w-full h-14 text-lg bg-green-500 hover:bg-green-600 text-white"
                            onClick={handleTrade}
                            disabled={selectedStock.price * quantity > balance}
                          >
                            🟢 {t.buy} {selectedStock.symbol}
                          </Button>
                          {selectedStock.price * quantity > balance && (
                            <p className="text-xs text-red-500 text-center">
                              ⚠️ {t.insufficientFunds}! Earn more through quizzes 📚
                            </p>
                          )}
                        </TabsContent>

                        <TabsContent value="sell" className="space-y-4">
                          {(() => {
                            const holding = getHolding(selectedStock.id)
                            return holding ? (
                              <>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm text-muted-foreground">{t.quantity}</label>
                                    <Input
                                      type="number"
                                      min={1}
                                      max={holding.quantity}
                                      value={quantity}
                                      onChange={(e) =>
                                        setQuantity(Math.max(1, Math.min(holding.quantity, Number.parseInt(e.target.value) || 1)))
                                      }
                                      className="mt-1 text-lg font-bold"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Available: {holding.quantity} shares
                                    </p>
                                  </div>
                                  <div className="flex flex-col justify-end gap-2">
                                    <div className="flex gap-2">
                                      {[
                                        { label: "25%", val: Math.ceil(holding.quantity * 0.25) },
                                        { label: "50%", val: Math.ceil(holding.quantity * 0.5) },
                                        { label: "All", val: holding.quantity },
                                      ].map((opt) => (
                                        <Button key={opt.label} variant="outline" size="sm" onClick={() => setQuantity(opt.val)} className="flex-1 bg-transparent">
                                          {opt.label}
                                        </Button>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                                  <span className="text-muted-foreground">Total Value</span>
                                  <span className="font-bold text-xl text-foreground">
                                    ₹{(selectedStock.price * quantity).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                                  </span>
                                </div>
                                {/* P&L Preview */}
                                <div className="p-3 rounded-xl bg-muted/30">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Avg Buy Price</span>
                                    <span className="text-foreground">₹{holding.avgPrice.toFixed(0)}</span>
                                  </div>
                                  <div className="flex justify-between text-sm mt-1">
                                    <span className="text-muted-foreground">Expected P&L</span>
                                    <span className={cn(
                                      "font-bold",
                                      (selectedStock.price - holding.avgPrice) >= 0 ? "text-green-600" : "text-red-600"
                                    )}>
                                      {(selectedStock.price - holding.avgPrice) >= 0 ? "+" : ""}
                                      ₹{((selectedStock.price - holding.avgPrice) * quantity).toFixed(0)}
                                    </span>
                                  </div>
                                </div>
                                <Button
                                  className="w-full h-14 text-lg bg-red-500 hover:bg-red-600 text-white"
                                  onClick={handleTrade}
                                  disabled={quantity > holding.quantity}
                                >
                                  🔴 {t.sell} {selectedStock.symbol}
                                </Button>
                              </>
                            ) : (
                              <div className="text-center py-8 text-muted-foreground">
                                <div className="text-4xl mb-2">📦</div>
                                <p>You don&apos;t own any {selectedStock.symbol}</p>
                                <p className="text-sm mt-1">Buy some shares first!</p>
                              </div>
                            )
                          })()}
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="border-border bg-card h-[400px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-30" />
                    <p className="font-medium text-lg">📊 {t.selectStock}</p>
                    <p className="text-sm mt-1">Pick from the market list to view details</p>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Holdings */}
          {holdings.length > 0 && (
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-foreground flex items-center gap-2">
                  📦 {t.holdings}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {holdings.map((holding) => {
                    const stock = stocks.find((s) => s.id === holding.stockId)
                    if (!stock) return null
                    const currentValue = stock.price * holding.quantity
                    const investedValue = holding.avgPrice * holding.quantity
                    const pl = currentValue - investedValue
                    const plPercent = (pl / investedValue) * 100

                    return (
                      <div
                        key={holding.stockId}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md",
                          pl >= 0 ? "border-green-500/20 bg-green-500/5" : "border-red-500/20 bg-red-500/5"
                        )}
                        onClick={() => setSelectedStock(stock)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{stock.logo}</span>
                            <div>
                              <span className="font-bold text-foreground">{stock.symbol}</span>
                              <p className="text-xs text-muted-foreground">{holding.quantity} shares</p>
                            </div>
                          </div>
                          <Badge className={cn(
                            "font-bold",
                            pl >= 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                          )}>
                            {pl >= 0 ? "↑" : "↓"} {Math.abs(plPercent).toFixed(1)}%
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Invested</p>
                            <p className="font-semibold text-foreground">₹{investedValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-muted-foreground">Current</p>
                            <p className="font-semibold text-foreground">₹{currentValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                          </div>
                        </div>
                        <div className={cn(
                          "mt-2 pt-2 border-t text-center font-bold",
                          pl >= 0 ? "text-green-600 border-green-500/20" : "text-red-600 border-red-500/20"
                        )}>
                          {pl >= 0 ? "📈 +" : "📉 "}₹{pl.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* News Feed */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Newspaper className="h-5 w-5 text-primary" />
                <CardTitle className="text-foreground">{t.newsFeed}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {news.slice(0, 6).map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "p-4 rounded-xl border-l-4",
                      item.impact === "positive"
                        ? "bg-green-500/5 border-green-500"
                        : item.impact === "negative"
                          ? "bg-red-500/5 border-red-500"
                          : "bg-muted/50 border-muted-foreground"
                    )}
                  >
                    <h4 className="font-semibold text-foreground text-sm mb-1">
                      {language === "en" ? item.title : item.titleHi}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {language === "en" ? item.description : item.descriptionHi}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                🏅 {t.achievements}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {achievements.map((achievement) => (
                  <Badge
                    key={achievement.id}
                    variant={achievement.unlocked ? "default" : "secondary"}
                    className={cn(
                      "px-3 py-2 text-sm",
                      achievement.unlocked 
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white" 
                        : "opacity-50"
                    )}
                  >
                    {achievement.icon} {language === "en" ? achievement.title : achievement.titleHi}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
