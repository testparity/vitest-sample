import { describe, expect, it } from 'vitest';
import { applyDiscount } from '../src/discount';
import { addTax, applyFee, clampCents } from '../src/formatCurrency';

describe('applyDiscount', () => {
  it('applies the standard discount', () => {
    const subtotal = clampCents(applyFee(addTax(90, 0.1), 1));

    expect(applyDiscount(subtotal)).toBe(90);
  });
});
