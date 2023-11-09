<template>
  <div class="Chart-Container container bg-white">
    <div class="text-center fw-bold pt-3"><h2>Nutrients: Last 7 Days</h2></div>
    <div class="row">
      <div class="col-md-8 col-sm-12 align-items-center mx-auto">
        <canvas id="pieChart" class="mx-auto my-2" style="max-height: 300px;"></canvas>
      </div>
      <div class="col my-auto">
        <div class="legend-container bg-white mb-2">
          <ul class="list-group">
            <li v-for="(item, index) in sortedData" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <span class="me-2" style="width: 16px; height: 16px; border-radius: 50%;" :style="{ backgroundColor: item.color }"></span>
                <span>{{ item.label }}</span>
              </div>
              <span><strong style="float: right;">{{ item.percentage }}%</strong></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import moment from 'moment';

export default {
  name: 'PieChart',
  data() {
    return {
      chartData: {
        labels: ['Protein', 'Fats', 'Carbs'],
        datasets: [
          {
            data: [], // Initialize as an empty array
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)','rgb(255, 206, 86)'],
          },
        ],
      },
      sortedData: [],
      totalMacro: [], // Initialize totalMacro
    };
  },
  methods: {
  async getConsumption() {
  this.consumptionDay = []; // Initialize the array

  const currentDate = moment().format('YYYY-M-D'); // Get the current date in the desired format

  // Initialize totals for each macronutrient
  let totalCarbohydrates = 0;
  let totalFat = 0;
  let totalProtein = 0;

  for (let i = 0; i < 7; i++) {
    // Calculate the date for the current iteration (going back in time)
    let date = moment(currentDate, 'YYYY-M-D').subtract(i, 'days').format('YYYY-M-D');

    try {
      // Make the API call for the current date (replace with your actual API call)
      let consumptionData = await this.$smAPI.GetConsumptionHistoryForDate(date);

      // Iterate through the consumption data for the day
      for (const key in consumptionData) {
        if (consumptionData[key]?.recipe?.nutrition) {
          // Get the array of nutrients
          let nutrients = consumptionData[key].recipe.nutrition.nutrients;

          // Iterate through the nutrients to find the specific ones
          for (const nutrient of nutrients) {
            if (nutrient.name === 'Carbohydrates') {
              totalCarbohydrates += nutrient.amount;
            } else if (nutrient.name === 'Fat') {
              totalFat += nutrient.amount;
            } else if (nutrient.name === 'Protein') {
              totalProtein += nutrient.amount;
            }
          }
        }
      }
    } catch (error) {
      // Handle any API call errors here, e.g., log them or throw an exception
      console.error(`Error fetching data for ${date}: ${error.message}`);
    }
  }

  // Push the total macronutrient values for the past 7 days into this.totalMacro
  this.totalMacro.push(totalProtein, totalFat, totalCarbohydrates);

  console.log('Total Macro Last week:', this.totalMacro);
  this.renderPieChart();
},
renderPieChart() {
      const ctx = document.getElementById('pieChart');

      // Use this.totalMacro instead of this.chartData.datasets[0].data
      const data = this.totalMacro;

      // Create an array of objects with label, data, and color
      this.sortedData = this.chartData.labels.map((label, index) => ({
        label,
        data: this.totalMacro[index], // Use this.totalMacro
        color: this.chartData.datasets[0].backgroundColor[index],
        percentage: 0,
      }));

      // Calculate percentages
      const total = data.reduce((sum, value) => sum + value, 0);
      this.sortedData.forEach(item => {
        item.percentage = ((item.data / total) * 100).toFixed(2);
      });

      // Sort the array by data value
      this.sortedData.sort((a, b) => b.data - a.data);

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.sortedData.map(item => item.label),
          datasets: [
            {
              data: this.sortedData.map(item => item.data),
              backgroundColor: this.sortedData.map(item => item.color),
            },
          ],
        },
        options: {
          responsive: false,
          legend: {
            display: false, // Suppose to hide default legend but it's still here
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                const item = this.sortedData[tooltipItem.index];
                return `${item.label}: ${item.percentage}%`;
              }.bind(this),
            },
          },
        },
      });
  },

  },

  mounted() {
    this.getConsumption();
  }
};

</script>

<style scoped>
</style>
