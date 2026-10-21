import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { loanConfigs } from "../app/components/EmiCalculator";
import { calculateEmi } from "../libs/calculators/emi";

describe("EMI Calculator Configuration & Mobile Math Invariants", () => {
  test("Loan configurations cover personal, business, and home loans with valid limits", () => {
    const loanTypes = ["personal", "business", "home"] as const;
    for (const type of loanTypes) {
      const config = loanConfigs[type];
      assert.ok(config, `Config for ${type} must exist`);
      assert.ok(config.defaultAmount >= config.minAmount, "Default amount must be >= minAmount");
      assert.ok(config.defaultAmount <= config.maxAmount, "Default amount must be <= maxAmount");
      assert.ok(config.defaultRate >= config.minRate, "Default rate must be >= minRate");
      assert.ok(config.defaultRate <= config.maxRate, "Default rate must be <= maxRate");
      assert.ok(config.amountPresets.length >= 4, "Must have at least 4 quick amount presets");
      assert.ok(config.bankPresets.length >= 3, "Must have at least 3 bank presets");
      assert.ok(config.tenurePresets.length >= 4, "Must have at least 4 tenure presets");
    }
  });

  test("Quick amount presets are strictly ascending and within configuration bounds", () => {
    for (const [key, config] of Object.entries(loanConfigs)) {
      let prev = 0;
      for (const preset of config.amountPresets) {
        assert.ok(
          preset.value > prev,
          `In ${key}, amount preset ${preset.label} (${preset.value}) must be greater than previous (${prev})`
        );
        assert.ok(
          preset.value >= config.minAmount && preset.value <= config.maxAmount,
          `In ${key}, amount preset ${preset.label} must be within bounds`
        );
        prev = preset.value;
      }
    }
  });

  test("calculateEmi engine generates accurate monthly installments and zero negative values", () => {
    // 5 Lakhs, 10.49%, 36 months
    const res = calculateEmi(500000, 10.49, 36);
    assert.ok(res.monthlyEmi > 16000 && res.monthlyEmi < 17000, `Expected monthly EMI ~16,248, got ${res.monthlyEmi}`);
    assert.ok(res.totalInterest > 0, "Total interest must be positive");
    assert.equal(res.totalPayment, 500000 + res.totalInterest, "Total payment must equal principal + interest");
    assert.equal(res.principalPercent + res.interestPercent, 100, "Percentages must sum to 100");
  });
});
