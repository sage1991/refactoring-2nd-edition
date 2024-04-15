import { type Invoice, type Performance } from "../@types/Invoice"
import { type Play, type Plays } from "../@types/Plays"
import { createPerformanceCalculator } from "./PerformanceCalculator"

export interface EnrichedPerformance extends Performance {
  play: Play
  amount: number
  volumeCredits: number
}

export interface StatementData {
  customer: string
  performances: EnrichedPerformance[]
  totalAmount: number
  totalVolumeCredits: number
}

export const createStatementData = (
  invoice: Invoice,
  plays: Plays
): StatementData => {
  const playFor = ({ playID }: Performance) => plays[playID as keyof Plays]

  const totalVolumeCredits = (performances: EnrichedPerformance[]) => {
    return performances.reduce((total, performance) => {
      return total + performance.volumeCredits
    }, 0)
  }

  const totalAmount = (performances: EnrichedPerformance[]) => {
    return performances.reduce((total, performance) => {
      return total + performance.amount
    }, 0)
  }

  const enrichPerformance = (performance: Performance) => {
    const calculator = createPerformanceCalculator(
      performance,
      playFor(performance)
    )
    return {
      ...performance,
      play: playFor(performance),
      amount: calculator.amount,
      volumeCredits: calculator.volumeCredits
    }
  }

  const enrichedPerformance = invoice.performances.map(enrichPerformance)

  return {
    customer: invoice.customer,
    performances: enrichedPerformance,
    totalAmount: totalAmount(enrichedPerformance),
    totalVolumeCredits: totalVolumeCredits(enrichedPerformance)
  }
}
