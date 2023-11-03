<template>
  <nav
    class="navbar navbar-expand-lg navbar-light mx-auto"
    style="background-color: #7A8CEA"
  >
    <div class="container-fluid">
      <div class="d-flex">
        <!-- eatwise logo and dropdown button -->
        <NavbarHamburger />
        <NavbarLogo />
      </div>

      <div
        class="collapse navbar-collapse justify-content-between"
        id="navbarSupportedContent"
      >
        <!-- show the left logos -->
        <NavbarLinkSection1 />
        <NavbarLinkSection2 />
      </div>
    </div>
  </nav>
</template>

<script>
import NavbarLinkSection1 from "./NavbarLinks/NavbarLinkSection1.vue"
import NavbarLinkSection2 from "./NavbarLinks/NavbarLinkSection2.vue"

export default {
  name: 'Navbar',
  components:{
    NavbarLinkSection1, NavbarLinkSection2
  },
};
</script>

<style scoped>
.navbar{
border-radius: 40px;
width:100%;
margin-top:10px;
<<<<<<< HEAD
=======
z-index: 1;

>>>>>>> 3ebdf80e5c2cb78550b7a71a46e98915337e92ba
position: fixed;
z-index:2;
}
</style>
