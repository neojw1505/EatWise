<template>
  <div class="card equal-card shadow mb-4">
    <!-- Remove the circle-overlay div -->
    <div class="rectangle-overlay shadow">
      <div class="promo-text">{{ product.product_promo }}</div>
    </div>
    <img class="card-img-top  rounded-4 text-center mx-auto" style="width:100%" :src="product.product_img" alt="Product Image" />
    <!-- Add a rectangle-overlay div -->
    
    <div class="card-content">
      <h5 class="card-title text-truncate-2 mt-1">{{ product.product_title }}</h5>
      <div>
        <p class="card-text">
          <strong>{{ product.product_price }}</strong> <br />
          {{ product.supermarket_name }}
        </p>
      </div>
    </div>
    <div class="d-flex mx-auto mb-2">
      <a :href="product.product_link" target="_blank" class="btn shadow">Check it Out!</a>
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
  background-color: #7A8CEA;
  transition: background-color 0.3s ease;
}
.card-img-top {
  height: 200px;
  object-fit: contain;
}
.btn {
  background-color: #303C6C;
  color: #fff;
}

.btn:hover {
  background-color: #fff;
  color: #303C6C;
}
.equal-card {
  width: 100%;
  width: 300px;
  height: 350px;
  border: 2px solid #000;
  border-radius: 20px;
  transition: transform 0.2s;
  display: flex;
  text-align: center;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.50) 99.99%, rgba(84, 84, 84, 0.00) 100%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  
}
/* Style the rectangle-overlay */
.rectangle-overlay {
  background-color: rgba(255, 0, 0, 0.7);
  color: #FFFBEE;
  padding: 10px;
  width: calc(100% - 20px); /* Take up the width of the card minus 20px for padding */
  position: absolute;
  top: 0;
  left: 10px; /* Adjust left positioning to 10px */
  right: 10px; /* Add right positioning to 10px */
  border-radius: 15px; /* Rounded corners for the entire overlay */
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
.card-title.text-truncate-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
