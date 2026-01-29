/**
 * Bitcoin Learning Game - Educational Simulation
 * 
 * A turn-based game teaching Bitcoin mining, trading, and electricity management.
 * NO real money, wallets, or blockchains involved - purely educational.
 * 
 * Game Rules:
 * - 10 rounds (school years)
 * - Each round follows: LEARN -> MINE -> TRADE -> EVENT -> COSTS
 * - Currency: Coins (virtual), EduBTC (educational Bitcoin)
 */

// ============== CONSTANTS ==============

export const GAME_CONSTANTS = {
  STARTING_COINS: 10000,
  STARTING_EDUBTC: 0,
  MAX_EDUBTC_HOLDING: 5,
  TOTAL_ROUNDS: 10,
  MAX_LEARNING_LEVEL: 5,
  LEARNING_UPGRADE_COST: 1000,
  MAX_MINERS: 3,
  MAX_ELECTRICITY_CAPACITY: 5,
  STARTING_ELECTRICITY_CAPACITY: 3,
  POWER_UPGRADE_COST: 2000,
  STARTING_BTC_PRICE: 1000,
  PRICE_CHANGE_MIN: -0.20,
  PRICE_CHANGE_MAX: 0.20,
  MAX_TRADE_PER_ROUND: 0.5,
  ELECTRICITY_COST_PER_UNIT: 300,
  MINER_MAINTENANCE_COST: 200,
} as const

// ============== TYPES ==============

export type GamePhase = "learn" | "mine" | "trade" | "event" | "costs" | "complete"

export type MinerType = "basic" | "advanced" | "smart"

export interface Miner {
  id: string
  type: MinerType
  name: string
  cost: number
  btcPerRound: number
  powerUsage: number
  isActive: boolean
}

export interface GameEvent {
  id: string
  title: string
  titleHi: string
  titleTe: string
  titleOr: string
  description: string
  descriptionHi: string
  descriptionTe: string
  descriptionOr: string
  effect: "btc_price" | "mining_output" | "electricity"
  modifier: number // Multiplier for the effect (e.g., 1.2 = +20%, 0.8 = -20%)
  icon: string
}

export interface RoundHistory {
  round: number
  startCoins: number
  endCoins: number
  btcMined: number
  btcTraded: number
  event: GameEvent | null
  costsPaid: number
}

export interface BitcoinGameState {
  // Core resources
  coins: number
  eduBtc: number
  
  // Game progression
  currentRound: number
  currentPhase: GamePhase
  isGameOver: boolean
  
  // Learning & Upgrades
  learningLevel: number
  learnActionUsedThisRound: boolean
  
  // Mining
  miners: Miner[]
  minerPurchasedThisRound: boolean
  electricityCapacity: number
  miningDisabledNextRound: boolean
  
  // Trading
  btcPrice: number
  btcBoughtThisRound: number
  btcSoldThisRound: number
  
  // Events
  currentEvent: GameEvent | null
  
  // History
  roundHistory: RoundHistory[]
  
  // UI state
  errorMessage: string | null
}

// ============== MINER DEFINITIONS ==============

export const MINER_TYPES: Record<MinerType, Omit<Miner, "id" | "isActive">> = {
  basic: {
    type: "basic",
    name: "Basic Miner",
    cost: 5000,
    btcPerRound: 0.05,
    powerUsage: 1,
  },
  advanced: {
    type: "advanced",
    name: "Advanced Miner",
    cost: 8000,
    btcPerRound: 0.10,
    powerUsage: 2,
  },
  smart: {
    type: "smart",
    name: "Smart Miner",
    cost: 12000,
    btcPerRound: 0.20,
    powerUsage: 3,
  },
}

// ============== EVENT POOL ==============

const EVENT_POOL: Omit<GameEvent, "id">[] = [
  {
    title: "Bitcoin Halving!",
    titleHi: "बिटकॉइन हाल्विंग!",
    titleTe: "బిట్‌కాయిన్ హాల్వింగ్!",
    titleOr: "ବିଟକଏନ୍ ହାଲ୍ଭିଂ!",
    description: "Mining rewards reduced, but price surges +15%",
    descriptionHi: "खनन पुरस्कार कम, लेकिन कीमत +15% बढ़ी",
    descriptionTe: "మైనింగ్ రివార్డ్స్ తగ్గాయి, కానీ ధర +15% పెరిగింది",
    descriptionOr: "ମାଇନିଂ ରିୱାର୍ଡ କମିଗଲା, କିନ୍ତୁ ଦାମ +15% ବଢିଲା",
    effect: "btc_price",
    modifier: 1.15,
    icon: "chart-up",
  },
  {
    title: "Market Crash",
    titleHi: "बाजार गिरावट",
    titleTe: "మార్కెట్ క్రాష్",
    titleOr: "ବଜାର ପତନ",
    description: "Global uncertainty causes BTC price to drop -15%",
    descriptionHi: "वैश्विक अनिश्चितता से BTC कीमत -15% गिरी",
    descriptionTe: "గ్లోబల్ అనిశ్చితత BTC ధరను -15% తగ్గించింది",
    descriptionOr: "ବୈଶ୍ୱିକ ଅନିଶ୍ଚିତତା BTC ଦାମ -15% କମାଇଲା",
    effect: "btc_price",
    modifier: 0.85,
    icon: "chart-down",
  },
  {
    title: "Mining Efficiency Boost",
    titleHi: "खनन दक्षता बढ़ी",
    titleTe: "మైనింగ్ ఎఫిషియెన్సీ బూస్ట్",
    titleOr: "ମାଇନିଂ ଦକ୍ଷତା ବୃଦ୍ଧି",
    description: "New software update increases mining output by +20%",
    descriptionHi: "नए सॉफ्टवेयर अपडेट से खनन उत्पादन +20% बढ़ा",
    descriptionTe: "కొత్త సాఫ్ట్‌వేర్ అప్‌డేట్ మైనింగ్ అవుట్‌పుట్‌ను +20% పెంచింది",
    descriptionOr: "ନୂଆ ସଫ୍ଟୱେର୍ ଅପଡେଟ୍ ମାଇନିଂ ଆଉଟପୁଟ୍ +20% ବଢାଇଲା",
    effect: "mining_output",
    modifier: 1.20,
    icon: "cpu",
  },
  {
    title: "Hardware Malfunction",
    titleHi: "हार्डवेयर खराबी",
    titleTe: "హార్డ్‌వేర్ మాల్‌ఫంక్షన్",
    titleOr: "ହାର୍ଡୱେର୍ ତ୍ରୁଟି",
    description: "Equipment issues reduce mining output by -20%",
    descriptionHi: "उपकरण समस्याओं से खनन उत्पादन -20% कम हुआ",
    descriptionTe: "పరికరాల సమస్యలు మైనింగ్ అవుట్‌పుట్‌ను -20% తగ్గించాయి",
    descriptionOr: "ଯନ୍ତ୍ର ସମସ୍ୟା ମାଇନିଂ ଆଉଟପୁଟ୍ -20% କମାଇଲା",
    effect: "mining_output",
    modifier: 0.80,
    icon: "wrench",
  },
  {
    title: "Power Grid Upgrade",
    titleHi: "पावर ग्रिड अपग्रेड",
    titleTe: "పవర్ గ్రిడ్ అప్‌గ్రేడ్",
    titleOr: "ପାୱାର ଗ୍ରିଡ୍ ଅପଗ୍ରେଡ୍",
    description: "Electricity capacity temporarily increases by +1 unit",
    descriptionHi: "बिजली क्षमता अस्थायी रूप से +1 यूनिट बढ़ी",
    descriptionTe: "విద్యుత్ సామర్థ్యం తాత్కాలికంగా +1 యూనిట్ పెరిగింది",
    descriptionOr: "ବିଦ୍ୟୁତ୍ କ୍ଷମତା ସାମୟିକ ଭାବେ +1 ୟୁନିଟ୍ ବଢିଲା",
    effect: "electricity",
    modifier: 1, // +1 unit
    icon: "zap",
  },
  {
    title: "Power Outage",
    titleHi: "बिजली कटौती",
    titleTe: "విద్యుత్ కోత",
    titleOr: "ବିଦ୍ୟୁତ୍ ବିଚ୍ଛେଦ",
    description: "Rolling blackouts reduce electricity capacity by -1 unit",
    descriptionHi: "बिजली कटौती से क्षमता -1 यूनिट कम हुई",
    descriptionTe: "విద్యుత్ కోతల వల్ల సామర్థ్యం -1 యూనిట్ తగ్గింది",
    descriptionOr: "ବିଦ୍ୟୁତ୍ ବିଚ୍ଛେଦ କ୍ଷମତା -1 ୟୁନିଟ୍ କମାଇଲା",
    effect: "electricity",
    modifier: -1, // -1 unit
    icon: "zap-off",
  },
  {
    title: "Institutional Interest",
    titleHi: "संस्थागत रुचि",
    titleTe: "సంస్థాగత ఆసక్తి",
    titleOr: "ସାଂସ୍ଥାନିକ ଆଗ୍ରହ",
    description: "Major companies buy Bitcoin, price rises +10%",
    descriptionHi: "बड़ी कंपनियों ने बिटकॉइन खरीदा, कीमत +10% बढ़ी",
    descriptionTe: "పెద్ద కంపెనీలు బిట్‌కాయిన్ కొన్నాయి, ధర +10% పెరిగింది",
    descriptionOr: "ବଡ କମ୍ପାନୀ ବିଟକଏନ୍ କିଣିଲେ, ଦାମ +10% ବଢିଲା",
    effect: "btc_price",
    modifier: 1.10,
    icon: "building",
  },
  {
    title: "Regulatory News",
    titleHi: "नियामक समाचार",
    titleTe: "రెగ్యులేటరీ వార్తలు",
    titleOr: "ନିୟାମକ ଖବର",
    description: "Government announces crypto regulations, price dips -10%",
    descriptionHi: "सरकार ने क्रिप्टो नियम घोषित किए, कीमत -10% गिरी",
    descriptionTe: "ప్రభుత్వం క్రిప్టో నిబంధనలు ప్రకటించింది, ధర -10% పడింది",
    descriptionOr: "ସରକାର କ୍ରିପ୍ଟୋ ନିୟମ ଘୋଷଣା କଲେ, ଦାମ -10% ପଡିଲା",
    effect: "btc_price",
    modifier: 0.90,
    icon: "scroll",
  },
]

// ============== INITIAL STATE ==============

export function createInitialState(): BitcoinGameState {
  return {
    coins: GAME_CONSTANTS.STARTING_COINS,
    eduBtc: GAME_CONSTANTS.STARTING_EDUBTC,
    currentRound: 1,
    currentPhase: "learn",
    isGameOver: false,
    learningLevel: 0,
    learnActionUsedThisRound: false,
    miners: [
      {
        id: "starter-miner",
        ...MINER_TYPES.basic,
        isActive: true,
      },
    ],
    minerPurchasedThisRound: false,
    electricityCapacity: GAME_CONSTANTS.STARTING_ELECTRICITY_CAPACITY,
    miningDisabledNextRound: false,
    btcPrice: GAME_CONSTANTS.STARTING_BTC_PRICE,
    btcBoughtThisRound: 0,
    btcSoldThisRound: 0,
    currentEvent: null,
    roundHistory: [],
    errorMessage: null,
  }
}

// ============== HELPER FUNCTIONS ==============

/**
 * Generate a unique ID for game entities
 */
function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

/**
 * Calculate total power usage of active miners
 */
export function getTotalPowerUsage(miners: Miner[]): number {
  return miners.filter(m => m.isActive).reduce((sum, m) => sum + m.powerUsage, 0)
}

/**
 * Get effective electricity capacity (including event modifiers)
 */
export function getEffectiveElectricity(state: BitcoinGameState): number {
  let capacity = state.electricityCapacity
  if (state.currentEvent?.effect === "electricity") {
    capacity = Math.max(1, capacity + state.currentEvent.modifier)
  }
  return Math.min(capacity, GAME_CONSTANTS.MAX_ELECTRICITY_CAPACITY)
}

/**
 * Calculate mining output for the round
 */
export function calculateMiningOutput(state: BitcoinGameState): number {
  if (state.miningDisabledNextRound) return 0
  
  const effectiveCapacity = getEffectiveElectricity(state)
  let output = 0
  let usedPower = 0
  
  // Sort miners by output (strongest first) to maximize production
  const sortedMiners = [...state.miners]
    .filter(m => m.isActive)
    .sort((a, b) => b.btcPerRound - a.btcPerRound)
  
  for (const miner of sortedMiners) {
    if (usedPower + miner.powerUsage <= effectiveCapacity) {
      output += miner.btcPerRound
      usedPower += miner.powerUsage
    }
  }
  
  // Apply event modifier for mining output
  if (state.currentEvent?.effect === "mining_output") {
    output *= state.currentEvent.modifier
  }
  
  return output
}

/**
 * Generate random BTC price change for the round
 */
function generatePriceChange(): number {
  const min = GAME_CONSTANTS.PRICE_CHANGE_MIN
  const max = GAME_CONSTANTS.PRICE_CHANGE_MAX
  return min + Math.random() * (max - min)
}

/**
 * Generate a random event for the round
 */
function generateEvent(): GameEvent {
  const template = EVENT_POOL[Math.floor(Math.random() * EVENT_POOL.length)]
  return {
    ...template,
    id: generateId(),
  }
}

/**
 * Calculate final score at game end
 */
export function calculateFinalScore(state: BitcoinGameState): number {
  return Math.floor(state.coins + (state.eduBtc * state.btcPrice))
}

// ============== GAME ACTIONS ==============

/**
 * Clear any error message
 */
export function clearError(state: BitcoinGameState): BitcoinGameState {
  return { ...state, errorMessage: null }
}

/**
 * Upgrade learning level
 */
export function upgradeLearning(state: BitcoinGameState): BitcoinGameState {
  // Validations
  if (state.currentPhase !== "learn") {
    return { ...state, errorMessage: "Can only upgrade learning during Learn phase" }
  }
  if (state.learnActionUsedThisRound) {
    return { ...state, errorMessage: "Already used learning action this round" }
  }
  if (state.learningLevel >= GAME_CONSTANTS.MAX_LEARNING_LEVEL) {
    return { ...state, errorMessage: "Learning level is already maxed" }
  }
  if (state.coins < GAME_CONSTANTS.LEARNING_UPGRADE_COST) {
    return { ...state, errorMessage: "Not enough Coins for learning upgrade" }
  }
  
  return {
    ...state,
    coins: state.coins - GAME_CONSTANTS.LEARNING_UPGRADE_COST,
    learningLevel: state.learningLevel + 1,
    learnActionUsedThisRound: true,
    errorMessage: null,
  }
}

/**
 * Upgrade electricity capacity
 */
export function upgradeElectricity(state: BitcoinGameState): BitcoinGameState {
  // Validations
  if (state.currentPhase !== "learn") {
    return { ...state, errorMessage: "Can only upgrade electricity during Learn phase" }
  }
  if (state.learnActionUsedThisRound) {
    return { ...state, errorMessage: "Already used learning action this round" }
  }
  if (state.electricityCapacity >= GAME_CONSTANTS.MAX_ELECTRICITY_CAPACITY) {
    return { ...state, errorMessage: "Electricity capacity is already maxed" }
  }
  if (state.coins < GAME_CONSTANTS.POWER_UPGRADE_COST) {
    return { ...state, errorMessage: "Not enough Coins for power upgrade" }
  }
  
  return {
    ...state,
    coins: state.coins - GAME_CONSTANTS.POWER_UPGRADE_COST,
    electricityCapacity: state.electricityCapacity + 1,
    learnActionUsedThisRound: true,
    errorMessage: null,
  }
}

/**
 * Purchase a new miner
 */
export function purchaseMiner(state: BitcoinGameState, minerType: MinerType): BitcoinGameState {
  // Can purchase in learn or mine phase
  if (state.currentPhase !== "learn" && state.currentPhase !== "mine") {
    return { ...state, errorMessage: "Can only purchase miners during Learn or Mine phase" }
  }
  
  // If in learn phase, this counts as the learning action
  if (state.currentPhase === "learn" && state.learnActionUsedThisRound) {
    return { ...state, errorMessage: "Already used learning action this round" }
  }
  
  if (state.minerPurchasedThisRound) {
    return { ...state, errorMessage: "Can only purchase one miner per round" }
  }
  if (state.miners.length >= GAME_CONSTANTS.MAX_MINERS) {
    return { ...state, errorMessage: "Maximum miners reached (3)" }
  }
  
  const minerTemplate = MINER_TYPES[minerType]
  if (state.coins < minerTemplate.cost) {
    return { ...state, errorMessage: `Not enough Coins for ${minerTemplate.name}` }
  }
  
  const newMiner: Miner = {
    id: generateId(),
    ...minerTemplate,
    isActive: true,
  }
  
  return {
    ...state,
    coins: state.coins - minerTemplate.cost,
    miners: [...state.miners, newMiner],
    minerPurchasedThisRound: true,
    learnActionUsedThisRound: state.currentPhase === "learn" ? true : state.learnActionUsedThisRound,
    errorMessage: null,
  }
}

/**
 * Buy EduBTC
 */
export function buyBtc(state: BitcoinGameState, amount: number): BitcoinGameState {
  if (state.currentPhase !== "trade") {
    return { ...state, errorMessage: "Can only trade during Trade phase" }
  }
  if (amount <= 0) {
    return { ...state, errorMessage: "Amount must be positive" }
  }
  if (amount > GAME_CONSTANTS.MAX_TRADE_PER_ROUND - state.btcBoughtThisRound) {
    return { ...state, errorMessage: `Can only buy up to ${GAME_CONSTANTS.MAX_TRADE_PER_ROUND} EduBTC per round` }
  }
  if (state.eduBtc + amount > GAME_CONSTANTS.MAX_EDUBTC_HOLDING) {
    return { ...state, errorMessage: `Cannot hold more than ${GAME_CONSTANTS.MAX_EDUBTC_HOLDING} EduBTC` }
  }
  
  const cost = amount * state.btcPrice
  if (cost > state.coins) {
    return { ...state, errorMessage: "Not enough Coins to buy" }
  }
  
  return {
    ...state,
    coins: state.coins - cost,
    eduBtc: Math.round((state.eduBtc + amount) * 1000) / 1000,
    btcBoughtThisRound: state.btcBoughtThisRound + amount,
    errorMessage: null,
  }
}

/**
 * Sell EduBTC
 */
export function sellBtc(state: BitcoinGameState, amount: number): BitcoinGameState {
  if (state.currentPhase !== "trade") {
    return { ...state, errorMessage: "Can only trade during Trade phase" }
  }
  if (amount <= 0) {
    return { ...state, errorMessage: "Amount must be positive" }
  }
  if (amount > GAME_CONSTANTS.MAX_TRADE_PER_ROUND - state.btcSoldThisRound) {
    return { ...state, errorMessage: `Can only sell up to ${GAME_CONSTANTS.MAX_TRADE_PER_ROUND} EduBTC per round` }
  }
  if (amount > state.eduBtc) {
    return { ...state, errorMessage: "Not enough EduBTC to sell" }
  }
  
  const revenue = amount * state.btcPrice
  
  return {
    ...state,
    coins: state.coins + revenue,
    eduBtc: Math.round((state.eduBtc - amount) * 1000) / 1000,
    btcSoldThisRound: state.btcSoldThisRound + amount,
    errorMessage: null,
  }
}

/**
 * Advance to the next phase
 */
export function advancePhase(state: BitcoinGameState): BitcoinGameState {
  if (state.isGameOver) {
    return state
  }
  
  const phaseOrder: GamePhase[] = ["learn", "mine", "trade", "event", "costs", "complete"]
  const currentIndex = phaseOrder.indexOf(state.currentPhase)
  
  if (currentIndex === -1 || currentIndex >= phaseOrder.length - 1) {
    return state
  }
  
  let newState = { ...state, errorMessage: null }
  const nextPhase = phaseOrder[currentIndex + 1]
  
  // Process phase transitions
  switch (nextPhase) {
    case "mine": {
      // Mining happens automatically when entering mine phase
      const miningOutput = calculateMiningOutput(newState)
      const newBtc = Math.min(
        newState.eduBtc + miningOutput,
        GAME_CONSTANTS.MAX_EDUBTC_HOLDING
      )
      newState = {
        ...newState,
        eduBtc: Math.round(newBtc * 1000) / 1000,
        currentPhase: "mine",
        // Clear the mining disabled flag after it has taken effect
        miningDisabledNextRound: false,
      }
      break
    }
    
    case "trade": {
      // Update BTC price when entering trade phase (random -20% to +20%)
      const priceChange = generatePriceChange()
      const newPrice = newState.btcPrice * (1 + priceChange)
      
      newState = {
        ...newState,
        btcPrice: Math.round(newPrice),
        currentPhase: "trade",
      }
      break
    }
    
    case "event": {
      // Generate random event
      const event = generateEvent()
      let updatedPrice = newState.btcPrice
      
      // Apply event effect to BTC price immediately if applicable
      if (event.effect === "btc_price") {
        updatedPrice = Math.round(newState.btcPrice * event.modifier)
      }
      
      newState = {
        ...newState,
        currentEvent: event,
        btcPrice: updatedPrice,
        currentPhase: "event",
      }
      break
    }
    
    case "costs": {
      // Calculate and deduct costs
      const powerUsed = getTotalPowerUsage(newState.miners)
      const electricityCost = powerUsed * GAME_CONSTANTS.ELECTRICITY_COST_PER_UNIT
      const maintenanceCost = newState.miners.length * GAME_CONSTANTS.MINER_MAINTENANCE_COST
      const totalCosts = electricityCost + maintenanceCost
      
      let disableMining = false
      let finalCoins = newState.coins - totalCosts
      
      // If costs exceed balance, don't go negative but disable mining next round
      if (finalCoins < 0) {
        disableMining = true
        finalCoins = newState.coins // Don't deduct if insufficient
      }
      
      // Record round history
      const roundRecord: RoundHistory = {
        round: newState.currentRound,
        startCoins: state.coins,
        endCoins: finalCoins,
        btcMined: calculateMiningOutput(state),
        btcTraded: newState.btcBoughtThisRound - newState.btcSoldThisRound,
        event: newState.currentEvent,
        costsPaid: disableMining ? 0 : totalCosts,
      }
      
      newState = {
        ...newState,
        coins: finalCoins,
        miningDisabledNextRound: disableMining,
        currentPhase: "costs",
        roundHistory: [...newState.roundHistory, roundRecord],
      }
      break
    }
    
    case "complete": {
      // Check if game should end or start new round
      if (newState.currentRound >= GAME_CONSTANTS.TOTAL_ROUNDS) {
        newState = {
          ...newState,
          currentPhase: "complete",
          isGameOver: true,
        }
      } else {
        // Start new round - mining disabled flag carries over to affect the new round's mining
        // It will be cleared after the mine phase processes it
        newState = {
          ...newState,
          currentRound: newState.currentRound + 1,
          currentPhase: "learn",
          learnActionUsedThisRound: false,
          minerPurchasedThisRound: false,
          btcBoughtThisRound: 0,
          btcSoldThisRound: 0,
          currentEvent: null,
          // Keep miningDisabledNextRound as-is, it will be processed in mine phase
        }
      }
      break
    }
    
    default:
      newState.currentPhase = nextPhase
  }
  
  return newState
}

/**
 * Skip the current phase (for optional phases like trade)
 */
export function skipPhase(state: BitcoinGameState): BitcoinGameState {
  // Only trade phase can be skipped
  if (state.currentPhase === "trade") {
    return advancePhase(state)
  }
  return state
}

/**
 * Reset the game to initial state
 */
export function resetGame(): BitcoinGameState {
  return createInitialState()
}
