import { type Invoice, type Performance } from "../@types/Invoice"
import { type Play, type Plays } from "../@types/Plays"

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

  const amountFor = (performance: Performance) => {
    let result = 0
    switch (playFor(performance).type) {
      case "tragedy":
        result = 40000
        if (performance.audience > 30) {
          result += 1000 * (performance.audience - 30)
        }
        break
      case "comedy":
        result = 30000
        if (performance.audience > 20) {
          result += 10000 + 500 * (performance.audience - 20)
        }
        result += 300 * performance.audience
        break
      default:
        throw new Error(`unknown type: ${playFor(performance).type}`)
    }
    return result
  }

  const volumeCreditsFor = (performance: Performance) => {
    let result = Math.max(performance.audience - 30, 0) // add volume credits
    if (playFor(performance).type === "comedy") {
      result += Math.floor(performance.audience / 5) // add extra credit for every five comedy attendees
    }
    return result
  }

  const totalVolumeCredits = (performances: Performance[]) => {
    let result = 0
    for (const performance of performances) {
      result += volumeCreditsFor(performance)
    }
    return result
  }

  const totalAmount = (performances: Performance[]) => {
    let result = 0
    for (const performance of performances) {
      result += amountFor(performance)
    }
    return result
  }

  const enrichPerformance = (performance: Performance) => {
    return {
      ...performance,
      play: playFor(performance),
      amount: amountFor(performance),
      volumeCredits: volumeCreditsFor(performance)
    }
  }

  return {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
    totalAmount: totalAmount(invoice.performances),
    totalVolumeCredits: totalVolumeCredits(invoice.performances)
  }
}
