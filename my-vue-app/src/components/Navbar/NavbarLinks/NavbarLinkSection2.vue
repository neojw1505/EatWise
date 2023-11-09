<template>
  <ul class="navbar-nav mb-lg-0 text-center">
    <!-- <NavbarSearch /> -->
    <NavbarlinkCard
      v-for="eachLink in linksToPages2"
      :key="eachLink.linkName"
      :icon="eachLink.linkIcon"
      :eachLink="eachLink"
    />
  </ul>
</template>

<script>
// this page the all the navigation data(find recipe, view promotion, market) which consist of
// link name, link logo and the path they are directing once click
import NavbarlinkCard from "./NavbarlinkCard.vue";
// import NavbarSearch from "./NavbarSearch.vue";
import { auth } from '../../../../src/firebaseService';

export default {
  name: "NavbarLinkSection1",
  components: {
    NavbarlinkCard,
  },
  data() {
    return {
      linksToPages2: [
        {
          linkName: "About Us",
          linkIcon: ["fas", "circle-info"],
          routeTo: "/About",
        },
        {
          linkName: "Saved Recipes",
          linkIcon: ["fas", "bookmark"],
          routeTo: "/saved-recipes",
        },
        {
          linkName: "Profile"   ,
          linkIcon: ["fas", "user"],
          routeTo: "/profile",
        },
      ],
    };
  },
};
</script>

<style></style>
