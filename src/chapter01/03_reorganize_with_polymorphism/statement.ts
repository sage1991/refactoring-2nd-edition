import plays from "../plays.json"
import invoices from "../invoices.json"
import { type Invoice } from "../@types/Invoice"
import { type Plays } from "../@types/Plays"
import { createStatementData, type StatementData } from "./createStatementData"
import { usd } from "./usd"

export const statement = (invoice: Invoice, plays: Plays) => {
  return renderPlainText(createStatementData(invoice, plays))
}

const renderPlainText = (data: StatementData) => {
  let result = `Statement for ${data.customer}\n`
  for (const performance of data.performances) {
    // print line for this order
    result += `  ${performance.play.name}: ${usd(performance.amount)} (${performance.audience} seats)\n`
  }
  result += `Amount owed is ${usd(data.totalAmount)}\n`
  result += `You earned ${data.totalVolumeCredits} credits\n`
  return result
}

invoices.forEach((invoice) => {
  const result = statement(invoice, plays)
  console.log(result)
})
