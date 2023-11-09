<template>
  <nav
    class="navbarStyle navbar navbar-expand-lg navbar-light mx-auto text-center border shadow px-3 py-1 align-items-center d-flex"
    style="background-color: #ffff">

    <div class="container-fluid"  >
      <div class="d-flex" >
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
// import NavbarLinkSection1 from "./NavbarLinks/NavbarLinkSection1.vue"
// import NavbarLinkSection2 from "./NavbarLinks/NavbarLinkSection2.vue"

export default {
  name: 'Navbar',
  // components:{
  //   NavbarLinkSection1, NavbarLinkSection2
  // },
  data(){
    return{
      islogin: false
    }
  },
  methods:{
    goAbout(){
      this.$router.push({path:'/About'});
    }
  },
  // mounted(){
  //   this.islogin = this.$store.getters.isLoginNotificationShown;
  //   console.log(this.islogin)
  // },
};
</script>

<style scoped>
.navbarStyle {
  z-index: 1;
  border-radius: 40px;
  position: fixed;
  width:95%;
  margin:10px auto;
  left: 0;
  right: 0;
  top: 0;
}
</style>
