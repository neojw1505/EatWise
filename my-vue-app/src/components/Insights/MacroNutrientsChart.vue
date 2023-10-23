<template>
  <div class="Chart-Container container bg-white">
    <div class="row">
      <div class="col-md-8 col-sm-12">
        <canvas id="pieChart" class="mx-auto my-2" style="max-height: 300px;"></canvas>
      </div>
      <div class="col-md-4 col-sm-12 my-auto">
        <div class="legend-container bg-white">
          <ul class="list-group">
            <li v-for="(label, index) in chartData.labels" :key="index" class="list-group-item d-flex align-items-center">
              <span class="me-2" style="width: 16px; height: 16px; border-radius: 50%;" :style="{ backgroundColor: chartData.datasets[0].backgroundColor[index] }"></span>
              <span>{{ label }}</span>
              <span class="text-end">{{ chartData.datasets[0].data[index] }}%</span>
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
        labels: ['Protein', 'Fats', 'Vitamins', 'Minerals', 'Water', 'Carbs'],
        datasets: [
          {
            data: [20, 15, 10, 5, 25, 30], // Replace with your dummy data
            backgroundColor: ['red', 'blue', 'green', 'orange', 'purple', 'pink'],
          },
        ],
      },
    };
  },
  mounted() {
    const ctx = document.getElementById('pieChart');

    new Chart(ctx, {
      type: 'doughnut',
      data: this.chartData,
      options: {
        responsive: false,
        legend: {
          display: false, // Hide default legend
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const total = dataset.data.reduce((sum, value) => sum + value, 0);
              const value = dataset.data[tooltipItem.index];
              const percentage = ((value / total) * 100).toFixed(2) + '%';
              return `${data.labels[tooltipItem.index]}: ${percentage}`;
            },
          },
        },
      },
    });
  },
};
</script>

<style scoped>

</style>
