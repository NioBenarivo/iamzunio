function removeCommas(value) {
  const newValue = value.replace(/,/g, '');
  return newValue
}

export function calculateCompoundInterest(
  principal,
  interestRate,
  compoundingFrequency,
  timeYears,
  monthlyContribution
) {
  const rate = interestRate / 100;
  const periods = compoundingFrequency;
  const time = timeYears;
  const contribution = removeCommas(monthlyContribution) || 0;
  const n = periods * time;
  const r = rate / periods;
  const p = removeCommas(principal);
  let total = 0;
  let growth = [];

  for (let i = 1; i <= n; i++) {
    const currentPeriod = i;
    const futureValue = p * (1 + r) ** currentPeriod;
    const futureContributionValue =
      contribution * (((1 + r) ** currentPeriod - 1) / r);
    total += futureValue + futureContributionValue;
    growth.push({
      total: total.toFixed(),
      years: i
    })
  }

  return {
    totalValue: total.toFixed(2),
    growth: growth
  };
}
