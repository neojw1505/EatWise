<template>
  <!-- <router-link :to="routerTO"> -->

  <div class="card col-4 cardStyle mx-3 py-3 px-0 my-3 " :style="backgroundStyle">
    <h5 class="card-text border bg-primary-subtle mx-auto rounded-4 p-1 fw-bold">{{ ProductData.supermarket }}</h5>
    <div class="text-center">
        <img class="card-img-top mx-0" :src="ProductData.image" alt="Product Image" />
        <h4 class="card-title fs-5 fw-bold" style="height: 25px">
        {{ formattedRecipeName }}
      </h4>
    </div>
      <div class="card-text fw-bold mx-auto">${{ ProductData.price.toFixed(2) }}</div>
      <div class="card-text fw-bold mx-auto">${{ ProductData.promotion }}</div>
  </div>
  <!-- </router-link> -->

</template>

<script>
export default {
  name: "MarketPreviewCard",
  data() {
    return {};
  },
  props: ["ProductData","backgroundStyle"],
  computed: {
    //in the event that the name of the recipe is too long, we shorten the name
    formattedRecipeName() {
      return this.ProductData.title.length > 20
        ? this.ProductData.title.slice(0, 17) + "..."
        : this.ProductData.title;
    },
  },
};
</script>

<style scoped>
.cardStyle {
  border: #000000 solid 1px;
  border-radius: 30px;
  width: 234px;
  height: 320px;
  color: black;
}
.fairprice{
    
}
</style>
