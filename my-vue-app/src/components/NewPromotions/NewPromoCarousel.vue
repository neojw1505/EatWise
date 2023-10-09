<template>
  <div v-if="supermarketData" class="smaller-container text-center mx-auto">
    <div class="owl-carousel">
      <new-promo-card
        v-for="product in randomProducts"
        :key="product.product_link"
        :product="product"
      />
    </div>

    <div class="text-center py-4">
        <button type="button" class="btn btn-primary pill">View More</button>
    </div>

  </div>
</template>

<script>
import NewPromoCard from "./NewPromoCard.vue";
export default {
  components: {
    NewPromoCard,
  },
  mounted() {
    this.fetchProductsByPromo();
  },
  data() {
    return {
      supermarketData: [],
      ascending: true,
    };
  },
  computed: {
    randomProducts() {
      const shuffledData = [...this.supermarketData].sort(
        () => Math.random() - 0.5
      );
      return shuffledData.slice(0, 24);
    },
  },
  methods: {
    async fetchProductsByPromo() {
      this.supermarketData = await this.$smAPI.fetchProductsByPromo(false);
      this.initOwlCarousel();
    },
    initOwlCarousel() {
      this.$nextTick(() => {
        $(".owl-carousel").owlCarousel({
          items: 3,
          autoPlay: 4000,
          autoPlaySpeed: 3000,
          autoPlayTimeout: 2000,
          autoPlayHoverPause: true,
          center: true,
          responsiveClass: true,
          responsive: {
            0: {
              items: 1,
            },
            480: {
              items: 2,
            },
            768: {
              items: 3,
            },
          },
          dotsContainer: '.custom-dots',
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

<style>
.smaller-container {
  max-width: 80rem;
  padding-inline-start: 5rem;
  background-color:#007459
}

.custom-dots {
  display: flex;
  justify-content: center;
  margin-top: 20px; /* Adjust as needed */
}

.btn-primary:hover{
  background-color: #133a8d;
  transition: background-color 0.4s ease; /* Add a smooth transition effect */
}
</style>
