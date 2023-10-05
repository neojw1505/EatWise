<template>
    <div v-if="this.supermarketData">
        <div class="container text-center mx-auto">
        <div class="owl-carousel">
        <div class="card equal-card shadow mb-4" v-for="product in getRandomProducts()" :key="product.product_link">
              <div class="circle-overlay">
                <div class="promo-text">
                  {{ product.product_promo }}
                </div>
              </div>
              <img class="card-img-top" :src="product.product_img" alt="Product Image" />
              <div class="card-body">
                <h5 class="card-title">{{ product.product_title }}</h5>
                <div>
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
      </div>
  </template>
  
  <script>
  export default {
    mounted() {
      this.fetchProductsByPromo(); // Call the method here
    },
    data() {
      return {
        supermarketData: [],
        ascending: true, // default value is true, sort in increasing price
      };
    },
    methods: {
      getRandomProducts() {
        const shuffledData = [...this.supermarketData].sort(
          () => Math.random() - 0.5
        );
        // Return the first 10 items
        return shuffledData.slice(0, 24);
      },
  
      async fetchProductsByPromo() {
        this.supermarketData = await this.$smAPI.fetchProductsByPromo(false);
        this.getRandomProducts();
        this.initOwlCarousel();
      },

      initOwlCarousel() {
        // Use this.$nextTick to ensure the DOM is ready
        this.$nextTick(() => {
        $(".owl-carousel").owlCarousel({
            items: 3,
            autoplay: 2000, // Set the interval in milliseconds
            autoplaySpeed: 2000, // Use "autoplaySpeed" instead of "autoPlaySpeed"
            autoplayTimeout: 2000, // Use "autoplayTimeout" instead of "autoPlayTimeout"
            autoplayHoverPause: true,
            center: true,
        });
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
  .card-img-top {
    height: 300px; 
    object-fit: cover
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
  background-color: red;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  width: 6rem; /* Set a fixed width for the circle */
  height: 6rem; /* Set a fixed height for the circle */
  padding: 0; /* Remove padding */
  animation: circleAnimation 3s infinite;
  overflow: hidden; /* Hide any text that overflows the circle */
}

.promo-text {
  font-size: 16px;
  max-width: 100%; /* Allow text to take full width of the circle */
  text-align: center;
  white-space: normal; /* Allow text to wrap within the circle */
  padding: 5px; /* Add padding inside the circle to separate text from the edge */
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
  
  </style>