import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from "styles/compounding.module.css";
import { calculateCompoundInterest } from "../../utils/calculateCompoundingInterest";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

export default function Compounding() {
  const [principal, setPrincipal] = useState("");
  const [interestRate, setInterestRate] = useState(0);
  const [compoundFrequency, setCompoundFrequency] = useState(1);
  const [years, setYears] = useState(0);
  const [contributionAmount, setContributionAmount] = useState("");
  const [chartData, setChartData] = useState(undefined);
  const [growthDetails, setGrowthDetails] = useState([]);

  const handleCalculate = () => {
    const { growth } = calculateCompoundInterest(
      principal,
      interestRate,
      compoundFrequency,
      years,
      contributionAmount
    );

    const labels = growth.map((item) => `Year-${item.years}`);
    const totalAmount = growth.map((item) => item.total);
    const newChartData = {
      labels: labels,
      datasets: [{
        label: 'Compounding',
        data: totalAmount,
        borderColor: 'rgba(85, 214, 194, 1)',
        backgroundColor: 'rgba(85, 214, 194, 0.5)',
      }]
    }

    setGrowthDetails(growth);

    return setChartData(newChartData)
  };

  const handleChangePrincipal = (event) => {
    const inputValue = event.target.value;

    // Remove all non-numeric characters from the input value
    const numericValue = inputValue.replace(/[^0-9]/g, "");

    // Format the numeric value as a currency value
    const formattedValue = Number(numericValue).toLocaleString("en-US");

    // Set the formatted value as the new state value
    setPrincipal(formattedValue);
  };

  const handleChangeContribution = (event) => {
    const inputValue = event.target.value;

    // Remove all non-numeric characters from the input value
    const numericValue = inputValue.replace(/[^0-9]/g, "");

    // Format the numeric value as a currency value
    const formattedValue = Number(numericValue).toLocaleString("en-US");

    // Set the formatted value as the new state value
    setContributionAmount(formattedValue);
  };

  const handleChangeInterest = (e) => {
    const inputValue = event.target.value;
    const maxValue = 100; // Set the maximum value to 100

    if (Number(inputValue) <= maxValue) {
      setInterestRate(Number(inputValue));
    }
  };

  const handleChangePeriod = (e) => {
    const inputValue = event.target.value;
    const maxValue = 100; // Set the maximum value to 100

    if (Number(inputValue) <= maxValue) {
      setYears(Number(inputValue));
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Principal */}
      <div className={styles.inputWrapper}>
        <label>Principal / Capital</label>
        <input
          type="text"
          placeholder="Example: 100,000,000"
          value={principal}
          onChange={handleChangePrincipal}
        />
      </div>

      {/* Period */}
      <div className={styles.inputWrapper}>
        <label>Investment Period (Years)</label>
        <input
          type="text"
          placeholder="Example: 10 Years"
          max={100}
          value={years}
          onChange={handleChangePeriod}
        />
      </div>

      {/* Interest */}
      <div className={styles.inputWrapper}>
        <label>Annual Interest (%)</label>
        <input
          type="text"
          placeholder="Example: 8%"
          max={100}
          value={interestRate}
          onChange={handleChangeInterest}
        />
      </div>

      {/* Compound */}
      <div className={styles.inputWrapper}>
        <label>Compound Frequency</label>
        <select
          onChange={(e) => setCompoundFrequency(e.target.value)}
          value={compoundFrequency}
        >
          <option value={1}>Annualy</option>
          {/* <option value={12}>Monthly</option> */}
        </select>
      </div>

      {/* Principal */}
      <div className={styles.inputWrapper}>
        <label>Monthly Contribution</label>
        <input
          type="text"
          placeholder="Example: 10,000,000"
          value={contributionAmount}
          onChange={handleChangeContribution}
        />
      </div>

      <button className={styles.button} onClick={handleCalculate}>
        Calculate
      </button>


      {/* Chart Data */}
      {!!chartData && (
        <>
          <h2>Projected Growth</h2>
          <Line options={options} data={chartData} />
        </>
      )}

      {/* Summary */}
      {growthDetails.length > 0 && (
        <>
          <h2>Summary</h2>
          <div className={styles.flex}>
            <p>Years</p>
            <p>Amount</p>
          </div>
          {growthDetails.map((growth, index) => {
            const totalFormatted = Number(growth?.total).toLocaleString("en-US");
            return (
              <div className={styles.flex} key={`growth-${index}`}>
                <p>{growth?.years}</p>
                <p>{totalFormatted}</p>
              </div>
            )
          })}
        </>
      )}
    </div>
  );
}
