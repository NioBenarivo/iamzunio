import { useState } from "react";
import { motion } from "framer-motion";
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
import { headline } from "utils/animations";
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
  // Compounding Form State
  const [principal, setPrincipal] = useState("");
  const [interestRate, setInterestRate] = useState(0);
  const [years, setYears] = useState(0);
  const [hideForm, setHideForm] = useState(false);

  // Chart Data & Results
  const [chartData, setChartData] = useState(undefined);
  const [growthDetails, setGrowthDetails] = useState([]);
  const [totalReturnPercent, setTotalReturnPercent] = useState(0);
  const [totalReturnValue, setTotalReturnValue] = useState(0);

  const handleCalculate = () => {
    const { growth, totalCompounded, futureValue } = calculateCompoundInterest(
      principal,
      interestRate,
      years,
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

    setTotalReturnValue(futureValue);
    setTotalReturnPercent(totalCompounded);
    setGrowthDetails(growth);
    setHideForm(true);
    return setChartData(newChartData)
  };

  const handleRecalculate = () => {
    setHideForm(false);
    setChartData(undefined);
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
      {
        !hideForm && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={headline}
          >
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

            <button className={styles.button} onClick={handleCalculate}>
              Calculate
            </button>
          </motion.div>
        )
      }

      {/* Chart Data */}
      {!!chartData && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={headline}
        >
          <h2>Projected Growth</h2>
          <Line options={options} data={chartData} />

          <h2>Total Return</h2>
          <p>Total Changes (%): {totalReturnPercent}%</p>
          <p>Total Portfolio: {totalReturnValue}</p>

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

          <button className={styles.button} onClick={handleRecalculate}>
            Recalculate
          </button>
        </motion.div>
      )}      
    </div>
  );
}
