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
import { NumericFormat } from 'react-number-format';
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
  const [principal, setPrincipal] = useState(undefined);
  const [interestRate, setInterestRate] = useState(undefined);
  const [years, setYears] = useState(undefined);
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

  const handleChangePrincipal = (value) => {
    setPrincipal(value);
  };

  const handleChangeInterest = (value) => {
    setInterestRate(value);
  };

  const handleChangePeriod = (value) => {
    setYears(value);
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
              <NumericFormat
                value={principal}
                placeholder='Example: Rp. 1.000.000'
                thousandSeparator=','
                prefix='Rp.'
                onValueChange={(values) => {
                  handleChangePrincipal(values.floatValue);
                }}
              />
            </div>

            {/* Period */}
            <div className={styles.inputWrapper}>
              <label>Investment Period (Years)</label>
              <NumericFormat
                value={years}
                placeholder="Example: 10 Years"
                onValueChange={({ floatValue }) => {
                  handleChangePeriod(floatValue);
                }}
              />
            </div>

            {/* Interest */}
            <div className={styles.inputWrapper}>
              <label>Annual Interest (%)</label>
              <NumericFormat
                value={interestRate}
                suffix=" %"
                placeholder="Example: 10 Years"
                onValueChange={({ floatValue }) => {
                  handleChangeInterest(floatValue);
                }}
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
