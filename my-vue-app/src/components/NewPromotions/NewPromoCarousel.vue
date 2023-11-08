<template>
  <div class="carousel-container">
    <h1 class="fw-bold text-center  pt-5" style="color:#fff;">Current <span style="color:#7A8CEA">Promotions</span></h1>
    <!-- creating slide container for RecommendedRecipes -->
    <swiper class="carousel rounded-4 shadow-5 pb-4 mySwiper"
    data-aos="fade-left" data-aos-duration="2000"
      :navigation="isWideScreen"
      :pagination="isWideScreen"
      :speed="2000"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: true,
      }"
      :modules="modules"
      :breakpoints="{
        '580': {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        '760': {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        '850': {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        '1100': {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
      }"
    >
      <swiper-slide v-for="product in randomProducts" :key="product.product_link" >
        <new-promo-card :key="product.product_link" :product="product" />
      </swiper-slide>
    </swiper>

    <div class="text-center pt-3" >
      <button type="button" class="btn shadow" style="width: 300px;" @click="goToMarket">View More</button>
    </div>
  </div>
</template>

<script>
import NewPromoCard from "./NewPromoCard.vue";
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

export default {
  setup() {
    return {
      modules: [Autoplay, Navigation, Pagination],
    };
  },
  components: {
    NewPromoCard,
    Swiper,
    SwiperSlide,
  },
  mounted() {
    this.fetchProductsByPromo();
    // Add an event listener to handle screen size changes
    window.addEventListener('resize', this.handleResize);
    // Initialize the isWideScreen property based on the initial screen size
    this.isWideScreen = window.innerWidth >= 480;
  },
  data() {
    return {
      isWideScreen: true,
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
    },
    async fetchProductsByPromoAndSupermarket() {
      this.supermarketData = await this.$smAPI.fetchProductsByPromoAndSupermarket(
        this.supermarketName,
        false
      );
    },
    goToMarket() {
      this.$store.dispatch('setviewPromo', true);
      this.$router.push({ path: '/market' });
    },
    handleResize() {
      // Update the isWideScreen property based on the current screen size
      this.isWideScreen = window.innerWidth >= 480;
    },
  },
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

.carousel-container{
  background-color: transparent;
  z-index: 0;
}

.carousel{
  background-color: transparent;
  z-index: 0;
}

h1 {
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.64px;  
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

@media screen and (min-width: 900px) {
  h1 {
    font-size: 80px;
  }
}

@media screen and (max-width: 600px) {
  h1 {
    font-size: 40px;
  }
}
</style>
