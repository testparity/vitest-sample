import { expect, test } from 'vitest'
import { dollarsToCents, formatCurrency } from '../src/formatCurrency'

test('covers the core currency operations', () => {
  expect(formatCurrency(1234)).toBe('$12.34')
  expect(dollarsToCents(12.34)).toBe(1234)
})
