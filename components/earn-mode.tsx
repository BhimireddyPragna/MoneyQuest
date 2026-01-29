"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useI18n } from "@/lib/i18n"
import { useGame } from "@/lib/store"
import { getRandomQuestion, getReward, getQuestionCount, type Question } from "@/lib/questions"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calculator,
  Brain,
  BookOpen,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Zap,
  Trophy,
  ArrowLeft,
  Coins,
  Clock,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Category = "maths" | "aptitude" | "gk" | "logical"
type Difficulty = "easy" | "medium" | "hard"

/**
 * Timer duration in seconds for each question.
 * If the user doesn't answer within this time, the question is marked as unanswered.
 */
const QUESTION_TIMER_SECONDS = 30

export function EarnMode() {
  const { language, t } = useI18n()
  const { 
    addMoney, 
    addXp,
    recordAnswer, 
    recordUnanswered,
    currentStreak, 
    markQuestionAnswered, 
    answeredQuestions,
    questionsAnswered,
    correctAnswers,
    wrongAnswers,
    unansweredQuestions,
  } = useGame()

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isTimeUp, setIsTimeUp] = useState(false)
  const [sessionEarnings, setSessionEarnings] = useState(0)
  const [showCoinAnimation, setShowCoinAnimation] = useState(false)
  const [noQuestionsLeft, setNoQuestionsLeft] = useState(false)
  
  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(QUESTION_TIMER_SECONDS)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  
  const audioRef = useRef<{ correct: HTMLAudioElement | null; wrong: HTMLAudioElement | null }>({ correct: null, wrong: null })

  /**
   * Clear and reset the question timer.
   * Called when starting a new question or when the quiz ends.
   */
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  /**
   * Start the countdown timer for the current question.
   * When timer reaches 0, auto-submit as unanswered.
   */
  const startTimer = useCallback(() => {
    clearTimer()
    setTimeRemaining(QUESTION_TIMER_SECONDS)
    
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up - handle timeout
          clearTimer()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [clearTimer])

  // Handle time up - auto-submit as unanswered
  useEffect(() => {
    if (timeRemaining === 0 && currentQuestion && !showResult) {
      handleTimeUp()
    }
  }, [timeRemaining, currentQuestion, showResult])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => clearTimer()
  }, [clearTimer])

  useEffect(() => {
    // Create audio elements for sound effects
    audioRef.current.correct = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleKs9xMz/jlMqS5vV37h/FitNpd3br15BC3e65+6WRDQ+kdzxyoRUFUG07u6fW0EpgufnyJZMEj2O6+i0clwdU5nl7qNeNiF+3e2/dGA9PYjj67l2VR5Knt/pnXJPOmaN4eqqb0svbpjk7ahwTzBkleHqqG1JLGqP3umudFI0Y4/g6K11VzZhj9/oq3RTNl+N3eirdVk3XI3c6Kt2WTpcjdrpq3ZaOluK2OitdVs6WojW6K11XTpZhtTprHVdOliF0umtdV47V4TS6K11XztXg9DprHVfO1aD0OmsdV87VoLQ6ax1XztWgtDprHVfO1aC0OmsdV87VoLQ6ax1XztWgtDprHVfO1aC0OmsdV87VoLQ6ax1XztWgtDprHVfO1aC0OmsdV87")
    audioRef.current.wrong = new Audio("data:audio/wav;base64,UklGRl9vAAABWQVZFZm10IBAAAAAABAEARHzAAAJzAAAABAAgAAGF0YYA4AAAAAMAYAC...")
  }, [])

  const playSound = useCallback((type: "correct" | "wrong") => {
    try {
      if (type === "correct") {
        const audio = new Audio()
        audio.src = "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjczLjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABhgC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAAYYNXmG6AAAAAAAAAAAAAAAAAAAAAP/7kGQAAANUMEoFPeACNQV40KEABY="
        audio.volume = 0.3
        audio.play().catch(() => {})
      }
    } catch {}
  }, [])

  const categories = [
    { id: "maths" as Category, label: t.maths, icon: Calculator, color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-500/10", textColor: "text-blue-600" },
    { id: "aptitude" as Category, label: t.aptitude, icon: Lightbulb, color: "from-amber-500 to-orange-500", bgColor: "bg-amber-500/10", textColor: "text-amber-600" },
    { id: "gk" as Category, label: t.gk, icon: BookOpen, color: "from-emerald-500 to-green-500", bgColor: "bg-emerald-500/10", textColor: "text-emerald-600" },
    { id: "logical" as Category, label: t.logical, icon: Brain, color: "from-purple-500 to-pink-500", bgColor: "bg-purple-500/10", textColor: "text-purple-600" },
  ]

  const difficulties = [
    { id: "easy" as Difficulty, label: t.easy, reward: 1000, color: "from-green-400 to-emerald-500", textColor: "text-green-600", stars: 1 },
    { id: "medium" as Difficulty, label: t.medium, reward: 5000, color: "from-yellow-400 to-orange-500", textColor: "text-orange-600", stars: 2 },
    { id: "hard" as Difficulty, label: t.hard, reward: 10000, color: "from-red-400 to-rose-500", textColor: "text-red-600", stars: 3 },
  ]

  /**
   * Start a new question in the quiz.
   * Fetches a random question and starts the timer.
   * Questions are now unlimited - once all are answered, they repeat.
   */
  const startQuiz = () => {
    if (!selectedCategory || !selectedDifficulty) return
    const question = getRandomQuestion(selectedCategory, selectedDifficulty, answeredQuestions)
    if (!question) {
      // This should never happen now with unlimited mode, but just in case
      setNoQuestionsLeft(true)
      return
    }
    setCurrentQuestion(question)
    setSelectedAnswer(null)
    setShowResult(false)
    setIsTimeUp(false)
    startTimer()
  }

  /**
   * Handle when the timer runs out without an answer.
   * Marks the question as unanswered and shows feedback.
   */
  const handleTimeUp = () => {
    if (!currentQuestion) return
    
    clearTimer()
    setIsTimeUp(true)
    setIsCorrect(false)
    setShowResult(true)
    recordUnanswered()
    markQuestionAnswered(currentQuestion.id)
    // Add small XP for attempting even if timed out
    addXp(5)
  }

  /**
   * Submit the selected answer.
   * Calculates rewards, updates stats, and shows result feedback.
   */
  const submitAnswer = () => {
    if (selectedAnswer === null || !currentQuestion || !selectedDifficulty) return

    clearTimer()
    const correct = selectedAnswer === currentQuestion.correctAnswer
    setIsCorrect(correct)
    setIsTimeUp(false)
    setShowResult(true)
    recordAnswer(correct)
    markQuestionAnswered(currentQuestion.id)

    if (correct) {
      playSound("correct")
      // Calculate reward with streak bonus
      const streakBonus = Math.min(currentStreak * 100, 1000)
      const reward = getReward(selectedDifficulty) + streakBonus
      addMoney(reward)
      setSessionEarnings((prev) => prev + reward)
      setShowCoinAnimation(true)
      // XP earned: base XP + bonus for correct answer
      addXp(10 + Math.floor(reward / 100))
      setTimeout(() => setShowCoinAnimation(false), 1000)
    } else {
      playSound("wrong")
      // Still earn small XP for attempting
      addXp(5)
    }
  }

  const nextQuestion = () => {
    startQuiz()
  }

  const resetQuiz = () => {
    clearTimer()
    setSelectedCategory(null)
    setSelectedDifficulty(null)
    setCurrentQuestion(null)
    setSelectedAnswer(null)
    setShowResult(false)
    setIsTimeUp(false)
    setSessionEarnings(0)
    setTimeRemaining(QUESTION_TIMER_SECONDS)
    setNoQuestionsLeft(false)
  }

  const goBack = () => {
    clearTimer()
    if (currentQuestion) {
      setCurrentQuestion(null)
      setSelectedAnswer(null)
      setShowResult(false)
      setIsTimeUp(false)
      setTimeRemaining(QUESTION_TIMER_SECONDS)
    } else if (selectedDifficulty) {
      setSelectedDifficulty(null)
    } else if (selectedCategory) {
      setSelectedCategory(null)
    }
  }

  const selectedCategoryData = categories.find((c) => c.id === selectedCategory)
  const selectedDifficultyData = difficulties.find((d) => d.id === selectedDifficulty)

  // Get question counts for display
  const getQuestionInfo = (cat: Category, diff: Difficulty) => {
    return getQuestionCount(cat, diff, answeredQuestions)
  }

  // Calculate timer progress percentage
  const timerProgress = (timeRemaining / QUESTION_TIMER_SECONDS) * 100
  const isTimerCritical = timeRemaining <= 10

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Coin Animation Overlay */}
      {showCoinAnimation && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="animate-coin-bounce text-6xl">🪙</div>
        </div>
      )}

      {/* Header with back button and stats */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        {(selectedCategory || selectedDifficulty || currentQuestion) && (
          <Button variant="ghost" onClick={goBack} className="gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            {t.backToCategories}
          </Button>
        )}
        
        {/* Session Stats - Always visible when quiz active */}
        {currentQuestion && (
          <div className="flex flex-wrap gap-2 ml-auto">
            <Badge variant="secondary" className="bg-muted text-foreground">
              {t.attempted}: {questionsAnswered}
            </Badge>
            <Badge variant="secondary" className="bg-green-500/10 text-green-600">
              {t.correctCount}: {correctAnswers}
            </Badge>
            <Badge variant="secondary" className="bg-red-500/10 text-red-600">
              {t.wrongCount}: {wrongAnswers}
            </Badge>
            <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600">
              {t.unanswered}: {unansweredQuestions}
            </Badge>
          </div>
        )}
        
        {sessionEarnings > 0 && !currentQuestion && (
          <Badge variant="secondary" className="bg-primary/10 text-primary text-lg px-4 py-2 ml-auto">
            Session: ₹{sessionEarnings.toLocaleString("en-IN")}
          </Badge>
        )}
      </div>

      {/* Hero Section - Only show when not in quiz */}
      {!currentQuestion && (
        <div className="text-center space-y-3 py-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">{t.earnTitle}</span>
          </div>
        </div>
      )}

      {!currentQuestion ? (
        <div className="space-y-8">
          {/* Category Selection */}
          {!selectedCategory && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Trophy className="h-6 w-6 text-warning" />
                {t.selectCategory}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      "relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group overflow-hidden hover:scale-[1.02] active:scale-[0.98]",
                      "border-border hover:border-primary/50 hover:shadow-lg"
                    )}
                  >
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-10", category.color)} />
                    <div className="relative">
                      <category.icon className={cn("h-8 w-8 mb-3", category.textColor)} />
                      <h3 className="font-bold text-lg text-foreground mb-1">{category.label}</h3>
                      <div className="flex gap-2 mt-2">
                        {["easy", "medium", "hard"].map((diff) => {
                          const info = getQuestionInfo(category.id, diff as Difficulty)
                          return (
                            <Badge key={diff} variant="secondary" className="text-xs">
                              {info.unlimited ? "∞" : `${info.remaining}/${info.total}`}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Difficulty Selection */}
          {selectedCategory && !selectedDifficulty && (
            <div className="space-y-4 animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                {selectedCategoryData && <selectedCategoryData.icon className={cn("h-8 w-8", selectedCategoryData.textColor)} />}
                <div>
                  <h2 className="text-xl font-bold text-foreground">{selectedCategoryData?.label}</h2>
                  <p className="text-muted-foreground">{t.selectDifficulty}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {difficulties.map((difficulty) => {
                  const info = selectedCategory ? getQuestionInfo(selectedCategory, difficulty.id) : { total: 0, remaining: 0, unlimited: false }
                  return (
                    <button
                      key={difficulty.id}
                      onClick={() => setSelectedDifficulty(difficulty.id)}
                      className={cn(
                        "relative p-6 rounded-2xl border-2 transition-all duration-300 text-center group overflow-hidden",
                        "border-border hover:border-primary/50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                      )}
                    >
                      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-10", difficulty.color)} />
                      <div className="relative">
                        <div className="text-2xl mb-2">
                          {"★".repeat(difficulty.stars)}
                        </div>
                        <h3 className="font-bold text-foreground mb-2">{difficulty.label}</h3>
                        <Badge variant="secondary" className={cn("font-bold", difficulty.textColor)}>
                          ₹{difficulty.reward.toLocaleString("en-IN")}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">
                          {info.unlimited ? "Unlimited" : `${info.remaining} questions left`}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
              <Button size="lg" className="w-full h-14 text-lg gap-3 mt-4" onClick={startQuiz} disabled={!selectedDifficulty}>
                <Zap className="h-5 w-5" />
                {t.startQuiz}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Start Button when both selected */}
          {selectedCategory && selectedDifficulty && (
            <div className="space-y-4 animate-slide-up">
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    {selectedCategoryData && <selectedCategoryData.icon className={cn("h-10 w-10", selectedCategoryData.textColor)} />}
                    <div className="text-2xl">{"★".repeat(selectedDifficultyData?.stars || 1)}</div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{selectedCategoryData?.label}</h3>
                  <p className={cn("font-semibold", selectedDifficultyData?.textColor)}>{selectedDifficultyData?.label}</p>
                  <Badge variant="secondary" className="mt-2 text-lg px-4 py-1">
                    ₹{selectedDifficultyData?.reward.toLocaleString("en-IN")} per correct answer
                  </Badge>
                  <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{QUESTION_TIMER_SECONDS} seconds per question</span>
                  </div>
                </CardContent>
              </Card>
              <Button size="lg" className="w-full h-14 text-lg gap-3" onClick={startQuiz}>
                <Zap className="h-5 w-5" />
                {t.startQuiz}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Card className="border-2 border-border bg-card max-w-2xl mx-auto overflow-hidden animate-slide-up">
          {/* Question Header with Timer */}
          <div className={cn("p-4 bg-gradient-to-r text-primary-foreground", selectedCategoryData?.color || "from-primary to-primary/80")}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedCategoryData && <selectedCategoryData.icon className="h-6 w-6" />}
                <span className="font-medium">{selectedCategoryData?.label}</span>
              </div>
              <div className="flex items-center gap-3">
                {currentStreak > 0 && (
                  <Badge variant="secondary" className="bg-orange-500/30 text-primary-foreground border-orange-300/30">
                    🔥 {currentStreak}
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Timer Bar */}
            {!showResult && (
              <div className="mt-3 space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{t.question}</span>
                  </div>
                  <span className={cn(
                    "font-bold",
                    isTimerCritical && "animate-pulse text-warning"
                  )}>
                    {timeRemaining}s
                  </span>
                </div>
                <Progress 
                  value={timerProgress} 
                  className={cn(
                    "h-2 bg-primary-foreground/20",
                    isTimerCritical && "[&>div]:bg-warning"
                  )} 
                />
              </div>
            )}
          </div>

          <CardContent className="p-6 space-y-6">
            {/* Question */}
            <div className="text-center py-4">
              <h3 className="text-xl font-bold text-foreground leading-relaxed text-balance">
                {language === "en" ? currentQuestion?.question : currentQuestion?.questionHi}
              </h3>
            </div>

            {/* Options */}
            <div className="grid gap-3">
              {(language === "en" ? currentQuestion?.options : currentQuestion?.optionsHi)?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && setSelectedAnswer(index)}
                  disabled={showResult}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 text-left transition-all duration-300 flex items-center gap-4",
                    showResult && index === currentQuestion?.correctAnswer
                      ? "bg-green-500/10 border-green-500 text-green-700 animate-pulse-glow"
                      : showResult && selectedAnswer === index && index !== currentQuestion?.correctAnswer
                        ? "bg-red-500/10 border-red-500 text-red-700 animate-shake"
                        : selectedAnswer === index
                          ? "border-primary bg-primary/10 scale-[1.02]"
                          : "border-border hover:border-muted-foreground/30 hover:bg-muted/50"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 font-bold text-lg transition-colors",
                      showResult && index === currentQuestion?.correctAnswer
                        ? "border-green-500 bg-green-500 text-primary-foreground"
                        : showResult && selectedAnswer === index && index !== currentQuestion?.correctAnswer
                          ? "border-red-500 bg-red-500 text-primary-foreground"
                          : selectedAnswer === index
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted-foreground/30 text-muted-foreground"
                    )}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="font-medium text-foreground flex-1">{option}</span>
                  {showResult && index === currentQuestion?.correctAnswer && (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  )}
                  {showResult && selectedAnswer === index && index !== currentQuestion?.correctAnswer && (
                    <XCircle className="h-6 w-6 text-red-500" />
                  )}
                </button>
              ))}
            </div>

            {/* Result Feedback */}
            {showResult && (
              <div className={cn(
                "p-6 rounded-2xl text-center space-y-3",
                isTimeUp 
                  ? "bg-yellow-500/10" 
                  : isCorrect 
                    ? "bg-green-500/10" 
                    : "bg-red-500/10"
              )}>
                <div className="flex items-center justify-center gap-3">
                  {isTimeUp ? (
                    <>
                      <AlertTriangle className="h-8 w-8 text-yellow-600" />
                      <span className="text-2xl font-bold text-yellow-600">{t.timeUp}</span>
                    </>
                  ) : isCorrect ? (
                    <>
                      <span className="text-4xl">🎉</span>
                      <span className="text-2xl font-bold text-green-600">{t.correct}</span>
                      <span className="text-4xl">🎉</span>
                    </>
                  ) : (
                    <>
                      <span className="text-4xl">😔</span>
                      <span className="text-2xl font-bold text-red-600">{t.incorrect}</span>
                    </>
                  )}
                </div>
                
                {/* Show correct answer if wrong or timed out */}
                {(!isCorrect || isTimeUp) && currentQuestion && (
                  <div className="mt-4 p-4 bg-card rounded-xl border border-border">
                    <p className="text-sm text-muted-foreground mb-2">{t.correctAnswer}:</p>
                    <p className="font-bold text-green-600">
                      {String.fromCharCode(65 + currentQuestion.correctAnswer)}. {
                        (language === "en" ? currentQuestion.options : currentQuestion.optionsHi)[currentQuestion.correctAnswer]
                      }
                    </p>
                  </div>
                )}
                
                {isCorrect && selectedDifficulty && (
                  <div className="space-y-2">
                    <p className="text-green-600 font-bold text-xl flex items-center justify-center gap-2">
                      <Coins className="h-6 w-6" />
                      {t.earned} ₹{getReward(selectedDifficulty).toLocaleString("en-IN")}!
                    </p>
                    {currentStreak > 1 && (
                      <p className="text-amber-600 font-medium flex items-center justify-center gap-1">
                        {t.streakBonus}: +₹{Math.min((currentStreak - 1) * 100, 1000).toLocaleString("en-IN")} 🔥
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!showResult ? (
                <Button
                  size="lg"
                  className="flex-1 h-12"
                  onClick={submitAnswer}
                  disabled={selectedAnswer === null}
                >
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  {t.submit}
                </Button>
              ) : (
                <Button size="lg" className="flex-1 h-12" onClick={nextQuestion}>
                  {t.nextQuestion}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
