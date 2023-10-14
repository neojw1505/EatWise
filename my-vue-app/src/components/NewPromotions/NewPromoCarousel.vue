<template>
  <div class="m-3">
    <h5 class="fw-bold" style="color: #7aaab4">Available Promotions</h5>
    <!-- creating slide container for RecommendedRecipes -->
    <swiper
    :slidesPerView="1"
    :loop="true"
    :centeredSlides="false"
    :slidesPerGroupSkip="0"
    :grabCursor="true"
    :scrollbar="true"
    :navigation="true"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: true,
    }"
    :pagination="{
      clickable: true,
      
    }"
    :modules="modules"
    :keyboard="{
      enabled: true,
    }"
    :breakpoints="{
      '300': {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      '550': {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      '760': {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      '950': {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      '1200': {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      '1400': {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      '1800':{
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
      '2100':{
        slidesPerView: 6,
        slidesPerGroup: 6,
      },
      '2400':{
        slidesPerView: 7,
        slidesPerGroup: 7,
      }
    }"
    

    class="mySwiper p-5 pt-2 shadow border rounded-4 "
  >
      <swiper-slide v-for="product in randomProducts" :key="product.product_link" >
        <new-promo-card
        :key="product.product_link"
        :product="product"
      /></swiper-slide>
      
    </swiper>

    <div class="text-center py-4">
        <button type="button" class="btn btn-primary pill">View More</button>
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
.btn-primary:hover{
  background-color: #133a8d;
  transition: background-color 0.4s ease; /* Add a smooth transition effect */
}
</style>
