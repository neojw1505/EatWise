<template>
  <nav
    class="navbar navbar-expand-lg navbar-light mx-auto border shadow rounded-6 px-3"
    style="background-color: #ffff">
    <div class="container-fluid">
      <div class="d-flex">
        <!-- eatwise logo and dropdown button -->
        <NavbarHamburger />
        <NavbarLogo /> 
      </div>

      <div
        class="collapse navbar-collapse justify-content-between"
        id="navbarSupportedContent">
        <!-- show the left logos -->
        <NavbarLinkSection1 />
        <NavbarLinkSection2 />
      </div>
    </div>
  </nav>
</template>

<script>
// import NavbarLinkSection1 from "./NavbarLinks/NavbarLinkSection1.vue"
// import NavbarLinkSection2 from "./NavbarLinks/NavbarLinkSection2.vue"

export default {
  name: 'Navbar',
  // components:{
  //   NavbarLinkSection1, NavbarLinkSection2
  // },
};
</script>

<style scoped>
/* .navbar {
  position: fixed;
  z-index: 1;
} */
</style>
