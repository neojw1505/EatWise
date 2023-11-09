<template>
  <!-- <router-link :to="routerTO"> -->
  <a :href="ProductData.product_link" target="_blank" class="text-decoration-none">
    <div class="card cardStyle mx-2 py-3 px-0 my-2 "
      :style="{ 'background-image': 'url(' + ProductData.product_img + ')', 'background-size': 'cover', 'background-position': 'center' }">
      <div class="recipeInfo px-1">
        <div class=" border bg-light mx-auto btn py-0 mt-1 fw-bold">{{ ProductData.supermarket_name }}</div>
        <div class="card-title text-white fw-semibold" style="height: 35px;">
          {{ formattedProductName }}
        </div>
        <div class="card-text fw-bold mx-auto text-white">{{ ProductData.product_price }}</div>
        <div class="card-text bg-warning rounded-5 px-1 mt-2 fw-bold mx-auto text-white">{{ formattedPromo }}</div>
      </div>

    </div>
  </a>

  <!-- </router-link> -->
</template>

<script>
export default {
  name: "MarketPreviewCard",
  data() {
    return {};
  },
  props: ["ProductData"],
  computed: {
    //in the event that the name of the recipe is too long, we shorten the name
    formattedProductName() {
      return this.ProductData.product_title.length > 20
        ? this.ProductData.product_title.slice(0, 17) + "..."
        : this.ProductData.product_title;
    },
    formattedPromo() {
      if (this.ProductData.product_promo == "No promotion available") {
        return "No Promotion";
      }
      return this.ProductData.product_promo
    }
  },
};
</script>

<style scoped>
.cardStyle {
  border: #fff solid 1px;
  /* background-image: linear-gradient(to bottom right, #ff5100, #fac400); */
  border-radius: 20px;
  width: 198px;
  height: 250px;
  color: black;
  transition: transform 0.3s;
  position: relative;
}

.cardStyle:hover {
  transform: scale(1.05);
  /* Scale up by 10% on hover */
}

img {
  width: 90%;
}

.recipeInfo {
  background-image: linear-gradient(to bottom,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.5));
  position: absolute;
  bottom: 0;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  width: 100%;
  padding-bottom: 10px;
}

@media screen and (max-width: 604px) {
  .cardStyle {

    border: #fff solid 1px;
  /* background-image: linear-gradient(to bottom right, #ff5100, #fac400); */
  border-radius: 20px;
  width: 90vw;
  height: 250px;
  color: black;
  transition: transform 0.3s;
  position: relative;
  }
}
</style>
