export function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100)
}

export function addTax(cents: number, taxRate: number): number {
  return Math.round(cents * (1 + taxRate))
}

export function applyFee(cents: number, fee: number): number {
  return cents + fee
}

export function clampCents(cents: number): number {
  return Math.max(0, cents)
}

export function centsToDollars(cents: number): number {
  return cents / 100
}
