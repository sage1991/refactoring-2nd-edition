import { type Performance } from "../@types/Invoice"
import { type Play } from "../@types/Plays"

abstract class PerformanceCalculator {
  constructor(
    protected readonly performance: Performance,
    protected readonly play: Play
  ) {}

  abstract get amount(): number
  abstract get volumeCredits(): number
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30)
    }
    return result
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0)
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20)
    }
    result += 300 * this.performance.audience
    return result
  }

  get volumeCredits() {
    return (
      Math.max(this.performance.audience - 30, 0) +
      Math.floor(this.performance.audience / 5)
    )
  }
}

export const createPerformanceCalculator = (
  performance: Performance,
  play: Play
): PerformanceCalculator => {
  switch (play.type) {
    case "tragedy":
      return new TragedyCalculator(performance, play)
    case "comedy":
      return new ComedyCalculator(performance, play)
    default:
      throw new Error(`unknown type: ${play.type}`)
  }
}
