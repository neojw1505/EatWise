<template>
  <!-- <router-link :to="routerTO"> -->
<a :href="ProductData.product_link" target="_blank" class="text-decoration-none">
  <div class="card col-4 cardStyle mx-3 py-3 px-0 my-3 " >
    <h5 class="card-text border bg-primary-subtle mx-auto rounded-4 p-1 fw-bold">{{ ProductData.supermarket_name }}</h5>
    <div class="text-center">
      <img class="card-img-top mx-0 rounded-4" :src="ProductData.product_img" alt="Product Image" />
      <div class="card-title fw-bold text-white" style="height: 25px">
        {{ formattedProductName }}
      </div>
    </div>
    <div class="card-text fw-bold mx-auto text-white">{{ ProductData.product_price }}</div>
    <div class="card-text fw-bold mx-auto text-white">{{ ProductData.product_promo }}</div>
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
  },
};
</script>

<style scoped>
.cardStyle {
  border: #000000 solid 1px;
  /* background-image: linear-gradient(to bottom right, #ff5100, #fac400); */
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.71) 100%, rgba(0, 0, 0, 0.21) 99.99%, rgba(0, 0, 0, 0.17) 100%);
  border-radius: 30px;
  width: 200px;
  height: 350px;
  color: black;
  transition: transform 0.3s;
}
.cardStyle:hover {
  transform: scale(1.05); /* Scale up by 10% on hover */
}
</style>
