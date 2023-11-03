<template>
  <div class="Chart-Container container bg-white">
    <div class="row">
      <div class="col-md-8 col-sm-12">
        <canvas id="pieChart" class="mx-auto my-2" style="max-height: 300px;"></canvas>
      </div>
      <div class="col-md-4 col-sm-12 my-auto">
        <div class="legend-container bg-white">
          <ul class="list-group">
            <li v-for="(item, index) in sortedData" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <span class="me-2" style="width: 16px; height: 16px; border-radius: 50%;" :style="{ backgroundColor: item.color }"></span>
                <span>{{ item.label }}</span>
              </div>
              <span><strong>{{ item.percentage }}%</strong></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  name: 'PieChart',
  data() {
    return {
      chartData: {
        labels: ['Protein', 'Fats', 'Carbs'],
        datasets: [
          {
            data: [500, 2500, 3000], // Replace with your dummy data
            backgroundColor: ['orange', 'purple', 'pink'],
          },
        ],
      },
      sortedData: [],
    };
  },
  mounted() {
    const ctx = document.getElementById('pieChart');
    const data = this.chartData.datasets[0].data;

    // Create an array of objects with label, data, and color
    this.sortedData = this.chartData.labels.map((label, index) => ({
      label,
      data: data[index],
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
          display: false, //suppose to hide default legend but its still here
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
};
</script>

<style scoped>
</style>
