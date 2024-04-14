import type invoices from "../invoices.json"

export type Invoice = (typeof invoices)[number]

export type Performance = Invoice["performances"][number]
