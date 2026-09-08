/**
 * Fixture data for the signed-out demo.
 *
 * Allorca is archived: nobody can sign up any more, so the app has to be
 * viewable without an account. Every page falls back to this data when
 * there is no Clerk session. It is deliberately plain data with no database
 * and no API calls behind it, so the demo keeps working even if the
 * Supabase project is paused or the API keys are rotated.
 */

export const DEMO_FIRST_NAME = 'Alex'

export type DemoPosition = {
  id: string
  symbol: string
  name: string
  quantity: number
  averageCost: number
  currentPrice: number
}

export const DEMO_POSITIONS: DemoPosition[] = [
  { id: 'demo-pos-1', symbol: 'VTI',  name: 'Vanguard Total Stock Market ETF', quantity: 12, averageCost: 268.4,  currentPrice: 281.15 },
  { id: 'demo-pos-2', symbol: 'BND',  name: 'Vanguard Total Bond Market ETF',  quantity: 30, averageCost: 72.9,   currentPrice: 73.44 },
  { id: 'demo-pos-3', symbol: 'SCHD', name: 'Schwab US Dividend Equity ETF',   quantity: 18, averageCost: 27.15,  currentPrice: 28.02 },
  { id: 'demo-pos-4', symbol: 'AAPL', name: 'Apple Inc.',                      quantity: 4,  averageCost: 212.6,  currentPrice: 226.31 },
]

export const DEMO_PORTFOLIO = {
  id: 'demo-portfolio',
  totalValue: 10000,
  riskScore: 52,
  isActive: true,
  positions: DEMO_POSITIONS,
}

/** Shaped like the Prisma user the pages expect, including the active portfolio. */
export const DEMO_USER = {
  id: 'demo-user',
  clerkId: 'demo',
  email: 'demo@example.com',
  firstName: DEMO_FIRST_NAME,
  lastName: null,
  onboardingComplete: true,

  investmentGoal: 'wealth',
  timeHorizon: '5+',
  riskReaction: 'hold',
  riskAttitude: 'moderate',
  fluctuationComfort: '15-30',
  incomeStability: 'somewhat',
  emergencyFund: 'partial',
  investmentPercentage: '10-20',
  experienceLevel: 'beginner',
  previousInvestments: ['Savings account'],
  investingMindset: 'balanced',
  managementPreference: 'guided',

  riskScore: 52,
  portfolioType: 'BALANCED',
  disciplineScore: 34,
  roadmapCache: null,

  portfolios: [DEMO_PORTFOLIO],
}

/** Tickers the demo portfolio search can resolve without calling Finnhub. */
export const DEMO_STOCKS = [
  { symbol: 'VTI',  name: 'Vanguard Total Stock Market ETF', price: 281.15, change:  1.84, changePercent:  0.66 },
  { symbol: 'BND',  name: 'Vanguard Total Bond Market ETF',  price: 73.44,  change: -0.12, changePercent: -0.16 },
  { symbol: 'SCHD', name: 'Schwab US Dividend Equity ETF',   price: 28.02,  change:  0.09, changePercent:  0.32 },
  { symbol: 'AAPL', name: 'Apple Inc.',                      price: 226.31, change:  2.41, changePercent:  1.08 },
  { symbol: 'MSFT', name: 'Microsoft Corporation',           price: 418.77, change: -1.95, changePercent: -0.46 },
  { symbol: 'VOO',  name: 'Vanguard S&P 500 ETF',            price: 512.38, change:  3.11, changePercent:  0.61 },
]

export function findDemoStock(symbol: string) {
  const q = symbol.trim().toUpperCase()
  return DEMO_STOCKS.find((s) => s.symbol === q) ?? null
}

/**
 * The AI tutor normally calls Claude. Signed-out visitors get this recorded
 * exchange instead, so the feature can be seen without leaving an unauthenticated
 * route in front of the Anthropic API.
 */
export const DEMO_OUTLINE = [
  { step: 1, title: 'Start with what you own',        description: 'Before picking anything new, understand the four positions already in your paper portfolio and why the survey put them there.', priority: 'start here' as const },
  { step: 2, title: 'Index funds and diversification', description: 'Why a total-market fund like VTI behaves differently from a single stock, and what that means for a balanced profile.',        priority: 'start here' as const },
  { step: 3, title: 'Bonds as ballast',                description: 'Your 52 risk score put roughly a third of the portfolio in bonds. Learn what that is actually doing in a downturn.',           priority: 'recommended' as const },
  { step: 4, title: 'Rebalancing on a schedule',       description: 'How to keep the allocation you chose without reacting to headlines. Habit work, not stock picking.',                           priority: 'advanced' as const },
]

export const DEMO_CHAT: { role: 'user' | 'assistant'; content: string }[] = [
  { role: 'user', content: 'Why do I have bonds if I said I was comfortable with risk?' },
  {
    role: 'assistant',
    content:
      "Your survey put you at 52 out of 100, which lands in the Balanced band rather than the Aggressive one. You said you would hold through a drop rather than buy more, you are comfortable with 15-30% swings rather than 30%+, and your emergency fund is only partial. That last one matters most: bonds are there so a bad month does not force you to sell stocks at the worst time.\n\nIf your emergency fund filled out and your reaction moved to buying the dip, the same algorithm would push you toward Aggressive and thin out the bond position.",
  },
]
