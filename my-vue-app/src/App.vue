<template>
  <!-- <button @click="fetchProductsByPromo">Fetch Supermarket Data</button>
    Display supermarket data here
    <div class="owl-carousel">
      <div class="card" style="width: 18rem" v-for="product in supermarketData" :key="product.product_link">
        <img class="card-img-top" :src="product.product_img" />
        <div class="card-body">
          <h5 class="card-title">{{ product.product_title }}</h5>
          <p class="card-text">
            {{ product.product_promo }}
            {{ product.supermarket_name }}
            {{ product.product_price }}
          </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
    <br /> -->
  <router-view> 
  </router-view>
</template>

<script>
export default {
  data() {
    return {
      supermarketData: [],
      ascending: true, // default value is true, sort in increasing price
    };
  },
  methods: {
    async fetchProductsByPromo() {
      this.supermarketData = await this.$smAPI.fetchProductsByPromo(false);
      this.initOwlCarousel();
    },
    initOwlCarousel() {
      $(document).ready(function () {
        $(".owl-carousel").owlCarousel({
          items: 3,
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
* {
  cursor: url(https://cur.cursors-4u.net/nature/nat-10/nat927.ani),
    url(https://cur.cursors-4u.net/nature/nat-10/nat927.png), auto !important;
    overflow-x: hidden;

}
</style>
