<template>
  <ul class="navbar-nav mb-2 mb-lg-0 text-center">
    <NavbarlinkCard
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
import market from '../images/market.png';
import progressTrackerImage from '../images/ProgressTracker.png'
import consumption from '../images/consumption.png'

import NavbarlinkCard from "./NavbarlinkCard.vue";

export default {
  name: "NavbarLinkSection1",
  components: {
    NavbarlinkCard,
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
          linkName: "Market",
          linkLogo: market,
          routeTo: "/market",
        },
        {
          linkName: "Insights",
          linkLogo: progressTrackerImage,
          routeTo: "/insights",
        },
        {
          linkName: "Consumption",
          linkLogo: consumption,
          routeTo: "/consumption",
        },
      ],
    };
  },
};
</script>

<style></style>
