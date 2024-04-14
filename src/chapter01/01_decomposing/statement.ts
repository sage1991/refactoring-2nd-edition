import plays from "../plays.json"
import invoices from "../invoices.json"
import { type Invoice, type Performance } from "../@types/Invoice"
import { type Plays } from "../@types/Plays"

export const statement = (invoice: Invoice, plays: Plays) => {
  const playFor = ({ playID }: Performance) => plays[playID as keyof Plays]

  const usd = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    }).format(value / 100)
  }

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

  const totalVolumeCredits = () => {
    let result = 0
    for (const performance of invoice.performances) {
      result += volumeCreditsFor(performance)
    }
    return result
  }

  const totalAmount = () => {
    let result = 0
    for (const performance of invoice.performances) {
      result += amountFor(performance)
    }
    return result
  }

  let result = `Statement for ${invoice.customer}\n`
  for (const performance of invoice.performances) {
    // print line for this order
    result += `  ${playFor(performance).name}: ${usd(amountFor(performance))} (${performance.audience} seats)\n`
  }
  result += `Amount owed is ${usd(totalAmount())}\n`
  result += `You earned ${totalVolumeCredits()} credits\n`

  return result
}

invoices.forEach((invoice) => {
  const result = statement(invoice, plays)
  console.log(result)
})
