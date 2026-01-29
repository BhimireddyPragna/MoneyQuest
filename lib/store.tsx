"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

export const INITIAL_CAPITAL = 100000

/**
 * XP required for the "Streak King" badge.
 * This is a key milestone that rewards consistent quiz performance.
 */
export const STREAK_KING_XP_THRESHOLD = 1000

export interface Stock {
  id: string
  name: string
  symbol: string
  price: number
  previousPrice: number
  change: number
  changePercent: number
  sector: string
  logo: string
  priceHistory: { time: string; price: number }[]
  high24h: number
  low24h: number
}

export interface Holding {
  stockId: string
  quantity: number
  avgPrice: number
}

export interface NewsItem {
  id: string
  title: string
  titleHi: string
  description: string
  descriptionHi: string
  impact: "positive" | "negative" | "neutral"
  affectedStocks: string[]
  timestamp: Date
}

export interface Achievement {
  id: string
  title: string
  titleHi: string
  titleTe: string
  titleOr: string
  description: string
  descriptionHi: string
  descriptionTe: string
  descriptionOr: string
  icon: string
  unlocked: boolean
  unlockedAt?: Date
  /** XP threshold required to unlock this badge (if applicable) */
  xpThreshold?: number
}

export interface TradeResult {
  success: boolean
  type: "buy" | "sell"
  stockSymbol: string
  quantity: number
  price: number
  total: number
  profit?: number
  profitPercent?: number
}

/**
 * Quiz session statistics for tracking performance.
 * Tracks attempted, correct, wrong, and unanswered questions.
 */
export interface QuizStats {
  attempted: number
  correct: number
  wrong: number
  unanswered: number
}

interface GameState {
  balance: number
  withdrawnCash: number
  totalEarned: number
  questionsAnswered: number
  correctAnswers: number
  wrongAnswers: number
  unansweredQuestions: number
  currentStreak: number
  bestStreak: number
  level: number
  xp: number
  holdings: Holding[]
  stocks: Stock[]
  news: NewsItem[]
  achievements: Achievement[]
  answeredQuestions: Set<string>
  lastTradeResult: TradeResult | null
}

interface GameContextType extends GameState {
  addMoney: (amount: number) => void
  addXp: (amount: number) => void
  recordAnswer: (correct: boolean) => void
  recordUnanswered: () => void
  buyStock: (stockId: string, quantity: number) => TradeResult
  sellStock: (stockId: string, quantity: number) => TradeResult
  withdrawCash: (amount: number) => boolean
  getPortfolioValue: () => number
  getTotalInvested: () => number
  getTotalPL: () => number
  getWithdrawableAmount: () => number
  getNetWorth: () => number
  markQuestionAnswered: (questionId: string) => void
  isQuestionAnswered: (questionId: string) => boolean
  clearTradeResult: () => void
  getAISuggestion: (stockId: string) => { action: string; reason: string; reasonHi: string }
  getXpToNextBadge: () => { current: number; required: number; progress: number }
  hasStreakKingBadge: () => boolean
}

const initialStocks: Stock[] = [
  { id: "1", name: "Tata Industries", symbol: "TATA", price: 2450, previousPrice: 2400, change: 50, changePercent: 2.08, sector: "Conglomerate", logo: "🏭", priceHistory: [], high24h: 2500, low24h: 2350 },
  { id: "2", name: "Reliance Corp", symbol: "RLC", price: 1820, previousPrice: 1850, change: -30, changePercent: -1.62, sector: "Energy", logo: "⚡", priceHistory: [], high24h: 1880, low24h: 1780 },
  { id: "3", name: "Infosys Tech", symbol: "INFY", price: 1540, previousPrice: 1520, change: 20, changePercent: 1.32, sector: "IT", logo: "💻", priceHistory: [], high24h: 1580, low24h: 1500 },
  { id: "4", name: "HDFC Bank", symbol: "HDFC", price: 1680, previousPrice: 1700, change: -20, changePercent: -1.18, sector: "Banking", logo: "🏦", priceHistory: [], high24h: 1720, low24h: 1650 },
  { id: "5", name: "Bharti Telecom", symbol: "BRTL", price: 920, previousPrice: 900, change: 20, changePercent: 2.22, sector: "Telecom", logo: "📱", priceHistory: [], high24h: 950, low24h: 880 },
  { id: "6", name: "Asian Paints", symbol: "APNT", price: 3200, previousPrice: 3180, change: 20, changePercent: 0.63, sector: "Consumer", logo: "🎨", priceHistory: [], high24h: 3250, low24h: 3150 },
  { id: "7", name: "Maruti Auto", symbol: "MRUT", price: 9850, previousPrice: 9900, change: -50, changePercent: -0.51, sector: "Auto", logo: "🚗", priceHistory: [], high24h: 10000, low24h: 9700 },
  { id: "8", name: "Hindustan Foods", symbol: "HUL", price: 2580, previousPrice: 2550, change: 30, changePercent: 1.18, sector: "FMCG", logo: "🍔", priceHistory: [], high24h: 2620, low24h: 2520 },
  { id: "9", name: "Wipro Ltd", symbol: "WIPRO", price: 485, previousPrice: 478, change: 7, changePercent: 1.46, sector: "IT", logo: "🖥️", priceHistory: [], high24h: 495, low24h: 470 },
  { id: "10", name: "ICICI Bank", symbol: "ICICI", price: 1120, previousPrice: 1135, change: -15, changePercent: -1.32, sector: "Banking", logo: "💳", priceHistory: [], high24h: 1150, low24h: 1100 },
  { id: "11", name: "Sun Pharma", symbol: "SUNP", price: 1380, previousPrice: 1360, change: 20, changePercent: 1.47, sector: "Pharma", logo: "💊", priceHistory: [], high24h: 1410, low24h: 1340 },
  { id: "12", name: "Larsen & Toubro", symbol: "LT", price: 3450, previousPrice: 3480, change: -30, changePercent: -0.86, sector: "Infrastructure", logo: "🏗️", priceHistory: [], high24h: 3520, low24h: 3400 },
  { id: "13", name: "ITC Limited", symbol: "ITC", price: 465, previousPrice: 458, change: 7, changePercent: 1.53, sector: "FMCG", logo: "🚬", priceHistory: [], high24h: 475, low24h: 450 },
]

const newsTemplates: Omit<NewsItem, "id" | "timestamp">[] = [
  { title: "RBI announces new monetary policy", titleHi: "RBI ने नई मौद्रिक नीति की घोषणा की", description: "Banking sector expected to benefit from stable rates", descriptionHi: "स्थिर दरों से बैंकिंग क्षेत्र को फायदा होने की उम्मीद", impact: "positive", affectedStocks: ["4"] },
  { title: "Tech sector sees strong Q4 earnings", titleHi: "टेक सेक्टर में मजबूत Q4 आय", description: "IT companies beat analyst expectations", descriptionHi: "IT कंपनियों ने विश्लेषक अपेक्षाओं को पछाड़ा", impact: "positive", affectedStocks: ["3"] },
  { title: "Oil prices surge amid global tensions", titleHi: "वैश्विक तनाव के बीच तेल की कीमतों में उछाल", description: "Energy stocks affected by crude movement", descriptionHi: "कच्चे तेल की कीमतों से ऊर्जा स्टॉक प्रभावित", impact: "negative", affectedStocks: ["2"] },
  { title: "Government announces infrastructure push", titleHi: "सरकार की बुनियादी ढांचा योजना", description: "Auto and conglomerate sectors to benefit", descriptionHi: "ऑटो और समूह क्षेत्रों को फायदा", impact: "positive", affectedStocks: ["1", "7"] },
  { title: "5G rollout accelerates nationwide", titleHi: "देशभर में 5G रोलआउट में तेजी", description: "Telecom companies see increased adoption", descriptionHi: "दूरसंचार कंपनियों में बढ़ती अपनाहट", impact: "positive", affectedStocks: ["5"] },
  { title: "Consumer demand slows in urban areas", titleHi: "शहरी क्षेत्रों में मांग धीमी", description: "FMCG and consumer goods face headwinds", descriptionHi: "FMCG और उपभोक्ता वस्तुओं को चुनौतियां", impact: "negative", affectedStocks: ["6", "8"] },
  { title: "Auto sector reports record sales", titleHi: "ऑटो सेक्टर में रिकॉर्ड बिक्री", description: "Festival season drives automobile demand", descriptionHi: "त्योहारी सीजन ने ऑटो मांग बढ़ाई", impact: "positive", affectedStocks: ["7"] },
  { title: "Global markets face uncertainty", titleHi: "वैश्विक बाजारों में अनिश्चितता", description: "International volatility affects Indian indices", descriptionHi: "अंतरराष्ट्रीय अस्थिरता का भारतीय सूचकांकों पर असर", impact: "negative", affectedStocks: ["1", "2", "3"] },
]

/**
 * Initial achievements with multilingual support.
 * The "xp_streak_king" badge is awarded at 1000 XP.
 */
const initialAchievements: Achievement[] = [
  { 
    id: "first_profit", 
    title: "First Profit!", 
    titleHi: "पहला मुनाफा!", 
    titleTe: "మొదటి లాభం!",
    titleOr: "ପ୍ରଥମ ଲାଭ!",
    description: "Made your first profitable trade", 
    descriptionHi: "पहला लाभदायक व्यापार किया", 
    descriptionTe: "మీ మొదటి లాభదాయక ట్రేడ్ చేసారు",
    descriptionOr: "ତୁମର ପ୍ରଥମ ଲାଭଦାୟକ ଟ୍ରେଡ୍ କଲ",
    icon: "🎉", 
    unlocked: false 
  },
  { 
    id: "smart_sell", 
    title: "Smart Seller", 
    titleHi: "स्मार्ट विक्रेता", 
    titleTe: "స్మార్ట్ సెల్లర్",
    titleOr: "ସ୍ମାର୍ଟ ବିକ୍ରେତା",
    description: "Sold stocks at 10%+ profit", 
    descriptionHi: "10%+ मुनाफे पर स्टॉक बेचे", 
    descriptionTe: "10%+ లాభంతో స్టాక్స్ అమ్మారు",
    descriptionOr: "10%+ ଲାଭରେ ଷ୍ଟକ୍ ବିକ୍ରି କଲ",
    icon: "🧠", 
    unlocked: false 
  },
  { 
    id: "quiz_master", 
    title: "Quiz Master", 
    titleHi: "क्विज़ मास्टर", 
    titleTe: "క్విజ్ మాస్టర్",
    titleOr: "କ୍ୱିଜ୍ ମାଷ୍ଟର",
    description: "Answered 50 questions correctly", 
    descriptionHi: "50 सवालों के सही जवाब दिए", 
    descriptionTe: "50 ప్రశ్నలకు సరైన సమాధానాలు ఇచ్చారు",
    descriptionOr: "50 ପ୍ରଶ୍ନର ସଠିକ୍ ଉତ୍ତର ଦେଲ",
    icon: "📚", 
    unlocked: false 
  },
  { 
    id: "streak_king", 
    title: "Streak King", 
    titleHi: "स्ट्रीक किंग", 
    titleTe: "స్ట్రీక్ కింగ్",
    titleOr: "ଷ୍ଟ୍ରିକ୍ କିଂ",
    description: "Achieved a 10 answer streak", 
    descriptionHi: "10 जवाबों की स्ट्रीक हासिल की", 
    descriptionTe: "10 సమాధానాల స్ట్రీక్ సాధించారు",
    descriptionOr: "10 ଉତ୍ତରର ଷ୍ଟ୍ରିକ୍ ହାସଲ କଲ",
    icon: "🔥", 
    unlocked: false 
  },
  { 
    id: "xp_streak_king", 
    title: "XP Streak King", 
    titleHi: "XP स्ट्रीक किंग", 
    titleTe: "XP స్ట్రీక్ కింగ్",
    titleOr: "XP ଷ୍ଟ୍ରିକ୍ କିଂ",
    description: "Earned 1000 XP - You're a champion!", 
    descriptionHi: "1000 XP कमाया - आप चैंपियन हैं!", 
    descriptionTe: "1000 XP సంపాదించారు - మీరు ఛాంపియన్!",
    descriptionOr: "1000 XP କମାଇଲ - ତୁମେ ଚ୍ୟାମ୍ପିଅନ୍!",
    icon: "👑", 
    unlocked: false,
    xpThreshold: STREAK_KING_XP_THRESHOLD
  },
  { 
    id: "investor", 
    title: "Investor", 
    titleHi: "निवेशक", 
    titleTe: "పెట్టుబడిదారు",
    titleOr: "ବିନିଯୋଗକାରୀ",
    description: "Invested in 5 different stocks", 
    descriptionHi: "5 अलग-अलग स्टॉक्स में निवेश किया", 
    descriptionTe: "5 వేర్వేరు స్టాక్స్‌లో పెట్టుబడి పెట్టారు",
    descriptionOr: "5ଟି ଭିନ୍ନ ଷ୍ଟକ୍‌ରେ ବିନିଯୋଗ କଲ",
    icon: "💼", 
    unlocked: false 
  },
  { 
    id: "millionaire", 
    title: "Millionaire", 
    titleHi: "करोड़पति", 
    titleTe: "మిలియనీర్",
    titleOr: "କୋଟିପତି",
    description: "Net worth exceeded ₹2,00,000", 
    descriptionHi: "कुल संपत्ति ₹2,00,000 से अधिक", 
    descriptionTe: "మొత్తం సంపద ₹2,00,000 దాటింది",
    descriptionOr: "ମୋଟ ସମ୍ପତ୍ତି ₹2,00,000 ଅତିକ୍ରମ କଲା",
    icon: "💰", 
    unlocked: false 
  },
]

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>({
    balance: INITIAL_CAPITAL,
    withdrawnCash: 0,
    totalEarned: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    unansweredQuestions: 0,
    currentStreak: 0,
    bestStreak: 0,
    level: 1,
    xp: 0,
    holdings: [],
    stocks: initialStocks.map(s => ({
      ...s,
      priceHistory: Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        price: s.price * (0.95 + Math.random() * 0.1)
      }))
    })),
    news: [],
    achievements: initialAchievements,
    answeredQuestions: new Set(),
    lastTradeResult: null,
  })

  // Stock price simulation with history
  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        const newStocks = prev.stocks.map((stock) => {
          const volatility = 0.015
          const randomChange = (Math.random() - 0.5) * 2 * volatility * stock.price
          const newsImpact = prev.news
            .filter((n) => n.affectedStocks.includes(stock.id))
            .reduce((acc, n) => {
              if (n.impact === "positive") return acc + 0.008 * stock.price
              if (n.impact === "negative") return acc - 0.008 * stock.price
              return acc
            }, 0)

          const newPrice = Math.max(10, stock.price + randomChange + newsImpact * 0.1)
          const change = newPrice - stock.previousPrice
          const changePercent = (change / stock.previousPrice) * 100
          
          const newHistory = [...stock.priceHistory.slice(-23), { time: new Date().toLocaleTimeString(), price: newPrice }]
          const prices = newHistory.map(h => h.price)
          const high24h = Math.max(...prices, stock.high24h)
          const low24h = Math.min(...prices, stock.low24h)

          return {
            ...stock,
            price: Math.round(newPrice * 100) / 100,
            change: Math.round(change * 100) / 100,
            changePercent: Math.round(changePercent * 100) / 100,
            priceHistory: newHistory,
            high24h,
            low24h,
          }
        })
        return { ...prev, stocks: newStocks }
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // News generation
  useEffect(() => {
    const generateNews = () => {
      const template = newsTemplates[Math.floor(Math.random() * newsTemplates.length)]
      const newNews: NewsItem = {
        ...template,
        id: Date.now().toString(),
        timestamp: new Date(),
      }
      setState((prev) => ({
        ...prev,
        news: [newNews, ...prev.news.slice(0, 9)],
      }))
    }

    generateNews()
    const interval = setInterval(generateNews, 12000)
    return () => clearInterval(interval)
  }, [])

  /**
   * Check and unlock achievements based on current game state.
   * This includes the XP-based "Streak King" badge at 1000 XP.
   */
  const checkAchievements = useCallback((newState: GameState) => {
    const updatedAchievements = [...newState.achievements]
    
    // First Profit - Check if user has made any profit on holdings
    if (!updatedAchievements.find(a => a.id === "first_profit")?.unlocked) {
      const totalPL = newState.holdings.reduce((total, holding) => {
        const stock = newState.stocks.find((s) => s.id === holding.stockId)
        return total + (stock ? (stock.price - holding.avgPrice) * holding.quantity : 0)
      }, 0)
      if (totalPL > 0) {
        const idx = updatedAchievements.findIndex(a => a.id === "first_profit")
        if (idx !== -1) updatedAchievements[idx] = { ...updatedAchievements[idx], unlocked: true, unlockedAt: new Date() }
      }
    }

    // Quiz Master - 50 correct answers
    if (!updatedAchievements.find(a => a.id === "quiz_master")?.unlocked && newState.correctAnswers >= 50) {
      const idx = updatedAchievements.findIndex(a => a.id === "quiz_master")
      if (idx !== -1) updatedAchievements[idx] = { ...updatedAchievements[idx], unlocked: true, unlockedAt: new Date() }
    }

    // Streak King (answer streak) - 10 consecutive correct answers
    if (!updatedAchievements.find(a => a.id === "streak_king")?.unlocked && newState.currentStreak >= 10) {
      const idx = updatedAchievements.findIndex(a => a.id === "streak_king")
      if (idx !== -1) updatedAchievements[idx] = { ...updatedAchievements[idx], unlocked: true, unlockedAt: new Date() }
    }

    // XP Streak King - 1000 XP milestone badge
    if (!updatedAchievements.find(a => a.id === "xp_streak_king")?.unlocked && newState.xp >= STREAK_KING_XP_THRESHOLD) {
      const idx = updatedAchievements.findIndex(a => a.id === "xp_streak_king")
      if (idx !== -1) updatedAchievements[idx] = { ...updatedAchievements[idx], unlocked: true, unlockedAt: new Date() }
    }

    // Investor - 5 different stocks in portfolio
    if (!updatedAchievements.find(a => a.id === "investor")?.unlocked && newState.holdings.length >= 5) {
      const idx = updatedAchievements.findIndex(a => a.id === "investor")
      if (idx !== -1) updatedAchievements[idx] = { ...updatedAchievements[idx], unlocked: true, unlockedAt: new Date() }
    }

    // Millionaire - Net worth exceeds 200,000
    const netWorth = newState.balance + newState.holdings.reduce((total, holding) => {
      const stock = newState.stocks.find((s) => s.id === holding.stockId)
      return total + (stock ? stock.price * holding.quantity : 0)
    }, 0)
    if (!updatedAchievements.find(a => a.id === "millionaire")?.unlocked && netWorth >= 200000) {
      const idx = updatedAchievements.findIndex(a => a.id === "millionaire")
      if (idx !== -1) updatedAchievements[idx] = { ...updatedAchievements[idx], unlocked: true, unlockedAt: new Date() }
    }

    return updatedAchievements
  }, [])

  const addMoney = (amount: number) => {
    setState((prev) => {
      const newXp = prev.xp + Math.floor(amount / 100)
      const newLevel = Math.floor(newXp / 1000) + 1
      const newState = {
        ...prev,
        balance: prev.balance + amount,
        totalEarned: prev.totalEarned + amount,
        xp: newXp,
        level: newLevel,
      }
      return { ...newState, achievements: checkAchievements(newState) }
    })
  }

  /**
   * Add XP directly without adding money.
   * Used for quiz completions and other XP-granting activities.
   */
  const addXp = (amount: number) => {
    setState((prev) => {
      const newXp = prev.xp + amount
      const newLevel = Math.floor(newXp / 1000) + 1
      const newState = {
        ...prev,
        xp: newXp,
        level: newLevel,
      }
      return { ...newState, achievements: checkAchievements(newState) }
    })
  }

  /**
   * Record an answered question result.
   * Updates streaks, counts, and achievements accordingly.
   */
  const recordAnswer = (correct: boolean) => {
    setState((prev) => {
      const newState = {
        ...prev,
        questionsAnswered: prev.questionsAnswered + 1,
        correctAnswers: correct ? prev.correctAnswers + 1 : prev.correctAnswers,
        wrongAnswers: correct ? prev.wrongAnswers : prev.wrongAnswers + 1,
        currentStreak: correct ? prev.currentStreak + 1 : 0,
        bestStreak: correct ? Math.max(prev.bestStreak, prev.currentStreak + 1) : prev.bestStreak,
      }
      return { ...newState, achievements: checkAchievements(newState) }
    })
  }

  /**
   * Record an unanswered question (timer expired).
   * Breaks the streak and increments unanswered count.
   */
  const recordUnanswered = () => {
    setState((prev) => ({
      ...prev,
      questionsAnswered: prev.questionsAnswered + 1,
      unansweredQuestions: prev.unansweredQuestions + 1,
      currentStreak: 0, // Unanswered breaks the streak
    }))
  }

  const markQuestionAnswered = (questionId: string) => {
    setState((prev) => ({
      ...prev,
      answeredQuestions: new Set([...prev.answeredQuestions, questionId]),
    }))
  }

  const isQuestionAnswered = (questionId: string) => {
    return state.answeredQuestions.has(questionId)
  }

  const clearTradeResult = () => {
    setState((prev) => ({ ...prev, lastTradeResult: null }))
  }

  const buyStock = (stockId: string, quantity: number): TradeResult => {
    const stock = state.stocks.find((s) => s.id === stockId)
    if (!stock) return { success: false, type: "buy", stockSymbol: "", quantity: 0, price: 0, total: 0 }

    const totalCost = stock.price * quantity
    if (totalCost > state.balance) return { success: false, type: "buy", stockSymbol: stock.symbol, quantity, price: stock.price, total: totalCost }

    const result: TradeResult = {
      success: true,
      type: "buy",
      stockSymbol: stock.symbol,
      quantity,
      price: stock.price,
      total: totalCost,
    }

    setState((prev) => {
      const existingHolding = prev.holdings.find((h) => h.stockId === stockId)
      let newHoldings: Holding[]

      if (existingHolding) {
        const newQuantity = existingHolding.quantity + quantity
        const newAvgPrice = (existingHolding.avgPrice * existingHolding.quantity + stock.price * quantity) / newQuantity
        newHoldings = prev.holdings.map((h) =>
          h.stockId === stockId ? { ...h, quantity: newQuantity, avgPrice: newAvgPrice } : h
        )
      } else {
        newHoldings = [...prev.holdings, { stockId, quantity, avgPrice: stock.price }]
      }

      const newState = {
        ...prev,
        balance: prev.balance - totalCost,
        holdings: newHoldings,
        lastTradeResult: result,
      }
      return { ...newState, achievements: checkAchievements(newState) }
    })
    return result
  }

  const sellStock = (stockId: string, quantity: number): TradeResult => {
    const holding = state.holdings.find((h) => h.stockId === stockId)
    const stock = state.stocks.find((s) => s.id === stockId)
    
    if (!holding || !stock || holding.quantity < quantity) {
      return { success: false, type: "sell", stockSymbol: stock?.symbol || "", quantity, price: stock?.price || 0, total: 0 }
    }

    const totalValue = stock.price * quantity
    const profit = (stock.price - holding.avgPrice) * quantity
    const profitPercent = ((stock.price - holding.avgPrice) / holding.avgPrice) * 100

    const result: TradeResult = {
      success: true,
      type: "sell",
      stockSymbol: stock.symbol,
      quantity,
      price: stock.price,
      total: totalValue,
      profit,
      profitPercent,
    }

    setState((prev) => {
      let newHoldings: Holding[]
      const existingHolding = prev.holdings.find((h) => h.stockId === stockId)!

      if (existingHolding.quantity === quantity) {
        newHoldings = prev.holdings.filter((h) => h.stockId !== stockId)
      } else {
        newHoldings = prev.holdings.map((h) =>
          h.stockId === stockId ? { ...h, quantity: h.quantity - quantity } : h
        )
      }

      // Check for smart sell achievement (10%+ profit)
      const updatedAchievements = [...prev.achievements]
      if (profitPercent >= 10 && !updatedAchievements.find(a => a.id === "smart_sell")?.unlocked) {
        const idx = updatedAchievements.findIndex(a => a.id === "smart_sell")
        if (idx !== -1) updatedAchievements[idx] = { ...updatedAchievements[idx], unlocked: true, unlockedAt: new Date() }
      }

      const newState = {
        ...prev,
        balance: prev.balance + totalValue,
        holdings: newHoldings,
        lastTradeResult: result,
        achievements: updatedAchievements,
      }
      return { ...newState, achievements: checkAchievements(newState) }
    })
    return result
  }

  const getPortfolioValue = () => {
    return state.holdings.reduce((total, holding) => {
      const stock = state.stocks.find((s) => s.id === holding.stockId)
      return total + (stock ? stock.price * holding.quantity : 0)
    }, 0)
  }

  const getTotalInvested = () => {
    return state.holdings.reduce((total, holding) => {
      return total + holding.avgPrice * holding.quantity
    }, 0)
  }

  const getTotalPL = () => {
    return getPortfolioValue() - getTotalInvested()
  }

  const getNetWorth = () => {
    return state.balance + getPortfolioValue()
  }

  const getWithdrawableAmount = () => {
    const netWorth = getNetWorth()
    return Math.max(0, netWorth - INITIAL_CAPITAL)
  }

  const withdrawCash = (amount: number): boolean => {
    const withdrawable = getWithdrawableAmount()
    if (amount > withdrawable || amount > state.balance) return false

    setState((prev) => ({
      ...prev,
      balance: prev.balance - amount,
      withdrawnCash: prev.withdrawnCash + amount,
    }))
    return true
  }

  /**
   * Calculate XP progress towards the next badge (1000 XP milestone).
   * Returns current XP, required XP, and progress percentage.
   */
  const getXpToNextBadge = () => {
    const current = state.xp
    const required = STREAK_KING_XP_THRESHOLD
    const progress = Math.min((current / required) * 100, 100)
    return { current, required, progress }
  }

  /**
   * Check if user has earned the Streak King badge (1000 XP).
   */
  const hasStreakKingBadge = () => {
    return state.achievements.find(a => a.id === "xp_streak_king")?.unlocked ?? false
  }

  const getAISuggestion = (stockId: string): { action: string; reason: string; reasonHi: string } => {
    const stock = state.stocks.find((s) => s.id === stockId)
    if (!stock) return { action: "hold", reason: "No data available", reasonHi: "कोई डेटा उपलब्ध नहीं" }

    const recentPrices = stock.priceHistory.slice(-5).map(h => h.price)
    const avgRecent = recentPrices.reduce((a, b) => a + b, 0) / recentPrices.length
    const trend = stock.price > avgRecent ? "up" : "down"
    const nearHigh = stock.price >= stock.high24h * 0.95
    const nearLow = stock.price <= stock.low24h * 1.05
    const positiveNews = state.news.filter(n => n.affectedStocks.includes(stockId) && n.impact === "positive").length
    const negativeNews = state.news.filter(n => n.affectedStocks.includes(stockId) && n.impact === "negative").length

    if (nearLow && trend === "up" && positiveNews > negativeNews) {
      return { 
        action: "buy", 
        reason: "Price near 24h low with upward momentum. Good entry point!",
        reasonHi: "कीमत 24 घंटे के निचले स्तर के पास है और बढ़ रही है। अच्छा मौका!"
      }
    }
    if (nearHigh && trend === "down") {
      return { 
        action: "sell", 
        reason: "Price near 24h high and showing weakness. Consider booking profits.",
        reasonHi: "कीमत 24 घंटे के उच्च स्तर के पास है और कमजोरी दिखा रही है। मुनाफा बुक करें।"
      }
    }
    if (negativeNews > positiveNews && trend === "down") {
      return { 
        action: "sell", 
        reason: "Negative news affecting this stock. Risk management advised.",
        reasonHi: "नकारात्मक खबरें इस स्टॉक को प्रभावित कर रही हैं। सावधानी बरतें।"
      }
    }
    if (positiveNews > 0 && trend === "up") {
      return { 
        action: "buy", 
        reason: "Positive sentiment with upward trend. Momentum looks strong!",
        reasonHi: "सकारात्मक भावना और बढ़ती प्रवृत्ति। गति मजबूत दिख रही है!"
      }
    }
    return { 
      action: "hold", 
      reason: "Market conditions are neutral. Wait for a clearer signal.",
      reasonHi: "बाजार की स्थिति तटस्थ है। स्पष्ट संकेत का इंतजार करें।"
    }
  }

  return (
    <GameContext.Provider
      value={{
        ...state,
        addMoney,
        addXp,
        recordAnswer,
        recordUnanswered,
        buyStock,
        sellStock,
        withdrawCash,
        getPortfolioValue,
        getTotalInvested,
        getTotalPL,
        getWithdrawableAmount,
        getNetWorth,
        markQuestionAnswered,
        isQuestionAnswered,
        clearTradeResult,
        getAISuggestion,
        getXpToNextBadge,
        hasStreakKingBadge,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGame must be used within GameProvider")
  }
  return context
}
