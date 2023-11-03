<template>
  <ul class="navbar-nav mb-2 mb-lg-0 text-center">
    <NavbarlinkCard
      v-for="eachLink in linksToPages1"
      :key="eachLink.linkName"
      :icon="eachLink.linkIcon"
      :eachLink="eachLink"
    />
  </ul>
</template>

<script>
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
          linkIcon: ["fas", "bowl-rice"],
          routeTo: "/find-recipes",
        },
        {
          linkName: "Market",
          linkIcon: ['fas', 'shop'],
          routeTo: "/market",
        },
        {
          linkName: "Insights",
          linkIcon: ["fas", "chart-column"],
          routeTo: "/insights",
        },
      ],
    };
  },
};
</script>