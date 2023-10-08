<template>
  <ul class="navbar-nav mb-2 mb-lg-0 text-center">
    <NavbarSearch />
    <NavbarlinkCard
      v-for="eachLink in linksToPages2"
      v-bind:eachLink="eachLink"
      :key="eachLink.linkName"
      :imgUrl="eachLink.linkLogo"
    />
  </ul>
</template>

<script>
// this page the all the navigation data(find recipe, view promotion, market) which consist of
// link name, link logo and the path they are directing once click

import saved from "../images/saved.png";
import profile from "../images/profile.png";

import NavbarlinkCard from "./NavbarlinkCard.vue";
import NavbarSearch from "./NavbarSearch.vue";

export default {
  name: "NavbarLinkSection1",
  components: {
    NavbarlinkCard,
    NavbarSearch,
  },
  data() {
    return {
      linksToPages2: [
        {
          linkName: "Saved Recipes",
          linkLogo: saved,
          routeTo: "/saved-recipes",
        },
        {
          linkName: "Profile",
          linkLogo: profile,
          routeTo: "/profile",
        },
      ],
    };
  },
};
</script>

<style></style>
