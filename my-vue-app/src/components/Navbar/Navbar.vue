<template>
  <nav
    class="navbar navbar-expand-lg navbar-light sticky-top"
<<<<<<< Updated upstream
    style="background-color: #007459"
=======
    style="background-color: #EF8A5B"
>>>>>>> Stashed changes
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
    NavbarLinkSection1,NavbarLinkSection2
  },
  data(){
    return{
      linksToPages1:[
        
      ]
    }
  }
};
</script>

<style></style>
