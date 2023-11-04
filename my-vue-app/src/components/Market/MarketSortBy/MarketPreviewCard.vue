<template>
  <!-- <router-link :to="routerTO"> -->
<a :href="ProductData.product_link" target="_blank" class="text-decoration-none">
  <div class="card cardStyle mx-2 py-3 px-0 my-2 " >
    <div class="text-center">
      <img class="card-img-top rounded-4" :src="ProductData.product_img" alt="Product Image" />
      
      <h5 class="card-text border bg-light mx-auto rounded-2 mt-2 py-0 fw-bold">{{ ProductData.supermarket_name }}</h5>
      <div class="card-title text-white" style="height: 40px">
        {{ formattedProductName }}
      </div>
    </div>
    <div class="card-text fw-bold mx-auto text-white">{{ ProductData.product_price }}</div>
    <div class="card-text bg-warning rounded-5 px-1 mt-2 fw-bold mx-auto text-white">{{ ProductData.product_promo }}</div>
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
      return this.ProductData.product_title.length > 40
        ? this.ProductData.product_title.slice(0,37 ) + "..."
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
  border-radius: 20px;
  width: 198px;
  height: 350px;
  color: black;
  transition: transform 0.3s;
}
.cardStyle:hover {
  transform: scale(1.05); /* Scale up by 10% on hover */
}
img{
  width:90%;
}
</style>
