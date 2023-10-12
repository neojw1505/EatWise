<template>
  <div class="m-3">
    <h5 class="fw-bold" style="color: #7aaab4">Recommended Recipes</h5>
    <!-- creating slide container for RecommendedRecipes -->
    <swiper
    :slidesPerView="1"
    :centeredSlides="false"
    :slidesPerGroupSkip="0"
    :grabCursor="true"
    :keyboard="{
      enabled: true,
    }"
    :breakpoints="{
      '300': {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      '550': {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      '760': {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      '950': {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      '1200': {
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
      '1400': {
        slidesPerView: 6,
        slidesPerGroup: 6,
      },
      '1800':{
        slidesPerView: 7,
        slidesPerGroup: 7,
      },
      '2100':{
        slidesPerView: 8,
        slidesPerGroup: 8,
      },
      '2400':{
        slidesPerView: 9,
        slidesPerGroup: 9,
      }
    }"
    :scrollbar="true"
    :navigation="true"
    :pagination="{
      clickable: true,
      type: 'fraction',
      
    }"
    :modules="modules"
    class="mySwiper p-5 pt-2 shadow border rounded-4 "
  >
      <swiper-slide  v-for="item in dummyRecipe" :key="item.recipeName"
        ><FindRecipePreviewCard
          class="swiper-slide"
          :recipe="item"
          :routerTO="item.routerTO"
          style="text-decoration: none;" 
      /></swiper-slide>
      
    </swiper>

  </div>
</template>

<script>
import healthyRecipeImage from "../card/healthymeal.jpeg";

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
  name: "RecommendedRecipes",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      dummyRecipe: [
        {recipeName: "This is a dummy data",
        recipeImage: healthyRecipeImage,
        cal: 100,
        routerTO: "/find-recipes",},
        {recipeName: "This is a dummy data",
        recipeImage: healthyRecipeImage,
        cal: 100,
        routerTO: "/find-recipes",},
        {recipeName: "This is a dummy data",
        recipeImage: healthyRecipeImage,
        cal: 100,
        routerTO: "/find-recipes",},
        {recipeName: "This is a dummy data",
        recipeImage: healthyRecipeImage,
        cal: 100,
        routerTO: "/find-recipes",},
        {recipeName: "This is a dummy data",
        recipeImage: healthyRecipeImage,
        cal: 100,
        routerTO: "/find-recipes",},
        {recipeName: "This is a dummy data",
        recipeImage: healthyRecipeImage,
        cal: 100,
        routerTO: "/find-recipes",},
        {recipeName: "This is a dummy data",
        recipeImage: healthyRecipeImage,
        cal: 100,
        routerTO: "/find-recipes",},
        {recipeName: "This is a dummy data",
        recipeImage: healthyRecipeImage,
        cal: 100,
        routerTO: "/find-recipes",},
        {recipeName: "This is a dummy data",
        recipeImage: healthyRecipeImage,
        cal: 100,
        routerTO: "/find-recipes",},
        {recipeName: "This is a dummy data",
        recipeImage: healthyRecipeImage,
        cal: 100,
        routerTO: "/find-recipes",},
        {recipeName: "This is a dummy data",
        recipeImage: healthyRecipeImage,
        cal: 100,
        routerTO: "/find-recipes",},
        {recipeName: "This is a dummy data",
        recipeImage: healthyRecipeImage,
        cal: 100,
        routerTO: "/find-recipes",},
        {recipeName: "This is a dummy data",
        recipeImage: healthyRecipeImage,
        cal: 100,
        routerTO: "/find-recipes",},
        {recipeName: "This is a dummy data",
        recipeImage: healthyRecipeImage,
        cal: 100,
        routerTO: "/find-recipes",},
        {recipeName: "This is a dummy data",
        recipeImage: healthyRecipeImage,
        cal: 100,
        routerTO: "/find-recipes",},
        {recipeName: "This is a dummy data",
        recipeImage: healthyRecipeImage,
        cal: 100,
        routerTO: "/find-recipes",},
        {recipeName: "This is a dummy data",
        recipeImage: healthyRecipeImage,
        cal: 100,
        routerTO: "/find-recipes",},
        {recipeName: "This is a dummy data",
        recipeImage: healthyRecipeImage,
        cal: 100,
        routerTO: "/find-recipes",},
        {recipeName: "This is a dummy data",
        recipeImage: healthyRecipeImage,
        cal: 100,
        routerTO: "/find-recipes",},
        {recipeName: "This is a dummy data",
        recipeImage: healthyRecipeImage,
        cal: 100,
        routerTO: "/find-recipes",},

    ],
    };
  },
};
</script>

<style scoped>


</style>
