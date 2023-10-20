<template>
  <div class="p-4 pt-2 shadow border rounded-4 my-3 mt-4 d-flex row ">
    <MarketPreviewCard
      v-for="product in MarketResult"
      :key="product.title"
      :ProductData="product"
    />
  </div>
</template>

<script>
import productImage from "./healthymeal.jpeg";

export default {
  data() {
    return {
        // supermarketStyle:{
        //     "FairPrice":"background-image: linear-gradient(to bottom right, #ff0000, #ffffff);",
        //     "Cold Storage":"background-image: linear-gradient(to bottom right, #ff0000, #25b800,#ffffff);",
        //     "Sheng Shiong":"background-image: linear-gradient(to bottom right,#05fa11, #0059ff, #0077ff);"
        // },
      MarketResult: [
        {
          supermarket: "FairPrice",
          title: "Zavier",
          image: productImage,
          price: 3.30,
          promotion: "jun wei for free",
        },
        {
          supermarket: "Cold Storage",
          title: "Jun Wei",
          image: productImage,
          price: 3.30,
          promotion: "jun wei for free",
        },
        {
          supermarket: "Sheng Shiong",
          title: "Lumuel",
          image: productImage,
          price: 3.30,
          promotion: "jun wei for free",
        },
        {
          supermarket: "FairPrice",
          title: "Zhen Yue",
          image: productImage,
          price: 3.30,
          promotion: "jun wei for free",
        },
        {
          supermarket: "Sheng Shiong",
          title: "Kai Jie",
          image: productImage,
          price: 3.30,
          promotion: "jun wei for free",
        },
      ],
    };
  },
};
</script>

<style></style>
