<template>
    <div class="Chart-Container container">
      <canvas id="pieChart" class="mx-auto" style="max-height: 400px;"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  
  export default {
    name: 'PieChart',
    mounted() {
      const ctx = document.getElementById('pieChart');
  
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Protein', 'Fats', 'Vitamins', 'Minerals', 'Water', 'Carbohydrates'],
          datasets: [
            {
              data: [20, 15, 10, 5, 25, 30], // Replace with your dummy data
              backgroundColor: [
                'red', 'blue', 'green', 'orange', 'purple', 'pink'
              ]
            }
          ]
        },
        options: {
          responsive: true
        }
      });
    }
  };
  </script>
  
  <style scoped>
  </style>
  