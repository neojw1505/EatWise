<template>
  <div class="Chart-Container container bg-white">
    <div class="date-range-selector">
      <label for="startDate">Start Date:</label>
      <input type="date" id="startDate" v-model="startDate" @change="updateChart" />

      <label for="endDate">End Date:</label>
      <input type="date" id="endDate" v-model="endDate" @change="updateChart" />
    </div>

    <canvas id="lineChart" class="mx-auto" style="width: 100%;"></canvas>
  </div>
</template>


<script>
import Chart from 'chart.js/auto';
import moment from 'moment';
import 'chartjs-adapter-date-fns';

export default {
  name: 'LineChart',
  data() {
    return {
      recommendedCalories: 0,
      consumptionDay: [],
      totalCaloriesByDate: [], // Store your total calories by date here
      // totalCaloriesByWeek: [],
      // totalCaloriesByMonth: [],
      selectedTimeFrame: 'Day',
      startDate: '',
      endDate: '',
      minDate: '',
    };
  },
  async mounted() {
    await this.getDefaultDateRange();
    await this.getRecommendedCalories();
    await this.getConsumption(this.startDate, this.endDate); // Call getConsumption on page load
    await this.renderLineChart(this.totalCaloriesByDate);
  },
  methods: {
    async getConsumption(startDate, endDate) {
  this.consumptionDay = []; // Initialize the array
  this.totalCaloriesByDate = []; // Initialize an array to store total calories by date

  const currentDate = moment(startDate, 'YYYY-MM-DD'); // Initialize with the startDate

  // Loop while currentDate is less than or equal to the endDate
  while (currentDate.isSameOrBefore(moment(endDate, 'YYYY-MM-DD'))) {
    const date = currentDate.format('YYYY-M-D');

    try {
      // Make the API call for the current date (replace with your actual API call)
      const consumptionData = await this.$smAPI.GetConsumptionHistoryForDate(date);

      const pushDate = moment(date, 'YYYY-M-D').format('YYYY-MM-DD');
      // Convert the date to a timestamp in milliseconds
      const timestamp = new Date(pushDate + ' 00:00:00 GMT+0800').getTime();
      // Push the data into the consumptionDay array as an object
      this.consumptionDay.push({ day: timestamp, consumption: consumptionData });
      console.log(this.consumptionDay)
    } catch (error) {
      // Handle any API call errors here, e.g., log them or throw an exception
      console.error(`Error fetching data for ${date}: ${error.message}`);
    }

    // Move to the next date
    currentDate.add(1, 'day');
  }
  console.log(this.consumptionDay)
  

  for (const indivConsumption of this.consumptionDay) {
    let totalCalories = 0; // Initialize the totalCalories variable for each date

    // Loop through each consumption data
    for (const key in indivConsumption.consumption) {
      // Check if the key exists and contains calorie information
      if (indivConsumption.consumption[key]?.recipe?.nutrition?.calories) {
        totalCalories += parseInt(indivConsumption.consumption[key].recipe.nutrition.calories);
      } else if (indivConsumption.consumption[key]?.recipe?.nutrition?.nutrients[0]?.amount) {
        // If calories aren't available, try to get the first nutrient's amount
        totalCalories += parseInt(indivConsumption.consumption[key].recipe.nutrition.nutrients[0].amount);
      }
    }

    // Convert totalCalories to an integer to remove leading zeros
    totalCalories = parseInt(totalCalories);

    this.totalCaloriesByDate.push({ day: indivConsumption.day, totalCalories });
  }

  console.log('Total Calories By Date:', this.totalCaloriesByDate);
},

renderLineChart() {
      const ctx = document.getElementById('lineChart');
      const labels = this.totalCaloriesByDate.map(item => item.day);
      const calories = this.totalCaloriesByDate.map(item => item.totalCalories);

      // Create a horizontal line at the recommendedCalories value
      const recommendedLine = Array(calories.length).fill(this.recommendedCalories);
      
      if (this.myChart) {
        this.myChart.data.labels = labels;
        this.myChart.data.datasets[0].data = calories;
        this.myChart.data.datasets[1].data = recommendedLine; // Set the recommendedCalories line
        this.myChart.update();
      } else {
        this.myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Calorie Intake',
                data: calories,
                borderWidth: 3,
                fill: true,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.35,
                pointBackgroundColor: 'rgb(255, 99, 132)',
              },
              {
                label: 'Recommended Calories',
                data: recommendedLine,
                borderWidth: 2,
                fill: false,
                borderColor: 'green', // You can choose the color you want
                borderDash: [5, 5], // Dotted line
                pointBackgroundColor: 'green',
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: 'timeseries',
                time: {
                  unit: 'day',
                },
              },
              y: {
                beginAtZero: true,
              },
            },
            responsive: false,
            maintainAspectRatio: true,
            showTooltips: true,
          },
        });
      }
    },

    async getDefaultDateRange() {
      const endDate = moment();
      const startDate = moment().subtract(7, 'days');
      this.startDate = startDate.format('YYYY-MM-DD');
      this.endDate = endDate.format('YYYY-MM-DD');
      this.minDate = startDate.format('YYYY-MM-DD');
    },

    async updateChart() {
      await this.getConsumption(this.startDate, this.endDate);
      this.renderLineChart();
    },

    async getRecommendedCalories() {
      // Get the recommended calories value and assign it to this.recommendedCalories
      const user = await this.$smAPI.getLoginUserProfile();
      this.recommendedCalories = user.DailyCalories; // Update with the actual property name
    },
  },
};
</script>

<style scoped>
</style>
