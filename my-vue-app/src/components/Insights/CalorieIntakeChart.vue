<template>
  <div class="Chart-Container container">
    <canvas id="lineChart" class="mx-auto" style="max-height: 500px;"></canvas>
    <div class="row justify-content-center my-2">
        <div class="d-flex justify-content-center">
          <button class="btn shadow mx-1" @click="changeTimeFrame('day')">Day</button>
          <button class="btn shadow mx-1" @click="changeTimeFrame('week')">Week</button>
          <button class="btn shadow mx-1" @click="changeTimeFrame('month')">Month</button>
        </div>
    </div>
  </div>
</template>

<script>
import Chart, { Colors } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

export default {
  name: 'LineChart',
  mounted() {
    const ctx = document.getElementById('lineChart');

    var day = [
      { x: Date.parse('2021-11-01 00:00:00 GMT+0800'), y: 18 },
      { x: Date.parse('2021-11-02 00:00:00 GMT+0800'), y: 16 },
      { x: Date.parse('2021-11-03 00:00:00 GMT+0800'), y: 5 },
      { x: Date.parse('2021-11-04 00:00:00 GMT+0800'), y: 3 },
      { x: Date.parse('2021-11-05 00:00:00 GMT+0800'), y: 12 },
      { x: Date.parse('2021-11-06 00:00:00 GMT+0800'), y: 8 },
      { x: Date.parse('2021-11-07 00:00:00 GMT+0800'), y: 22 }
    ];
    var week = [
      { x: Date.parse('2021-10-31 00:00:00 GMT+0800'), y: 50 },
      { x: Date.parse('2021-11-07 00:00:00 GMT+0800'), y: 60 },
      { x: Date.parse('2021-11-14 00:00:00 GMT+0800'), y: 80 },
      { x: Date.parse('2021-11-21 00:00:00 GMT+0800'), y: 40},
      { x: Date.parse('2021-11-28 00:00:00 GMT+0800'), y: 30 },
    ];

    var month = [
      { x: Date.parse('2021-08-01 00:00:00 GMT+0800'), y: 400 },
      { x: Date.parse('2021-09-02 00:00:00 GMT+0800'), y: 200 },
      { x: Date.parse('2021-10-03 00:00:00 GMT+0800'), y: 400 },
      { x: Date.parse('2021-11-04 00:00:00 GMT+0800'), y: 300 },
    ];

    // Define the Chart object
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Calorie Intake',
            data: day,
            borderWidth: 3,
            fill: true,
            borderColor: 'rgb(255, 177, 141)',
            tension: 0.35,
            pointBackgroundColor: 'rgb(255, 177, 141)',
          }
        ]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day'
            }
          },
          y: {
            beginAtZero: true
          }
        },
        responsive: true
      }
    });

    // Method to change the timeframe of the graph (fml)
    this.changeTimeFrame = function(period) {
      if (period === 'day') {
        myChart.config.options.scales.x.time.unit = 'day';
        myChart.config.data.datasets[0].data = day;
      }
      else if (period === 'week') {
        myChart.config.options.scales.x.time.unit = 'week';
        myChart.config.data.datasets[0].data = week;
      }
      else if (period === 'month') {
        myChart.config.options.scales.x.time.unit = 'month';
        myChart.config.data.datasets[0].data = month;
      }
      myChart.update(); // Update the chart without refreshing page
    };
  }
};
</script>

<style scoped>

.btn {
  background-color: #303C6C;
  color: #fff;
}
.btn:hover {
  background-color: #fff;
  color: #303C6C;
}
</style>
