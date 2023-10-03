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
          <img :src="product.product_img" alt="">
        </div>
      </div>
    <br>
  </div>
</template>

<script>
import * as smAPI from './firebaseService'; // Import all functions from smAPI

export default {
  name: 'YourComponentName',
  data() {
    return {
      title: 'pork', // this value should be '' then v-model to input text 
      supermarketData: [],
      supermarketName: 'FairPrice', // Other options include: ColdStorage, FairPrice 
      price: '5', // this value should be 0 by default (?) and then v-model to input text 
      ascending: true // default value is true, sort in increasing price
    };
  },
  methods: {
    async fetchAllProducts(){
      this.supermarketData = await smAPI.fetchAllProducts(); 
    },
    async fetchProductsBySupermarket(){
      this.supermarketData = await smAPI.fetchProductsBySupermarket(this.supermarketName, false);
    },
    async fetchProductsByTitle(){
      this.supermarketData = await smAPI.fetchProductsByTitle(this.title, false);
    },
    async fetchProductsByPrice(){
      this.supermarketData = await smAPI.fetchProductsByPrice(this.price);
    },
    async fetchProductsByTitleAndPrice(){
      this.supermarketData = await smAPI.fetchProductsByTitleAndPrice(this.title, this.price);
    },
    async fetchProductsByPromo(){
      this.supermarketData = await smAPI.fetchProductsByPromo();
    },
  },
  // You can use the `onMounted` hook to fetch data when the component is mounted
  // async mounted() {
  //   try {
  //     this.supermarketData = await smAPI.fetchAllProducts(); // Call the function you need
  //     // You can process or display the data here
  //   } catch (error) {
  //     console.error('Error fetching supermarket data:', error);
  //   }
  // },
};
</script>

<style></style>