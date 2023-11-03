<template>
  <div class="carousel-container">
    <h1 class="fw-bold text-center pb-4 pt-5" style="color:#fff; font-size:5vw;">Current <span style="color:#7A8CEA">Promotions</span></h1>
    <!-- creating slide container for RecommendedRecipes -->
    <swiper class="carousel rounded-4 shadow-5 px-5 py-4 pt-5 mySwiper"
    :slidesPerView="1"
    :loop="true"
    :centeredSlides="false"
    :slidesPerGroupSkip="0"
    :grabCursor="true"
    :scrollbar="true"
    :navigation="true"
    :pagination="{ clickable: true }"
    :modules="modules"
    :keyboard="{
      enabled: true,
    }"
    :breakpoints="{
      '760': {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      '800': {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      '1200': {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
    }"

  >
      <swiper-slide v-for="product in randomProducts" :key="product.product_link" >
        <new-promo-card
        :key="product.product_link"
        :product="product"
      /></swiper-slide>
      
    </swiper>

    <div class="text-center pt-3" >
        <button type="button" class="btn shadow" style="width: 30vw;">View More</button>
    </div>

  </div>
</template>
<script>
import NewPromoCard from "./NewPromoCard.vue";
import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
import 'swiper/css';

import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';
export default {
  setup() {
      return {
        modules: [Keyboard, Scrollbar, Navigation, Pagination],
      };
    },
  components: {
    NewPromoCard,
    Swiper,
    SwiperSlide,
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
  }

  .carousel{
    background-color: transparent;
  }

  h1 {
  font-size: 128px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.64px;  
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
</style>
