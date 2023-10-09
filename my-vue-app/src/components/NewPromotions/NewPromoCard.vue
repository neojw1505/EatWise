<template>
    <div class="card equal-card shadow mb-4">
      <!-- Remove the circle-overlay div -->
      <img class="card-img-top" :src="product.product_img" alt="Product Image" />
      <!-- Add a rectangle-overlay div -->
      <div class="rectangle-overlay">
        <div class="promo-text">{{ product.product_promo }}</div>
      </div>
      <div class="card-content">
        <h5 class="card-title">{{ product.product_title }}</h5>
        <div>
          <p class="card-text">
            <strong>{{ product.product_price }}</strong> <br />
            {{ product.supermarket_name }}
          </p>
        </div>
      </div>
      <div class="text-center card-button-container">
        <a :href="product.product_link" target="_blank" class="btn btn-primary">Check it Out!</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add hover effect to the card */
  .card:hover {
    background-color: #f0f0f0f4;
    transition: background-color 0.3s ease;
  }
  .card-img-top {
    height: 300px;
    object-fit: cover;
  }
  .equal-card {
    width: 100%;
    max-width: 22rem;
    height: 30rem;
    border: none;
    border-radius: 10px;
    transition: transform 0.2s;
  }
  /* Style the rectangle-overlay */
  .rectangle-overlay {
    background-color: rgba(255, 0, 0, 0.7);
    color: white;
    padding: 10px;
    width: calc(100% - 20px); /* Take up the width of the card minus 20px for padding */
    position: absolute;
    top: 0;
    left: 10px; /* Adjust left positioning to 10px */
    right: 10px; /* Add right positioning to 10px */
    border-radius: 15px; /* Rounded corners for the entire overlay */
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    animation: overlayAnimation 2s alternate infinite; /* Add an animation to the overlay */
}

.promo-text {
    font-size: 20px; /* Increase the font size for more prominence */
    font-weight: bold; /* Make the promo text bold */
    max-width: 100%;
    white-space: normal;
}

@keyframes overlayAnimation {
  0% {
    background-color: red;
    transform: scale(1);
  }
  50% {
    background-color: #ff5733; /* Change color at 50% of the animation */
    transform: scale(1.1);
  }
  100% {
    background-color: red;
    transform: scale(1);
  }
}
  .card-button-container {
    margin-top: auto;
    padding-bottom: 20px; /* Adjust as needed */
  }

  .btn-primary:hover{
  background-color: #133a8d;
  transition: background-color 0.4s ease; /* Add a smooth transition effect */
}

  </style>
  