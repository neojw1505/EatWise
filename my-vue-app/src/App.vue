<template>
  <div>
    <h1>Hello World</h1>
    <button @click="fetchProductsByPromo">Fetch Supermarket Data</button>
      <!-- Display supermarket data here -->
      <div :style="{display: 'flex'}" v-for='product in supermarketData' :key="product.product_link">
        <div :style="{ width: '50%'} ">
          <h1>Product Name: {{ product.product_title }}</h1>
          <h2 :style="{color: 'green'}">Product Price: {{ product.product_price }}</h2>
          <h2 :style="{color: 'red'}">Product Promo: {{ product.product_promo }}</h2>
          <h2 :style="{color: 'blue'}">Product Supermarket: {{ product.supermarket_name }}</h2>
        </div>
        <div :style="{ width: '50%'}"> 
          <img :style="{ width: '25%'}" :src="product.product_img" alt="">
        </div>
      </div>
    <br>
    <RandomRecipe/>
    <RecipesByIngredients/>
  </div>
</template>

<script>
export default {
  name: 'YourComponentName',
  data() {
    return {
      title: 'eggs', // this value should be '' then v-model to input text 
      supermarketData: [],
      supermarketName: 'FairPrice', // Other options include: ColdStorage, FairPrice 
      price: '5', // this value should be 0 by default (?) and then v-model to input text 
      ascending: true // default value is true, sort in increasing price
    };
  },
  methods: {
    async fetchAllProducts(){
      this.supermarketData = await this.$smAPI.fetchAllProducts(); 
    },
    async fetchProductsBySupermarket(){
      this.supermarketData = await this.$smAPI.fetchProductsBySupermarket(this.supermarketName, false);
    },
    async fetchProductsByTitle(){
      this.supermarketData = await this.$smAPI.fetchProductsByTitle(this.title, true);
    },
    async fetchProductsByPrice(){
      this.supermarketData = await this.$smAPI.fetchProductsByPrice(this.price, false);
    },
    async fetchProductsByTitleAndPrice(){
      this.supermarketData = await this.$smAPI.fetchProductsByTitleAndPrice(this.title, this.price);
    },
    async fetchProductsByPromo(){
      this.supermarketData = await this.$smAPI.fetchProductsByPromo(false);
    },
    async fetchProductsByPromoAndSupermarket(){
      this.supermarketData = await this.$smAPI.fetchProductsByPromoAndSupermarket(this.supermarketName, false);
    },
  },
  // You can use the `onMounted` hook to fetch data when the component is mounted
  // async mounted() {
  //   try {
  //     this.supermarketData = await this.$smAPI.fetchAllProducts(); // Call the function you need
  //     // You can process or display the data here
  //   } catch (error) {
  //     console.error('Error fetching supermarket data:', error);
  //   }
  // },
};
</script>

<style></style>