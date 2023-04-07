export function calculateCompoundInterest(
  principal,
  interestRate,
  timeYears,
) {

  const compoundedInterestRate = 1 + (interestRate / 100);
  let totalCompounded = Math.pow(compoundedInterestRate, timeYears);
  let currentFutureValue = principal;
  let currentYearGrowth = 0;
  let growth = [];

  for (let i = 1; i <= timeYears; i++) {
    currentYearGrowth = (currentFutureValue * (compoundedInterestRate - 1)).toFixed(2);
    currentFutureValue = (currentFutureValue * compoundedInterestRate).toFixed(2);
    growth.push({
      total: Number(currentFutureValue),
      years: i
    });
  }

  return {
    totalCompounded: (Number(currentFutureValue) - principal) / principal * 100,
    futureValue: Number(currentFutureValue),
    growth: growth
  };
}
