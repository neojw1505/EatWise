<template>
  <ul class="navbar-nav mb-2 mb-lg-0 text-center">
    <Navbarlink
      v-for="eachLink in linksToPages1"
      v-bind:eachLink="eachLink"
      :key="eachLink.linkName"
      :imgUrl="eachLink.linkLogo"
    />
  </ul>
</template>

<script>
// this page the all the navigation data(find recipe, view promotion, market) which consist of
// link name, link logo and the path they are directing once click

import findRecipeImage from '../images/find_recipe.png';
import view_promotion from '../images/view_promotion.png';
import market from '../images/market.png';

import Navbarlink from "./Navbarlink.vue";

export default {
  name: "NavbarLinkSection1",
  components: {
    Navbarlink,
  },
  data() {
    return {
      linksToPages1: [
        {
          linkName: "Find Recipes",
          linkLogo: findRecipeImage,
          routeTo: "/find-recipes",
        },
        {
          linkName: "View Promotions",
          linkLogo: view_promotion,
          routeTo: "/view-promotions",
        },
        {
          linkName: "Market",
          linkLogo: market,
          routeTo: "/market",
        },
      ],
    };
  },
};
</script>

<style></style>
