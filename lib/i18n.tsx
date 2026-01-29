"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

/**
 * Supported languages in the app.
 * Adding new languages requires:
 * 1. Add the language code here
 * 2. Add translations in the `translations` object below
 */
type Language = "en" | "hi" | "te" | "or"

interface Translations {
  appName: string
  earnMode: string
  investMode: string
  portfolio: string
  wallet: string
  level: string
  virtualBalance: string
  netWorth: string
  accuracy: string
  streak: string
  questionsAnswered: string
  withdrawableCash: string
  withdrawnTotal: string
  earnTitle: string
  earnSubtitle: string
  selectCategory: string
  selectDifficulty: string
  maths: string
  aptitude: string
  gk: string
  logical: string
  easy: string
  medium: string
  hard: string
  reward: string
  startQuiz: string
  question: string
  submit: string
  correct: string
  incorrect: string
  earned: string
  nextQuestion: string
  backToCategories: string
  streakBonus: string
  xpEarned: string
  quizComplete: string
  score: string
  totalEarned: string
  playAgain: string
  changeSubject: string
  investTitle: string
  investSubtitle: string
  portfolioValue: string
  totalInvested: string
  totalPL: string
  availableCash: string
  stocks: string
  buy: string
  sell: string
  hold: string
  quantity: string
  currentPrice: string
  change: string
  holdings: string
  avgPrice: string
  invested: string
  pl: string
  noHoldings: string
  newsFeed: string
  marketNews: string
  withdraw: string
  withdrawCash: string
  withdrawableAmount: string
  withdrawButton: string
  withdrawSuccess: string
  insufficientFunds: string
  enterAmount: string
  disclaimer: string
  disclaimerText: string
  initialCapital: string
  profit: string
  loss: string
  levelUp: string
  achievements: string
  dailyChallenge: string
  leaderboard: string
  rank: string
  points: string
  boughtSuccessfully: string
  soldSuccessfully: string
  tradeFailed: string
  aiSuggestion: string
  hourly: string
  weekly: string
  monthly: string
  high24h: string
  low24h: string
  trend: string
  selectStock: string
  noQuestionsLeft: string
  // New translations for quiz improvements
  attempted: string
  correctCount: string
  wrongCount: string
  unanswered: string
  timeUp: string
  xpProgress: string
  nextBadge: string
  badgeEarned: string
  streakKing: string
  explanation: string
  correctAnswer: string
  yourAnswer: string
  // Bitcoin Trading Game translations
  bitcoinTrading: string
  bitcoinTradingDesc: string
  gameCoins: string
  eduBtc: string
  btcPrice: string
  learnPhase: string
  minePhase: string
  tradePhase: string
  eventPhase: string
  costsPhase: string
  learningLevelLabel: string
  electricityCapacity: string
  purchaseMiner: string
  miningOutput: string
  buyEduBtc: string
  sellEduBtc: string
  skipTrading: string
  continuePhase: string
  nextRound: string
  finishGame: string
  gameComplete: string
  finalScore: string
  playAgainBtc: string
  roundHistory: string
}

const translations: Record<Language, Translations> = {
  en: {
    appName: "MoneyQuest",
    earnMode: "Quiz Mode",
    investMode: "Trade",
    portfolio: "Portfolio",
    wallet: "Wallet",
    level: "Level",
    virtualBalance: "Cash Balance",
    netWorth: "Net Worth",
    accuracy: "Accuracy",
    streak: "Streak",
    questionsAnswered: "Questions Solved",
    withdrawableCash: "Withdrawable",
    withdrawnTotal: "Total Withdrawn",
    earnTitle: "Quiz Mode",
    earnSubtitle: "Answer questions correctly to earn virtual money!",
    selectCategory: "Choose Your Subject",
    selectDifficulty: "Select Difficulty",
    maths: "Mathematics",
    aptitude: "Aptitude",
    gk: "General Knowledge",
    logical: "Logical Reasoning",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    reward: "Reward",
    startQuiz: "Let's Go!",
    question: "Question",
    submit: "Lock Answer",
    correct: "Awesome!",
    incorrect: "Oops!",
    earned: "You earned",
    nextQuestion: "Next Question",
    backToCategories: "Back to Menu",
    streakBonus: "Streak Bonus",
    xpEarned: "XP Earned",
    quizComplete: "Quiz Complete!",
    score: "Your Score",
    totalEarned: "Total Earned",
    playAgain: "Play Again",
    changeSubject: "Change Subject",
    investTitle: "Visual Stock Market",
    investSubtitle: "Practice trading with virtual money!",
    portfolioValue: "Portfolio Value",
    totalInvested: "Invested",
    totalPL: "Profit/Loss",
    availableCash: "Available Cash",
    stocks: "Market",
    buy: "Buy",
    sell: "Sell",
    hold: "Hold",
    quantity: "Qty",
    currentPrice: "Current Price",
    change: "Change",
    holdings: "My Holdings",
    avgPrice: "Avg Price",
    invested: "Invested",
    pl: "P&L",
    noHoldings: "No stocks yet. Start your journey!",
    newsFeed: "Breaking News",
    marketNews: "Market Updates",
    withdraw: "Withdraw",
    withdrawCash: "Withdraw Profits",
    withdrawableAmount: "Available to Withdraw",
    withdrawButton: "Withdraw Now",
    withdrawSuccess: "Withdrawal Successful!",
    insufficientFunds: "Not enough funds",
    enterAmount: "Enter amount",
    disclaimer: "Educational Game",
    disclaimerText: "This is a simulation game for learning. No real money is involved. Practice trading safely!",
    initialCapital: "Starting Capital",
    profit: "Profit",
    loss: "Loss",
    levelUp: "Level Up!",
    achievements: "Achievements",
    dailyChallenge: "Daily Challenge",
    leaderboard: "Leaderboard",
    rank: "Rank",
    points: "Points",
    boughtSuccessfully: "Bought Successfully!",
    soldSuccessfully: "Sold Successfully!",
    tradeFailed: "Trade Failed",
    aiSuggestion: "AI Suggestion",
    hourly: "Hourly",
    weekly: "Weekly",
    monthly: "Monthly",
    high24h: "24h High",
    low24h: "24h Low",
    trend: "Trend",
    selectStock: "Select a stock to view details",
    noQuestionsLeft: "You've answered all questions in this category! Try another subject or difficulty.",
    // New translations
    attempted: "Attempted",
    correctCount: "Correct",
    wrongCount: "Wrong",
    unanswered: "Unanswered",
    timeUp: "Time's Up!",
    xpProgress: "XP Progress",
    nextBadge: "Next Badge",
    badgeEarned: "Badge Earned!",
    streakKing: "Streak King",
    explanation: "Explanation",
    correctAnswer: "Correct Answer",
    yourAnswer: "Your Answer",
    // Bitcoin Trading Game
    bitcoinTrading: "Bitcoin Trading",
    bitcoinTradingDesc: "Learn mining, trading & electricity management",
    gameCoins: "Coins",
    eduBtc: "EduBTC",
    btcPrice: "BTC Price",
    learnPhase: "Learn Phase",
    minePhase: "Mine Phase",
    tradePhase: "Trade Phase",
    eventPhase: "Event Phase",
    costsPhase: "Costs Phase",
    learningLevelLabel: "Learning Level",
    electricityCapacity: "Electricity Capacity",
    purchaseMiner: "Purchase Miner",
    miningOutput: "Mining Output",
    buyEduBtc: "Buy EduBTC",
    sellEduBtc: "Sell EduBTC",
    skipTrading: "Skip Trading",
    continuePhase: "Continue",
    nextRound: "Next Round",
    finishGame: "Finish Game",
    gameComplete: "Game Complete!",
    finalScore: "Final Score",
    playAgainBtc: "Play Again",
    roundHistory: "Round History",
  },
  hi: {
    appName: "मनीक्वेस्ट",
    earnMode: "क्विज़ मोड",
    investMode: "ट्रेड",
    portfolio: "पोर्टफोलियो",
    wallet: "वॉलेट",
    level: "लेवल",
    virtualBalance: "कैश बैलेंस",
    netWorth: "कुल संपत्ति",
    accuracy: "सटीकता",
    streak: "स्ट्रीक",
    questionsAnswered: "हल किए गए प्रश्न",
    withdrawableCash: "निकासी योग्य",
    withdrawnTotal: "कुल निकाला गया",
    earnTitle: "क्विज़ मोड",
    earnSubtitle: "सही जवाब दो और वर्चुअल पैसा कमाओ!",
    selectCategory: "विषय चुनो",
    selectDifficulty: "कठिनाई चुनो",
    maths: "गणित",
    aptitude: "योग्यता",
    gk: "सामान्य ज्ञान",
    logical: "तार्किक तर्क",
    easy: "आसान",
    medium: "मध्यम",
    hard: "कठिन",
    reward: "इनाम",
    startQuiz: "शुरू करें!",
    question: "प्रश्न",
    submit: "जवाब लॉक करो",
    correct: "शानदार!",
    incorrect: "गलत!",
    earned: "तुमने कमाए",
    nextQuestion: "अगला प्रश्न",
    backToCategories: "मेनू पर वापस",
    streakBonus: "स्ट्रीक बोनस",
    xpEarned: "XP कमाया",
    quizComplete: "क्विज़ पूरा!",
    score: "आपका स्कोर",
    totalEarned: "कुल कमाई",
    playAgain: "फिर से खेलें",
    changeSubject: "विषय बदलें",
    investTitle: "विजुअल स्टॉक मार्केट",
    investSubtitle: "वर्चुअल पैसे से ट्रेडिंग अभ्यास करो!",
    portfolioValue: "पोर्टफोलियो मूल्य",
    totalInvested: "निवेशित",
    totalPL: "लाभ/हानि",
    availableCash: "उपलब्ध कैश",
    stocks: "मार्केट",
    buy: "खरीदो",
    sell: "बेचो",
    hold: "रखो",
    quantity: "मात्रा",
    currentPrice: "वर्तमान कीमत",
    change: "बदलाव",
    holdings: "मेरे स्टॉक्स",
    avgPrice: "औसत कीमत",
    invested: "निवेशित",
    pl: "लाभ/हानि",
    noHoldings: "अभी कोई स्टॉक नहीं। शुरू करो!",
    newsFeed: "ताज़ा खबर",
    marketNews: "मार्केट अपडेट्स",
    withdraw: "निकालो",
    withdrawCash: "मुनाफा निकालो",
    withdrawableAmount: "निकासी के लिए उपलब्ध",
    withdrawButton: "अभी निकालो",
    withdrawSuccess: "निकासी सफल!",
    insufficientFunds: "पर्याप्त धन नहीं",
    enterAmount: "राशि दर्ज करें",
    disclaimer: "शैक्षिक गेम",
    disclaimerText: "यह सीखने के लिए एक सिमुलेशन गेम है। कोई असली पैसा शामिल नहीं।",
    initialCapital: "शुरुआती पूंजी",
    profit: "लाभ",
    loss: "हानि",
    levelUp: "लेवल अप!",
    achievements: "उपलब्धियां",
    dailyChallenge: "दैनिक चुनौती",
    leaderboard: "लीडरबोर्ड",
    rank: "रैंक",
    points: "पॉइंट्स",
    boughtSuccessfully: "सफलतापूर्वक खरीदा!",
    soldSuccessfully: "सफलतापूर्वक बेचा!",
    tradeFailed: "ट्रेड विफल",
    aiSuggestion: "AI सुझाव",
    hourly: "प्रति घंटा",
    weekly: "साप्ताहिक",
    monthly: "मासिक",
    high24h: "24 घंटे उच्च",
    low24h: "24 घंटे निम्न",
    trend: "ट्रेंड",
    selectStock: "विवरण देखने के लिए स्टॉक चुनें",
    noQuestionsLeft: "इस श्रेणी के सभी प्रश्नों के जवाब दे दिए! दूसरा विषय या कठिनाई आज़माएं।",
    // New translations
    attempted: "प्रयास किए",
    correctCount: "सही",
    wrongCount: "गलत",
    unanswered: "अनुत्तरित",
    timeUp: "समय समाप्त!",
    xpProgress: "XP प्रगति",
    nextBadge: "अगला बैज",
    badgeEarned: "बैज मिला!",
    streakKing: "स्ट्रीक किंग",
    explanation: "व्याख्या",
    correctAnswer: "सही जवाब",
    yourAnswer: "आपका जवाब",
    // Bitcoin Trading Game
    bitcoinTrading: "बिटकॉइन ट्रेडिंग",
    bitcoinTradingDesc: "माइनिंग, ट्रेडिंग और बिजली प्रबंधन सीखें",
    gameCoins: "कॉइन्स",
    eduBtc: "एडू बीटीसी",
    btcPrice: "BTC कीमत",
    learnPhase: "सीखने का चरण",
    minePhase: "माइनिंग चरण",
    tradePhase: "ट्रेडिंग चरण",
    eventPhase: "इवेंट चरण",
    costsPhase: "लागत चरण",
    learningLevelLabel: "सीखने का स्तर",
    electricityCapacity: "बिजली क्षमता",
    purchaseMiner: "माइनर खरीदें",
    miningOutput: "माइनिंग आउटपुट",
    buyEduBtc: "एडू BTC खरीदें",
    sellEduBtc: "एडू BTC बेचें",
    skipTrading: "ट्रेडिंग छोड़ें",
    continuePhase: "जारी रखें",
    nextRound: "अगला राउंड",
    finishGame: "गेम समाप्त करें",
    gameComplete: "गेम पूरा!",
    finalScore: "अंतिम स्कोर",
    playAgainBtc: "फिर से खेलें",
    roundHistory: "राउंड इतिहास",
  },
  te: {
    // Telugu translations
    appName: "మనీక్వెస్ట్",
    earnMode: "క్విజ్ మోడ్",
    investMode: "ట్రేడ్",
    portfolio: "పోర్ట్‌ఫోలియో",
    wallet: "వాలెట్",
    level: "లెవెల్",
    virtualBalance: "క్యాష్ బ్యాలెన్స్",
    netWorth: "మొత్తం సంపద",
    accuracy: "ఖచ్చితత్వం",
    streak: "స్ట్రీక్",
    questionsAnswered: "పరిష్కరించిన ప్రశ్నలు",
    withdrawableCash: "విత్‌డ్రా చేయగల",
    withdrawnTotal: "మొత్తం విత్‌డ్రా",
    earnTitle: "క్విజ్ మోడ్",
    earnSubtitle: "సరైన సమాధానాలు ఇచ్చి వర్చువల్ డబ్బు సంపాదించండి!",
    selectCategory: "మీ సబ్జెక్ట్ ఎంచుకోండి",
    selectDifficulty: "కష్టత ఎంచుకోండి",
    maths: "గణితం",
    aptitude: "అప్టిట్యూడ్",
    gk: "సాధారణ జ్ఞానం",
    logical: "లాజికల్ రీజనింగ్",
    easy: "సులభం",
    medium: "మధ్యస్థం",
    hard: "కష్టం",
    reward: "రివార్డ్",
    startQuiz: "మొదలు పెడదాం!",
    question: "ప్రశ్న",
    submit: "సమాధానం లాక్ చేయి",
    correct: "అద్భుతం!",
    incorrect: "తప్పు!",
    earned: "మీరు సంపాదించారు",
    nextQuestion: "తదుపరి ప్రశ్న",
    backToCategories: "మెనూకు తిరిగి",
    streakBonus: "స్ట్రీక్ బోనస్",
    xpEarned: "XP సంపాదించారు",
    quizComplete: "క్విజ్ పూర్తయింది!",
    score: "మీ స్కోర్",
    totalEarned: "మొత్తం సంపాదన",
    playAgain: "మళ్ళీ ఆడండి",
    changeSubject: "సబ్జెక్ట్ మార్చండి",
    investTitle: "విజువల్ స్టాక్ మార్కెట్",
    investSubtitle: "వర్చువల్ డబ్బుతో ట్రేడింగ్ ప్రాక్టీస్ చేయండి!",
    portfolioValue: "పోర్ట్‌ఫోలియో విలువ",
    totalInvested: "పెట్టుబడి",
    totalPL: "లాభం/నష్టం",
    availableCash: "అందుబాటులో ఉన్న క్యాష్",
    stocks: "మార్కెట్",
    buy: "కొనండి",
    sell: "అమ్మండి",
    hold: "ఉంచండి",
    quantity: "పరిమాణం",
    currentPrice: "ప్రస్తుత ధర",
    change: "మార్పు",
    holdings: "నా హోల్డింగ్స్",
    avgPrice: "సగటు ధర",
    invested: "పెట్టుబడి",
    pl: "P&L",
    noHoldings: "ఇంకా స్టాక్స్ లేవు. మీ ప్రయాణం మొదలు పెట్టండి!",
    newsFeed: "తాజా వార్తలు",
    marketNews: "మార్కెట్ అప్‌డేట్స్",
    withdraw: "విత్‌డ్రా",
    withdrawCash: "లాభాలు విత్‌డ్రా చేయండి",
    withdrawableAmount: "విత్‌డ్రా చేయడానికి అందుబాటులో",
    withdrawButton: "ఇప్పుడు విత్‌డ్రా చేయండి",
    withdrawSuccess: "విత్‌డ్రాల్ విజయవంతం!",
    insufficientFunds: "తగినంత నిధులు లేవు",
    enterAmount: "మొత్తం నమోదు చేయండి",
    disclaimer: "విద్యా గేమ్",
    disclaimerText: "ఇది నేర్చుకోవడానికి సిమ్యులేషన్ గేమ్. నిజమైన డబ్బు లేదు.",
    initialCapital: "ప్రారంభ మూలధనం",
    profit: "లాభం",
    loss: "నష్టం",
    levelUp: "లెవెల్ అప్!",
    achievements: "సాధనలు",
    dailyChallenge: "రోజువారీ ఛాలెంజ్",
    leaderboard: "లీడర్‌బోర్డ్",
    rank: "ర్యాంక్",
    points: "పాయింట్లు",
    boughtSuccessfully: "విజయవంతంగా కొన్నారు!",
    soldSuccessfully: "విజయవంతంగా అమ్మారు!",
    tradeFailed: "ట్రేడ్ విఫలమైంది",
    aiSuggestion: "AI సూచన",
    hourly: "గంటవారీ",
    weekly: "వారపు",
    monthly: "నెలవారీ",
    high24h: "24గం గరిష్టం",
    low24h: "24గం కనిష్టం",
    trend: "ట్రెండ్",
    selectStock: "వివరాలు చూడటానికి స్టాక్ ఎంచుకోండి",
    noQuestionsLeft: "ఈ కేటగిరీలో అన్ని ప్రశ్నలకు సమాధానమిచ్చారు! మరొక సబ్జెక్ట్ ప్రయత్నించండి.",
    // New translations
    attempted: "ప్రయత్నించారు",
    correctCount: "సరైన",
    wrongCount: "తప్పు",
    unanswered: "సమాధానం ఇవ్వలేదు",
    timeUp: "సమయం అయిపోయింది!",
    xpProgress: "XP పురోగతి",
    nextBadge: "తదుపరి బ్యాడ్జ్",
    badgeEarned: "బ్యాడ్జ్ సంపాదించారు!",
    streakKing: "స్ట్రీక్ కింగ్",
    explanation: "వివరణ",
    correctAnswer: "సరైన సమాధానం",
    yourAnswer: "మీ సమాధానం",
    // Bitcoin Trading Game
    bitcoinTrading: "బిట్‌కాయిన్ ట్రేడింగ్",
    bitcoinTradingDesc: "మైనింగ్, ట్రేడింగ్ & విద్యుత్ నిర్వహణ నేర్చుకోండి",
    gameCoins: "కాయిన్స్",
    eduBtc: "ఎడ్యూ BTC",
    btcPrice: "BTC ధర",
    learnPhase: "నేర్చుకునే దశ",
    minePhase: "మైనింగ్ దశ",
    tradePhase: "ట్రేడింగ్ దశ",
    eventPhase: "ఈవెంట్ దశ",
    costsPhase: "ఖర్చుల దశ",
    learningLevelLabel: "నేర్చుకునే స్థాయి",
    electricityCapacity: "విద్యుత్ సామర్థ్యం",
    purchaseMiner: "మైనర్ కొనుగోలు",
    miningOutput: "మైనింగ్ అవుట్‌పుట్",
    buyEduBtc: "ఎడ్యూ BTC కొనండి",
    sellEduBtc: "ఎడ్యూ BTC అమ్మండి",
    skipTrading: "ట్రేడింగ్ స్కిప్ చేయండి",
    continuePhase: "కొనసాగించు",
    nextRound: "తదుపరి రౌండ్",
    finishGame: "గేమ్ ముగించు",
    gameComplete: "గేమ్ పూర్తయింది!",
    finalScore: "చివరి స్కోర్",
    playAgainBtc: "మళ్ళీ ఆడండి",
    roundHistory: "రౌండ్ చరిత్ర",
  },
  or: {
    // Odia translations
    appName: "ମନିକ୍ୱେଷ୍ଟ",
    earnMode: "କ୍ୱିଜ୍ ମୋଡ୍",
    investMode: "ଟ୍ରେଡ୍",
    portfolio: "ପୋର୍ଟଫୋଲିଓ",
    wallet: "ୱାଲେଟ୍",
    level: "ଲେବେଲ୍",
    virtualBalance: "କ୍ୟାଶ୍ ବ୍ୟାଲେନ୍ସ",
    netWorth: "ମୋଟ ସମ୍ପତ୍ତି",
    accuracy: "ସଠିକତା",
    streak: "ଷ୍ଟ୍ରିକ୍",
    questionsAnswered: "ସମାଧାନ ହୋଇଥିବା ପ୍ରଶ୍ନ",
    withdrawableCash: "ଉଠାଇବା ଯୋଗ୍ୟ",
    withdrawnTotal: "ମୋଟ ଉଠାଯାଇଛି",
    earnTitle: "କ୍ୱିଜ୍ ମୋଡ୍",
    earnSubtitle: "ସଠିକ ଉତ୍ତର ଦିଅ ଏବଂ ଭର୍ଚୁଆଲ୍ ଟଙ୍କା କମାଅ!",
    selectCategory: "ତୁମର ବିଷୟ ବାଛ",
    selectDifficulty: "କଷ୍ଟତା ବାଛ",
    maths: "ଗଣିତ",
    aptitude: "ଯୋଗ୍ୟତା",
    gk: "ସାଧାରଣ ଜ୍ଞାନ",
    logical: "ତାର୍କିକ ଯୁକ୍ତି",
    easy: "ସହଜ",
    medium: "ମଧ୍ୟମ",
    hard: "କଠିନ",
    reward: "ପୁରସ୍କାର",
    startQuiz: "ଆରମ୍ଭ କରିବା!",
    question: "ପ୍ରଶ୍ନ",
    submit: "ଉତ୍ତର ଲକ୍ କର",
    correct: "ଅଦ୍ଭୁତ!",
    incorrect: "ଭୁଲ୍!",
    earned: "ତୁମେ କମାଇଲ",
    nextQuestion: "ପରବର୍ତ୍ତୀ ପ୍ରଶ୍ନ",
    backToCategories: "ମେନୁକୁ ଫେରନ୍ତୁ",
    streakBonus: "ଷ୍ଟ୍ରିକ୍ ବୋନସ୍",
    xpEarned: "XP କମାଇଲ",
    quizComplete: "କ୍ୱିଜ୍ ସମ୍ପୂର୍ଣ୍ଣ!",
    score: "ତୁମର ସ୍କୋର",
    totalEarned: "ମୋଟ ରୋଜଗାର",
    playAgain: "ପୁଣି ଖେଳ",
    changeSubject: "ବିଷୟ ବଦଳାଅ",
    investTitle: "ଭିଜୁଆଲ୍ ଷ୍ଟକ୍ ମାର୍କେଟ୍",
    investSubtitle: "ଭର୍ଚୁଆଲ୍ ଟଙ୍କାରେ ଟ୍ରେଡିଂ ଅଭ୍ୟାସ କର!",
    portfolioValue: "ପୋର୍ଟଫୋଲିଓ ମୂଲ୍ୟ",
    totalInvested: "ବିନିଯୋଗ",
    totalPL: "ଲାଭ/କ୍ଷତି",
    availableCash: "ଉପಲବ୍ଧ କ୍ୟାଶ୍",
    stocks: "ମାର୍କେଟ୍",
    buy: "କିଣ",
    sell: "ବେଚ",
    hold: "ରଖ",
    quantity: "ପରିମାଣ",
    currentPrice: "ବର୍ତ୍ତମାନ ଦାମ",
    change: "ପରିବର୍ତ୍ତନ",
    holdings: "ମୋ ହୋଲ୍ଡିଂସ୍",
    avgPrice: "ହାରାହାରି ଦାମ",
    invested: "ବିନିଯୋଗ",
    pl: "P&L",
    noHoldings: "ଏଯାବତ୍ କୌଣସି ଷ୍ଟକ୍ ନାହିଁ। ଆରମ୍ଭ କର!",
    newsFeed: "ତାଜା ଖବର",
    marketNews: "ମାର୍କେଟ୍ ଅପଡେଟ୍ସ",
    withdraw: "ଉଠାଅ",
    withdrawCash: "ଲାଭ ଉଠାଅ",
    withdrawableAmount: "ଉଠାଇବାକୁ ଉପલବ୍ଧ",
    withdrawButton: "ବର୍ତ୍ତମାନ ଉଠାଅ",
    withdrawSuccess: "ଉଠାଣା ସଫଳ!",
    insufficientFunds: "ଯଥେଷ୍ଟ ଟଙ୍କା ନାହିଁ",
    enterAmount: "ପରିମାଣ ଲେଖ",
    disclaimer: "ଶିକ୍ଷାମୂଳକ ଖେଳ",
    disclaimerText: "ଏହା ଶିଖିବା ପାଇଁ ଏକ ସିମୁଲେସନ୍ ଖେଳ। ପ୍ରକୃତ ଟଙ୍କା ନାହିଁ।",
    initialCapital: "ଆରମ୍ଭିକ ପୁଞ୍ଜି",
    profit: "ଲାଭ",
    loss: "କ୍ଷତି",
    levelUp: "ଲେବେଲ୍ ଅପ୍!",
    achievements: "ସଫଳତା",
    dailyChallenge: "ଦୈନିକ ଚ୍ୟାଲେଞ୍ଜ",
    leaderboard: "ଲିଡରବୋର୍ଡ୍",
    rank: "ର୍ୟାଙ୍କ୍",
    points: "ପଏଣ୍ଟସ୍",
    boughtSuccessfully: "ସଫଳତାର ସହ କିଣାଗଲା!",
    soldSuccessfully: "ସଫଳତାର ସହ ବିକ୍ରି ହେଲା!",
    tradeFailed: "ଟ୍ରେଡ୍ ବିଫଳ",
    aiSuggestion: "AI ପରାମର୍ଶ",
    hourly: "ଘଣ୍ଟାକିଆ",
    weekly: "ସାପ୍ତାହିକ",
    monthly: "ମାସିକ",
    high24h: "24ଘ ଉଚ୍ଚ",
    low24h: "24ଘ ନିମ୍ନ",
    trend: "ଟ୍ରେଣ୍ଡ୍",
    selectStock: "ବିବରଣୀ ଦେଖିବାକୁ ଷ୍ଟକ୍ ବାଛ",
    noQuestionsLeft: "ଏହି ବର୍ଗର ସମସ୍ତ ପ୍ରଶ୍ନର ଉତ୍ତର ଦେଇସାରିଛ! ଅନ୍ୟ ବିଷୟ ଚେଷ୍ଟା କର।",
    // New translations
    attempted: "ପ୍ରୟାସ",
    correctCount: "ସଠିକ୍",
    wrongCount: "ଭୁଲ୍",
    unanswered: "ଅନୁତ୍ତରିତ",
    timeUp: "ସମୟ ଶେଷ!",
    xpProgress: "XP ଅଗ୍ରଗତି",
    nextBadge: "ପରବର୍ତ୍ତୀ ବ୍ୟାଜ୍",
    badgeEarned: "ବ୍ୟାଜ୍ ପାଇଲ!",
    streakKing: "ଷ୍ଟ୍ରିକ୍ କିଂ",
    explanation: "ବ୍ୟାଖ୍ୟା",
    correctAnswer: "ସଠିକ୍ ଉତ୍ତର",
    yourAnswer: "ତୁମର ଉତ୍ତର",
    // Bitcoin Trading Game
    bitcoinTrading: "ବିଟକଏନ୍ ଟ୍ରେଡିଂ",
    bitcoinTradingDesc: "ମାଇନିଂ, ଟ୍ରେଡିଂ ଏବଂ ବିଦ୍ୟୁତ୍ ପରିଚାଳନା ଶିଖ",
    gameCoins: "କଏନ୍ସ",
    eduBtc: "ଏଡୁ BTC",
    btcPrice: "BTC ଦାମ",
    learnPhase: "ଶିଖିବା ପର୍ଯ୍ୟାୟ",
    minePhase: "ମାଇନିଂ ପର୍ଯ୍ୟାୟ",
    tradePhase: "ଟ୍ରେଡିଂ ପର୍ଯ୍ୟାୟ",
    eventPhase: "ଇଭେଣ୍ଟ ପର୍ଯ୍ୟାୟ",
    costsPhase: "ଖର୍ଚ୍ଚ ପର୍ଯ୍ୟାୟ",
    learningLevelLabel: "ଶିଖିବା ସ୍ତର",
    electricityCapacity: "ବିଦ୍ୟୁତ୍ କ୍ଷମତା",
    purchaseMiner: "ମାଇନର୍ କିଣ",
    miningOutput: "ମାଇନିଂ ଆଉଟପୁଟ୍",
    buyEduBtc: "ଏଡୁ BTC କିଣ",
    sellEduBtc: "ଏଡୁ BTC ବିକ୍ରି କର",
    skipTrading: "ଟ୍ରେଡିଂ ଛାଡ",
    continuePhase: "ଜାରି ରଖ",
    nextRound: "ପରବର୍ତ୍ତୀ ରାଉଣ୍ଡ",
    finishGame: "ଖେଳ ଶେଷ କର",
    gameComplete: "ଖେଳ ସମ୍ପୂର୍ଣ୍ଣ!",
    finalScore: "ଅନ୍ତିମ ସ୍କୋର",
    playAgainBtc: "ପୁଣି ଖେଳ",
    roundHistory: "ରାଉଣ୍ଡ ଇତିହାସ",
  },
}

// Language display names for the language selector
export const languageNames: Record<Language, string> = {
  en: "English",
  hi: "हिंदी",
  te: "తెలుగు",
  or: "ଓଡ଼ିଆ",
}

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
  availableLanguages: Language[]
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  return (
    <I18nContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        t: translations[language],
        availableLanguages: ["en", "hi", "te", "or"]
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider")
  }
  return context
}
