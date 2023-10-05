<template>
    <div>
      <button @click="fetchProductsByPromo" class="btn btn-primary mb-3">Fetch Supermarket Data</button>
      <!-- Display supermarket data here -->
      <div class="container text-center mx-auto">
        <div class="row justify-content-center">
          <div class="owl-carousel">
            <div class="card equal-card shadow mb-4" v-for="product in getRandomProducts()" :key="product.product_link">
              <div class="circle-overlay">
                <div class="promo-text">
                  {{ product.product_promo }}
                </div>
              </div>
              <img class="card-img-top" :src="product.product_img" alt="Product Image" style="height: 300px; object-fit: cover;">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">{{ product.product_title }}</h5>
                <div class="flex-grow-1 overflow-hidden"> <!-- Use flex-grow-1 to fill available space & overflow-hidden to hide overflow of text -->
                  <p class="card-text">
                    <strong>{{ product.product_price }}</strong> <br />
                    {{ product.supermarket_name }}
                  </p>
                </div>
                <div class="text-center">
                  <a href="#" class="btn btn-primary">Go Somewhere</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <a href="#" class="btn btn-primary">View More</a>
        </div>
      </div>
    </div>
  </template>
  
  
  
  

<script>

export default {
  data() {
    return {
      supermarketData: [],
      ascending: true, // default value is true, sort in increasing price
    };
  },
  methods: {
    getRandomProducts() {
      const shuffledData = [...this.supermarketData].sort(() => Math.random() - 0.5);
      // Return the first 10 items
      return shuffledData.slice(0, 24);
    },

    async fetchProductsByPromo() {
        this.supermarketData = await this.$smAPI.fetchProductsByPromo(false);
        this.initOwlCarousel();
    },

    initOwlCarousel() {
        $(document).ready(function(){
          $(".owl-carousel").owlCarousel(
            {
                items: 3,
                autoPlay: true,
                autoPlaySpeed: 2000,
                autoPlayTimeout: 2000,
                autoplayHoverPause: true,
                center: true
            }
          );
        });
    },

    async fetchProductsByPromoAndSupermarket() {
      this.supermarketData =
        await this.$smAPI.fetchProductsByPromoAndSupermarket(
          this.supermarketName,
          false
        );
    },
  },

};
</script>

<style scoped>
  /* Add hover effect to the card */
  .container {
    background-color: #1c4946; /* Pastel green color */
    padding: 1.5%; /* Add some padding for spacing */
}
  .card:hover {
    background-color: #f0f0f0; /* You can choose your desired highlight color */
    transition: background-color 0.3s ease; /* Smooth transition effect */
}

  .equal-card {
  width: 100%; 
  max-width: 20rem; /* Set a maximum width if needed */
  height: 30rem;
  border: none;
  border-radius: 10px;
  transition: transform 0.2s;
  margin-right: 1rem; /* Add right margin for spacing between cards */
}

.equal-card:last-child {
  margin-right: 0; /* Remove right margin from the last card */
}

.circle-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 6rem;
  height: 6rem;
  background-color: red;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  animation: circleAnimation 3s infinite;
}

@keyframes circleAnimation {
  0% {
    background-color: red;
    transform: scale(1);
  }
  50% {
    background-color: #ff5733;
    transform: scale(1.1);
  }
  100% {
    background-color: red;
    transform: scale(1);
  }
}

.promo-text {
  font-size: 16px;
  max-width: 100%;
  text-align: center;
}
</style>